import React, { useEffect, useState } from "react";
import { fetchEvents, type Event } from "../api/events";
import { fetchFavorites } from "../api/favorites";

const LOGO_MAP: Record<"sls" | "x games", string> = {
  sls: "/images/sls-white.png",
  "x games": "/images/xgames.png",
};

const inferSeries = (name: string): "sls" | "x games" | null => {
  const lc = name.toLowerCase();
  if (lc.includes("sls")) return "sls";
  if (lc.includes("x games")) return "x games";
  return null;
};

const LastFavoritedEvent: React.FC = () => {
  const [lastEvent, setLastEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token")!;

  const loadLast = async () => {
    setLoading(true);
    try {
      const [allEvents, favIds] = await Promise.all([
        fetchEvents(),
        fetchFavorites(token),
      ]);
      if (favIds.length === 0) {
        setLastEvent(null);
      } else {
        const lastId = favIds[favIds.length - 1];
        setLastEvent(allEvents.find((e) => e.id === lastId) ?? null);
      }
    } catch (err) {
      console.error("Failed to load last favorite:", err);
      setLastEvent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLast();
    window.addEventListener("favoritesUpdated", loadLast);
    return () => {
      window.removeEventListener("favoritesUpdated", loadLast);
    };
  }, [token]);

  if (loading) return null;

  const series = lastEvent ? inferSeries(lastEvent.name) : null;
  const logo = series ? LOGO_MAP[series] : null;

  return (
    <div className="relative w-full flex flex-col items-center gap-3 text-center">
      <h3 className="text-sm text-gray-400 uppercase tracking-wide">
        First Favorited Event
      </h3>
      <p className="text-xs text-gray-500 max-w-xs">
        You hit “★” on this one—there's a first for everything!
      </p>

      <div className="relative w-full flex justify-center py-3">
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-25 animate-pulse" />
        <div className="relative flex items-center space-x-4 px-6 py-3 bg-neutral-900 rounded-full shadow-inner border border-neutral-800">
          {logo && (
            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700">
              <img
                src={logo}
                alt={series!}
                className="max-h-6 object-contain"
              />
            </div>
          )}
          <div className="text-left">
            <p className="text-white font-semibold text-base">
              {lastEvent ? lastEvent.name : "No data yet"}
            </p>
            <p className="text-gray-500 text-xs">
              {lastEvent
                ? `${lastEvent.location} · ${new Date(
                    lastEvent.date
                  ).toLocaleDateString()}`
                : "Tap the thumb's up on an event to mark it as your first favorite."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastFavoritedEvent;
