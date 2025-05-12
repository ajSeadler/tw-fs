// src/components/FavoriteCount.tsx
import { useEffect, useState } from "react";
import { fetchFavorites } from "../api/favorites";
import { Heart } from "lucide-react";

export const FavoriteCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetchFavorites(token)
      .then((ids) => setCount(ids.length))
      .catch((err) => console.error("Failed to fetch favorites:", err));
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center gap-3 text-center">
      <h3 className="text-sm text-gray-400 uppercase tracking-wide">
        Favorite Events
      </h3>
      <p className="text-xs text-gray-500 max-w-xs">
        Total number of contests you've liked
      </p>

      <div className="relative w-full flex justify-center py-3">
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-25 animate-pulse" />
        <div className="relative flex items-center space-x-4 px-6 py-3 bg-neutral-900 rounded-full shadow-inner border border-neutral-800">
          <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700">
            <Heart className="w-5 h-5 text-pink-400" />
          </div>
          <div className="text-left">
            <p className="text-white font-semibold text-base">{count}</p>
            <p className="text-gray-500 text-xs">
              {count === 1 ? "Favorite Event" : "Favorite Events"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
