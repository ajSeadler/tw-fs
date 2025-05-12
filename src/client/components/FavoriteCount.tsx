// src/components/FavoriteCount.tsx
import { useEffect, useState } from "react";
import { fetchFavorites } from "../api/favorites";

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
    <div className="flex items-center space-x-2  bg-neutral-900 rounded-full shadow-inner border border-neutral-800 p-3">
      <span className="text-sm text-gray-400 uppercase">
        Total Favorite Events
      </span>
      <span className="ml-2 text-2xl font-bold text-violet-500">{count}</span>
    </div>
  );
};
