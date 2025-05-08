import React, { useEffect, useState } from "react";
import { fetchEvents } from "../api/events";
import { fetchFavorites } from "../api/favorites";

type EventType = "sls" | "x games";

const LOGO_MAP: Record<EventType, string> = {
  sls: "/images/sls-white.png",
  "x games": "/images/xgames.png",
};

const inferSeries = (name: string): EventType | null => {
  const lc = name.toLowerCase();
  if (lc.includes("sls")) return "sls";
  if (lc.includes("x games")) return "x games";
  return null;
};

const FavoriteEventTypes: React.FC = () => {
  const [typesWithCount, setTypesWithCount] = useState<
    { type: EventType; count: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token")!;

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const [allEvents, favIds] = await Promise.all([
          fetchEvents(),
          fetchFavorites(token),
        ]);
        const favEvents = allEvents.filter((e) => favIds.includes(e.id));

        const counts: Record<EventType, number> = { sls: 0, "x games": 0 };

        favEvents.forEach((e) => {
          const series = inferSeries(e.name);
          if (series) counts[series]++;
        });

        const result = Object.entries(counts)
          .filter(([, count]) => count > 0)
          .map(([type, count]) => ({ type: type as EventType, count }));

        setTypesWithCount(result);
      } catch (err) {
        console.error("Failed to load favorite types:", err);
        setTypesWithCount([]);
      } finally {
        setLoading(false);
      }
    };

    loadTypes();
    window.addEventListener("favoritesUpdated", loadTypes);
    return () => {
      window.removeEventListener("favoritesUpdated", loadTypes);
    };
  }, [token]);

  if (loading) return null;

  return (
    <div className="relative w-full flex flex-col items-center gap-3 text-center">
      <h3 className="text-sm text-gray-400 uppercase tracking-wide">
        Favorite Event Types
      </h3>
      <p className="text-xs text-gray-500 max-w-xs">
        These are the event series you follow the most.
      </p>

      <div className="relative w-full flex justify-center py-3">
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-25 animate-pulse" />
        <div className="relative flex items-center space-x-4 px-6 py-3 bg-neutral-900 rounded-full shadow-inner border border-neutral-800">
          {typesWithCount.length > 0 ? (
            typesWithCount.map(({ type, count }) => (
              <div key={type} className="relative group">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700 hover:ring-2 hover:ring-primary transition">
                  <img
                    src={LOGO_MAP[type]}
                    alt={type}
                    className="max-h-6 object-contain"
                  />
                </div>
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-neutral-800 text-gray-400 text-xs px-3 py-2 rounded-lg shadow-xl border-1 border-gray-700 whitespace-nowrap z-10">
                  <span className="font-semibold">{type.toUpperCase()}</span> •{" "}
                  {count} event{count > 1 ? "s" : ""}
                </div>
              </div>
            ))
          ) : (
            <div className="text-left">
              <p className="text-white font-semibold text-base">No data yet</p>
              <p className="text-gray-500 text-xs">
                You haven’t favorited any event types yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteEventTypes;
