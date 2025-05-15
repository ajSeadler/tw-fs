// src/components/FeaturedEvents.tsx
import type { FC } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchRecentEvents, type Event } from "../api/events";
import { fetchResultsFor, type Result } from "../api/results";

const logoMap = [
  { keyword: "SLS", src: "/images/sls-white.png", alt: "SLS" },
  { keyword: "X Games", src: "/images/xgames.png", alt: "X Games" },
  { keyword: "Tampa", src: "/images/tampa.png", alt: "Tampa Pro" },
];

export const FeaturedEvents: FC = () => {
  const [events, setEvents] = useState<(Event & { results: Result[] })[]>([]);
  const [page, setPage] = useState(0); // 0 or 1

  useEffect(() => {
    fetchRecentEvents(6).then(async (evs) => {
      const map: Record<number, Result[]> = {};
      await Promise.all(
        evs.map(async (e) => {
          map[e.id] = await fetchResultsFor(e.id);
        })
      );
      setEvents(evs.map((e) => ({ ...e, results: map[e.id] || [] })));
    });
  }, []);

  if (events.length < 6) return null;
  const totalPages = 2;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 text-white">
      <h2 className="text-2xl font-bold px-13">Recent Events</h2>

      <div className="relative p-10">
        {/* Left arrow */}
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="absolute -left-10 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full hover:bg-white/20 disabled:opacity-40 transition z-10"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Viewport */}
        <div className="overflow-hidden">
          {/* Strip of all 6 cards */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {events.map(({ id, name, date, location, results }) => {
              const logo = logoMap.find((l) =>
                name.toLowerCase().includes(l.keyword.toLowerCase())
              );
              const winner = results[0];
              return (
                <motion.a
                  key={id}
                  href={`/event/${id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="shrink-0 w-full md:w-1/3 px-3"
                >
                  <div className="relative h-full rounded-2xl bg-white/10 backdrop-blur-xs p-6 border border-white/10 hover:border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group">
                    {/* Elegant glow bar */}
                    <div className="absolute top-0 left-0 w-full h-1.5 rounded-t-2xl bg-gradient-to-r from-primary/80 via-white/50 to-transparent blur-sm opacity-80 animate-[shine_4s_linear_infinite]" />

                    {/* Logo with soft hover lift */}
                    {logo && (
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="w-10 h-10 mx-auto mb-4 drop-shadow-sm transition-transform duration-500 group-hover:-translate-y-1"
                        loading="lazy"
                      />
                    )}

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white text-center truncate tracking-tight transition-colors duration-500 group-hover:text-primary">
                      {name}
                    </h3>

                    {/* Date & location */}
                    <p className="mt-1 text-sm text-gray-400 text-center leading-snug">
                      {new Date(date).toLocaleDateString()} · {location}
                    </p>

                    {/* Winner */}
                    {winner && (
                      <p className="mt-4 text-sm text-gray-300 text-center">
                        <span className="text-white font-medium">Winner:</span>{" "}
                        {winner.skater_name}{" "}
                        <span className="text-gray-400">({winner.score})</span>
                      </p>
                    )}
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          className="absolute -right-10 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full hover:bg-white/20 disabled:opacity-40 transition z-10"
        >
          <ChevronRight className="w-6 h-6  text-white" />
        </button>
      </div>
    </section>
  );
};

export default FeaturedEvents;
