// src/components/FavoriteEvents.tsx
import React, { useEffect, useState } from "react";
import { fetchEvents, type Event } from "../api/events";
import { fetchFavorites, unfavoriteEvent } from "../api/favorites";
import { fetchResultsFor, type Result } from "../api/results";
import { ThumbsUpIcon } from "lucide-react";

const FavoriteEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const [resultsMap, setResultsMap] = useState<Record<number, Result[]>>({});
  const [loading, setLoading] = useState(true);
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

        // Fetch results for each favorited event
        const resultsEntries = await Promise.all(
          favIds.map(async (eventId: number) => {
            try {
              const results = await fetchResultsFor(eventId);
              return [eventId, results] as const;
            } catch (err) {
              console.error(
                `Failed to load results for event ${eventId}:`,
                err
              );
              return [eventId, []] as const;
            }
          })
        );

        const resultsObj: Record<number, Result[]> =
          Object.fromEntries(resultsEntries);
        setResultsMap(resultsObj);
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

  if (loading)
    return (
      <p className="text-center text-gray-400 mt-20">Loading favorites…</p>
    );

  const favoriteEvents = events.filter((e) => favoriteIds.has(e.id));
  if (favoriteEvents.length === 0) {
    return <p className="text-center text-gray-400 mt-20">No favorites yet.</p>;
  }

  return (
    <div className="bg-black min-h-screen p-6">
      <div className=" mx-auto space-y-10">
        {favoriteEvents.map((event) => (
          <div
            key={event.id}
            className="bg-neutral-900 rounded-2xl p-6 shadow-lg"
          >
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
                  {event.location} · {new Date(event.date).toLocaleDateString()}{" "}
                  · {event.host}
                </p>
              </div>
              <button
                onClick={() => handleUnfavorite(event.id)}
                className="p-2.5 rounded-md text-green-500 shadow-md hover:shadow-none transition"
                aria-label="Unfavorite event"
              >
                <ThumbsUpIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Results Table */}
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
                      <td className="py-2 px-4 text-white">{r.skater_name}</td>
                      <td className="py-2 px-4 text-gray-500">{r.country}</td>
                      <td className="py-2 px-4 text-white">
                        {r.score !== null ? Number(r.score).toFixed(2) : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteEvents;
