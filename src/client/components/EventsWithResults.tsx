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
import { ThumbsUpIcon } from "lucide-react";

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
  const token = localStorage.getItem("token")!;

  useEffect(() => {
    async function loadAll() {
      try {
        const evts = await fetchEvents();
        setEvents(evts);

        const map: Record<number, Result[]> = {};
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

        const favIds = await fetchFavorites(token);
        setFavoritedEvents(new Set(favIds));

        // Count SLS and X Games events
        const slsEvents = evts.filter((e) =>
          e.name.toLowerCase().includes("sls")
        );
        const xGamesEvents = evts.filter((e) =>
          e.name.toLowerCase().includes("x games")
        );
        setSlsCount(slsEvents.length);
        setXGamesCount(xGamesEvents.length);
      } catch (err) {
        console.error("Error loading data:", err);
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

  return (
    <div className="bg-black min-h-screen p-6">
      <Leaderboard leaders={leaders} loading={loading} />

      {/* Summary icons */}
      <div className="flex justify-center gap-6 mt-6">
        <div className="flex items-center space-x-2 bg-neutral-900 px-4 py-2 rounded-xl shadow-sm">
          <img src="/images/sls-white.png" alt="SLS" className="h-6" />
          <span className="text-white font-medium">{slsCount}</span>
        </div>
        <div className="flex items-center space-x-2 bg-neutral-900 px-4 py-2 rounded-xl shadow-sm">
          <img src="/images/xgames.png" alt="X Games" className="h-6" />
          <span className="text-white font-medium">{xGamesCount}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 mt-8">
        {events.map((event) => {
          const isFav = favoritedEvents.has(event.id);

          return (
            <div key={event.id} className="bg-neutral-900 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                    {event.name.toLowerCase().includes("sls") && (
                      <img
                        src="/images/sls-white.png"
                        alt="SLS"
                        className="h-10"
                      />
                    )}
                    {event.name.toLowerCase().includes("x games") && (
                      <img
                        src="/images/xgames.png"
                        alt="X Games"
                        className="h-10"
                      />
                    )}
                    {event.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {event.location} ·{" "}
                    {new Date(event.date).toLocaleDateString()} · {event.host}
                  </p>
                </div>
                <button
                  onClick={() => handleFavorite(event.id)}
                  className={`
                    p-2.5 rounded-md transition-shadow shadow-sm
                    ${
                      isFav
                        ? "text-green-500 shadow-lg"
                        : "text-white hover:text-green-700 hover:shadow-lg"
                    }
                  `}
                  aria-label={isFav ? "Unfavorite event" : "Favorite event"}
                >
                  <ThumbsUpIcon className="w-5 h-5" />
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
