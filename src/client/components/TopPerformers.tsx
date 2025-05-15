// src/components/TopPerformers.tsx
import type { FC } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Trophy } from "lucide-react";
import { fetchEvents } from "../api/events";
import { fetchResultsFor, type Result } from "../api/results";

const logoMap: { keyword: string; src: string; alt: string }[] = [
  {
    keyword: "SLS",
    src: "/images/sls-white.png",
    alt: "Street League Skateboarding",
  },
  { keyword: "X Games", src: "/images/xgames.png", alt: "X Games" },
  { keyword: "Tampa", src: "/images/tampa.png", alt: "Tampa Pro" },
];

interface CategoryWinner {
  category: string;
  skaterName: string;
  wins: number;
  lastWinEvent?: string;
  lastWinDate?: string;
}

const TopPerformers: FC = () => {
  const [winners, setWinners] = useState<CategoryWinner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      // fetch all events
      const events = await fetchEvents();
      // fetch results per event
      const resultsMap: Record<number, Result[]> = {};
      await Promise.all(
        events.map(async (e) => {
          resultsMap[e.id] = await fetchResultsFor(e.id);
        })
      );

      const cats = logoMap.map(({ keyword }) => {
        // events matching this series
        const bucket = events.filter((e) =>
          e.name.toLowerCase().includes(keyword.toLowerCase())
        );
        // tally first-place finishes
        const tally: Record<
          string,
          { count: number; winEvents: { name: string; date: string }[] }
        > = {};
        bucket.forEach((e) => {
          const top = resultsMap[e.id]?.[0];
          if (top?.placement === 1) {
            const entry = tally[top.skater_name] ?? { count: 0, winEvents: [] };
            entry.count += 1;
            entry.winEvents.push({ name: e.name, date: e.date });
            tally[top.skater_name] = entry;
          }
        });

        const entries = Object.entries(tally);
        if (entries.length === 0) {
          return { category: keyword, skaterName: "—", wins: 0 };
        }

        // find champion
        const [champ, { count, winEvents }] = entries.reduce(
          (best, cur) => (cur[1].count > best[1].count ? cur : best),
          ["", { count: -1, winEvents: [] }] as [string, (typeof best)[1]]
        );

        // find most recent win
        const last = winEvents
          .slice()
          .sort(
            (
              a: { date: string | number | Date },
              b: { date: string | number | Date }
            ) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )[0];

        return {
          category: keyword,
          skaterName: champ,
          wins: count,
          lastWinEvent: last?.name,
          lastWinDate: last?.date,
        };
      });

      setWinners(cats);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin w-12 h-12 text-white" />
      </div>
    );
  }

  const truncateTitle = (title: string, maxWords = 3) => {
    const words = title.split(" ");
    if (words.length <= maxWords) return title;
    return words.slice(0, maxWords).join(" ") + "…";
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 space-y-6 text-white">
      <h2 className="text-2xl font-bold">Top Performers by Series</h2>
      {/* …inside your grid… */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {winners.map(
          ({ category, skaterName, wins, lastWinEvent, lastWinDate }) => {
            const logo = logoMap.find((l) =>
              category.toLowerCase().includes(l.keyword.toLowerCase())
            );
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xs p-6 shadow-inner shadow-black/20 border border-transparent hover:border-white/20 transition-all duration-300">
                  {/* top accent bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />

                  {/* Logo */}
                  {logo && (
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="w-10 h-10 object-contain mx-auto mb-4"
                      loading="lazy"
                    />
                  )}

                  {/* Series Title */}
                  <h3 className="text-sm font-medium uppercase tracking-wide text-gray-300 text-center">
                    {category}
                  </h3>

                  <div className="mt-4 space-y-4">
                    {/* Champion */}
                    <div className="flex items-center justify-center space-x-2">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      <span className="text-lg font-semibold text-white">
                        {skaterName}
                      </span>
                    </div>
                    <hr className="border-gray-700" />

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div>
                        <p className="text-xs uppercase text-gray-400">Wins</p>
                        <p className="mt-1 text-xl font-bold text-white">
                          {wins}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase text-gray-400">
                          Last Win
                        </p>
                        {lastWinEvent ? (
                          <>
                            <p className="mt-1 text-sm font-medium text-white">
                              {truncateTitle(lastWinEvent)}
                            </p>
                            <p className="mt-0.5 text-xs font-mono text-gray-500">
                              {new Date(lastWinDate!).toLocaleDateString()}
                            </p>
                          </>
                        ) : (
                          <p className="mt-1 text-sm text-gray-500">—</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default TopPerformers;
