/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/TopPerformers.tsx
import type { FC } from "react";
import { useEffect, useState } from "react";
import { fetchEvents, type Event } from "../api/events";
import { fetchResultsFor, type Result } from "../api/results";

const logoMap: { keyword: string; src: string; alt: string }[] = [
  {
    keyword: "SLS",
    src: "/images/sls-white.png",
    alt: "Street League Skateboarding",
  },
  {
    keyword: "X Games",
    src: "/images/xgames.png",
    alt: "X Games",
  },
  {
    keyword: "Tampa",
    src: "/images/tampa.png",
    alt: "Tampa Pro",
  },
];

interface CategoryWinner {
  category: string;
  skaterName: string;
  wins: number;
}

const TopPerformers: FC = () => {
  const [winners, setWinners] = useState<CategoryWinner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const events = await fetchEvents();
      // fetch all results
      const resultsMap: Record<number, Result[]> = {};
      await Promise.all(
        events.map(async (e) => {
          resultsMap[e.id] = await fetchResultsFor(e.id);
        })
      );

      // compute winners for each keyword
      const cats = logoMap.map(({ keyword }) => {
        // filter events with this keyword
        const bucket = events.filter((e) =>
          e.name.toLowerCase().includes(keyword.toLowerCase())
        );

        // tally first-place finishes
        const tally: Record<string, number> = {};
        bucket.forEach((e) => {
          const top = resultsMap[e.id]?.[0]; // results already ordered asc
          if (top && top.placement === 1) {
            tally[top.skater_name] = (tally[top.skater_name] || 0) + 1;
          }
        });

        // find top skater
        const entries = Object.entries(tally);
        if (!entries.length) {
          return { category: keyword, skaterName: "—", wins: 0 };
        }
        const [skaterName, wins] = entries.reduce(
          (best, cur) => (cur[1] > best[1] ? cur : best),
          ["", -1] as [string, number]
        );

        return { category: keyword, skaterName, wins };
      });

      setWinners(cats);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 space-y-6">
      <h2 className="text-3xl font-extrabold text-white">
        Top Performers by Series
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {winners.map(({ category, skaterName, wins }) => {
          const logo = logoMap.find((l) =>
            category.toLowerCase().includes(l.keyword.toLowerCase())
          );
          return (
            <div
              key={category}
              className="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:scale-105 transition-transform"
            >
              {logo && (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-12 h-12 object-contain mb-4 mx-auto"
                  loading="lazy"
                />
              )}
              <h3 className="text-xl font-semibold text-white group-hover:text-primary">
                {category}
              </h3>
              <p className="text-gray-400 mt-1">
                Champion: <span className="text-white">{skaterName}</span>
              </p>
              <p className="text-gray-400">
                Wins: <span className="text-white">{wins}</span>
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopPerformers;
