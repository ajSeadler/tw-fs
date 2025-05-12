/* eslint-disable prefer-const */
// src/components/EventsWithResults.tsx
import React, { useEffect, useState } from "react";
import { fetchEvents, type Event } from "../api/events";
import { fetchResultsFor, type Result } from "../api/results";
import {
  fetchFavorites,
  favoriteEvent,
  unfavoriteEvent,
} from "../api/favorites";
import Leaderboard from "./Leaderboard";
import { Star } from "lucide-react";
import handrailIcon from "/images/handrail.png";
import vertIcon from "/images/vert.png";

type Leader = {
  skater: string;
  wins: number;
  eventsCount: number;
};

const EventsWithResults: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [resultsMap, setResultsMap] = useState<Record<number, Result[]>>({});
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [favoritedEvents, setFavoritedEvents] = useState<Set<number>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);
  const [slsCount, setSlsCount] = useState(0);
  const [xGamesCount, setXGamesCount] = useState(0);
  const [tampaCount, setTampaCount] = useState(0);
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // ← New:
  const [categoryFilter, setCategoryFilter] = useState<
    "all" | "street" | "vert"
  >("all");

  const token = localStorage.getItem("token")!;

  useEffect(() => {
    async function loadAll() {
      let evts: Event[] = [];
      let map: Record<number, Result[]> = {};

      try {
        evts = await fetchEvents();
        setEvents(evts);

        await Promise.all(
          evts.map(async (evt) => {
            map[evt.id] = await fetchResultsFor(evt.id);
          })
        );
        setResultsMap(map);

        const allResults = Object.values(map).flat();
        const stats: Record<string, { wins: number; count: number }> = {};
        allResults.forEach((r) => {
          stats[r.skater_name] ??= { wins: 0, count: 0 };
          stats[r.skater_name].count++;
          if (r.placement === 1) stats[r.skater_name].wins++;
        });
        const board = Object.entries(stats)
          .map(([skater, { wins, count }]) => ({
            skater,
            wins,
            eventsCount: count,
          }))
          .sort((a, b) => b.wins - a.wins || a.eventsCount - b.eventsCount)
          .slice(0, 3);
        setLeaders(board);
      } catch (err) {
        console.error("Error fetching events/results:", err);
      }

      // Compute counts
      const slsEvents = evts.filter((e) =>
        e.name.toLowerCase().includes("sls")
      );
      const xGamesEvents = evts.filter((e) =>
        e.name.toLowerCase().includes("x games")
      );
      const tampaEvents = evts.filter((e) =>
        e.name.toLowerCase().includes("tampa")
      );
      setSlsCount(slsEvents.length);
      setXGamesCount(xGamesEvents.length);
      setTampaCount(tampaEvents.length);

      try {
        const favIds = await fetchFavorites(token);
        setFavoritedEvents(new Set(favIds));
      } catch (err) {
        console.error("Failed to load favorites:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, [token]);

  const handleFavorite = async (eventId: number) => {
    const newSet = new Set(favoritedEvents);
    if (!favoritedEvents.has(eventId)) {
      try {
        await favoriteEvent(eventId, token);
        newSet.add(eventId);
      } catch (err) {
        console.error("Failed to favorite:", err);
        return;
      }
    } else {
      try {
        await unfavoriteEvent(eventId, token);
        newSet.delete(eventId);
      } catch (err) {
        console.error("Failed to unfavorite:", err);
        return;
      }
    }
    setFavoritedEvents(newSet);
  };

  // 4) apply year/type → then category
  const baseFiltered = events.filter((event) => {
    const matchesYear =
      yearFilter === "all" ||
      new Date(event.date).getFullYear().toString() === yearFilter;
    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "sls" && event.name.toLowerCase().includes("sls")) ||
      (typeFilter === "xgames" &&
        event.name.toLowerCase().includes("x games")) ||
      (typeFilter === "tampa" && event.name.toLowerCase().includes("tampa"));
    return matchesYear && matchesType;
  });

  const filteredEvents = baseFiltered.filter((event) => {
    const name = event.name.toLowerCase();
    if (categoryFilter === "street")
      return name.includes("street") || name.includes("sls");

    if (categoryFilter === "vert") return name.includes("vert");
    return true;
  });

  const uniqueYears = Array.from(
    new Set(events.map((e) => new Date(e.date).getFullYear().toString()))
  ).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="bg-black min-h-screen p-6">
      <Leaderboard leaders={leaders} loading={loading} />
      {/* 2) Street/Vert toggle */}

      {/* Filters */}
      <div className="max-w-4xl mx-auto mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
          {/* All */}
          <button
            onClick={() => setTypeFilter("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
              typeFilter === "all"
                ? "bg-primary text-white"
                : "bg-neutral-800 text-gray-400"
            }`}
          >
            All
          </button>

          {/* SLS */}
          <button
            onClick={() => setTypeFilter("sls")}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
              typeFilter === "sls"
                ? "bg-primary text-white"
                : "bg-neutral-800 text-gray-400"
            }`}
          >
            <img src="/images/sls-white.png" alt="SLS" className="h-5" />
            <span>SLS ({slsCount})</span>
          </button>

          {/* X Games */}
          <button
            onClick={() => setTypeFilter("xgames")}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
              typeFilter === "xgames"
                ? "bg-primary text-white"
                : "bg-neutral-800 text-gray-400"
            }`}
          >
            <img src="/images/xgames.png" alt="X Games" className="h-5" />
            <span>X Games ({xGamesCount})</span>
          </button>

          {/* Tampa */}
          <button
            onClick={() => setTypeFilter("tampa")}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
              typeFilter === "tampa"
                ? "bg-primary text-white"
                : "bg-neutral-800 text-gray-400"
            }`}
          >
            <img src="/images/tampa.png" alt="Tampa" className="h-5" />
            <span>Tampa ({tampaCount})</span>
          </button>
        </div>
        {/* Category Filter (slim buttons like your type filters) */}
        <div className="flex justify-center space-x-2">
          {[
            { label: "All", value: "all" },
            { label: "Street", value: "street", icon: handrailIcon },
            { label: "Vert", value: "vert", icon: vertIcon },
          ].map(({ label, value, icon }) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={categoryFilter === value}
              onClick={() =>
                setCategoryFilter(value as "all" | "street" | "vert")
              }
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
                categoryFilter === value
                  ? "bg-primary text-white"
                  : "bg-neutral-800 text-gray-400 hover:text-white hover:bg-neutral-700"
              }`}
            >
              {icon && <img src={icon} alt={label} className="h-5 w-5" />}
              {label}
            </button>
          ))}
        </div>

        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="bg-neutral-800 text-white rounded-md px-4 py-2 text-sm"
        >
          <option value="all">All Years</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Event List */}
      <div className="max-w-4xl mx-auto space-y-8 mt-8">
        {filteredEvents.map((event) => {
          const isFav = favoritedEvents.has(event.id);
          const lower = event.name.toLowerCase();

          return (
            <div key={event.id} className="bg-neutral-900 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                    {lower.includes("sls") && (
                      <img
                        src="/images/sls-white.png"
                        alt="SLS"
                        className="h-10"
                      />
                    )}
                    {lower.includes("x games") && (
                      <img
                        src="/images/xgames.png"
                        alt="X Games"
                        className="h-10"
                      />
                    )}
                    {lower.includes("tampa") && (
                      <img
                        src="/images/tampa.png"
                        alt="Tampa"
                        className="h-10"
                      />
                    )}
                    {event.name}
                  </h2>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    {event.location} ·{" "}
                    {new Date(event.date).toLocaleDateString()} · {event.host}{" "}
                    {(lower.includes("street") || lower.includes("sls")) && (
                      <img
                        src="/images/handrail.png"
                        alt="Street"
                        className="h-5"
                      />
                    )}
                    {lower.includes("vert") && (
                      <img src="/images/vert.png" alt="Vert" className="h-5" />
                    )}
                  </p>
                </div>
                <button
                  onClick={() => handleFavorite(event.id)}
                  className={`p-2.5 rounded-md transition-shadow shadow-sm ${
                    isFav
                      ? "text-green-500 shadow-lg"
                      : "text-white hover:text-green-700 hover:shadow-lg"
                  }`}
                  aria-label={isFav ? "Unfavorite event" : "Favorite event"}
                >
                  <Star className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-neutral-800">
                    <tr>
                      <th className="py-2 px-4 text-white">#</th>
                      <th className="py-2 px-4 text-white">Skater</th>
                      <th className="py-2 px-4 text-white">Country</th>
                      <th className="py-2 px-4 text-white">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(resultsMap[event.id] || []).map((r) => (
                      <tr
                        key={r.id}
                        className="border-b border-neutral-700 hover:bg-gray-700 transition"
                      >
                        <td className="py-2 px-4 font-medium text-white">
                          {r.placement}
                        </td>
                        <td className="py-2 px-4 text-white">
                          {r.skater_name}
                        </td>
                        <td className="py-2 px-4 text-gray-500">{r.country}</td>
                        <td className="py-2 px-4 text-white">
                          {r.score !== null
                            ? Number(r.score).toFixed(2)
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsWithResults;
