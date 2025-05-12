// src/components/FavoriteEvents.tsx
import React, { useEffect, useState } from "react";
import { fetchEvents, type Event } from "../api/events";
import { fetchFavorites, unfavoriteEvent } from "../api/favorites";
import { fetchResultsFor, type Result } from "../api/results";
import { Star } from "lucide-react";

const FavoriteEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const [resultsMap, setResultsMap] = useState<Record<number, Result[]>>({});
  const [loading, setLoading] = useState(true);
  const [yearFilter, setYearFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<
    "All" | "SLS" | "X Games" | "Tampa"
  >("All");

  const token = localStorage.getItem("token")!;

  useEffect(() => {
    async function loadFavorites() {
      try {
        const [allEvents, favIds] = await Promise.all([
          fetchEvents(),
          fetchFavorites(token),
        ]);

        setEvents(allEvents);
        const favIdSet = new Set(favIds);
        setFavoriteIds(favIdSet);

        const resultsEntries = await Promise.all(
          favIds.map(async (eventId: number) => {
            try {
              const results = await fetchResultsFor(eventId);
              return [eventId, results] as const;
            } catch {
              return [eventId, []] as const;
            }
          })
        );

        setResultsMap(Object.fromEntries(resultsEntries));
      } catch (err) {
        console.error("Error loading favorites:", err);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [token]);

  const handleUnfavorite = async (eventId: number) => {
    try {
      await unfavoriteEvent(eventId, token);
      const newSet = new Set(favoriteIds);
      newSet.delete(eventId);
      setFavoriteIds(newSet);
    } catch (err) {
      console.error("Failed to unfavorite:", err);
    }
  };

  const favoriteEvents = events.filter((e) => favoriteIds.has(e.id));

  const availableYears = Array.from(
    new Set(favoriteEvents.map((e) => new Date(e.date).getFullYear()))
  ).sort((a, b) => b - a);

  const filteredEvents = favoriteEvents.filter((event) => {
    const matchesYear =
      yearFilter === "All" ||
      new Date(event.date).getFullYear().toString() === yearFilter;
    const matchesType =
      typeFilter === "All" ||
      (typeFilter === "SLS" && event.name.toLowerCase().includes("sls")) ||
      (typeFilter === "X Games" &&
        event.name.toLowerCase().includes("x games")) ||
      (typeFilter === "Tampa" && event.name.toLowerCase().includes("tampa"));
    return matchesYear && matchesType;
  });

  if (loading)
    return (
      <p className="text-center text-gray-400 mt-20">Loading favorites…</p>
    );
  if (favoriteEvents.length === 0)
    return <p className="text-center text-gray-400 mt-20">No favorites yet.</p>;

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
          {(["All", "SLS", "X Games", "Tampa"] as const).map((value) => (
            <button
              key={value}
              onClick={() => setTypeFilter(value)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                typeFilter === value
                  ? "bg-primary text-white"
                  : "bg-neutral-800 text-gray-400"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="bg-neutral-800 text-white rounded-md px-4 py-2 text-sm"
        >
          <option value="All">All Years</option>
          {availableYears.map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No events match your filters.
        </p>
      ) : (
        <div className="space-y-10">
          {filteredEvents.map((event) => {
            const lower = event.name.toLowerCase();
            return (
              <div
                key={event.id}
                className="bg-neutral-900 rounded-2xl p-6 shadow-lg"
              >
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
                      {lower.includes("street") && (
                        <img
                          src="/images/handrail.png"
                          alt="Street"
                          className="h-5"
                        />
                      )}
                      {lower.includes("vert") && (
                        <img
                          src="/images/vert.png"
                          alt="Vert"
                          className="h-5"
                        />
                      )}
                    </p>
                  </div>

                  <button
                    onClick={() => handleUnfavorite(event.id)}
                    className="p-2.5 rounded-md text-green-500 shadow-md hover:shadow-none transition"
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
                          <td className="py-2 px-4 text-gray-500">
                            {r.country}
                          </td>
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
      )}
    </div>
  );
};

export default FavoriteEvents;
