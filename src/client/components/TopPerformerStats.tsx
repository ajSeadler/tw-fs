import React, { useEffect, useState } from "react";
import { fetchFavorites } from "../api/favorites";
import { fetchResultsFor } from "../api/results";
import { Trophy } from "lucide-react";

interface PerformerStats {
  name: string;
  wins: number;
  events: number;
}

const TopPerformerStats: React.FC = () => {
  const [stats, setStats] = useState<PerformerStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token")!;
    (async () => {
      setLoading(true);
      try {
        const favIds = await fetchFavorites(token);
        if (favIds.length === 0) {
          setStats(null);
          return;
        }

        const allResultsArrays = await Promise.all(
          favIds.map((id) => fetchResultsFor(id))
        );
        const allResults = allResultsArrays.flat();

        const map: Record<string, { wins: number; events: Set<number> }> = {};
        allResults.forEach((r) => {
          if (!map[r.skater_name]) {
            map[r.skater_name] = { wins: 0, events: new Set() };
          }
          if (r.placement === 1) {
            map[r.skater_name].wins += 1;
          }
          map[r.skater_name].events.add(r.event_id);
        });

        let top: PerformerStats = { name: "", wins: -1, events: 0 };
        for (const [name, { wins, events }] of Object.entries(map)) {
          const evCount = events.size;
          if (wins > top.wins || (wins === top.wins && evCount > top.events)) {
            top = { name, wins, events: evCount };
          }
        }

        setStats(top.name ? top : null);
      } catch (err) {
        console.error("Error in TopPerformerStats:", err);
        setStats(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return null;

  return (
    <div className="relative w-full flex flex-col items-center gap-3 text-center">
      <h3 className="text-sm text-gray-400 uppercase tracking-wide">
        Top Performer
      </h3>
      <p className="text-xs text-gray-500 max-w-xs">
        Across all your liked events
      </p>

      <div className="relative w-full flex justify-center py-3">
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-25 animate-pulse" />
        <div className="relative flex items-center space-x-4 px-6 py-3 bg-neutral-900 rounded-full shadow-inner border border-neutral-800">
          <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700">
            <Trophy className="w-5 h-5 text-amber-300" />
          </div>
          <div className="text-left">
            <p className="text-white font-semibold text-base">
              {stats ? stats.name : "No data yet"}
            </p>
            <p className="text-gray-500 text-xs">
              {stats
                ? `${stats.wins} win${stats.wins !== 1 ? "s" : ""} • ${
                    stats.events
                  } event${stats.events !== 1 ? "s" : ""}`
                : "Not enough results to rank a top performer."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPerformerStats;
