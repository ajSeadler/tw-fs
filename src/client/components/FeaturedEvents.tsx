// components/FeaturedEvents.tsx
import type { FC } from "react";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  fetchRecentEvents,
  type Event,
  fetchResultsFor,
  type Result,
} from "../api/events";

const logoMap: { keyword: string; src: string; alt: string }[] = [
  {
    keyword: "SLS",
    src: "/images/sls-white.png",
    alt: "Street League Skateboarding",
  },
  { keyword: "X Games", src: "/images/xgames.png", alt: "X Games" },
  { keyword: "Tampa", src: "/images/tampa.png", alt: "Tampa Pro" },
];

export const FeaturedEvents: FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [resultsMap, setResultsMap] = useState<Record<number, Result[]>>({});

  useEffect(() => {
    fetchRecentEvents(3).then(async (evs) => {
      setEvents(evs);
      const map: Record<number, Result[]> = {};
      await Promise.all(
        evs.map(async (e) => {
          map[e.id] = await fetchResultsFor(e.id);
        })
      );
      setResultsMap(map);
    });
  }, []);

  if (!events.length) return null; // optionally show a loader

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 space-y-6">
      <h2 className="text-3xl font-extrabold text-white">Most Recent Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e) => {
          // Determine logo based on keywords in event name
          const match = logoMap.find(({ keyword }) =>
            e.name.toLowerCase().includes(keyword.toLowerCase())
          );
          const logoSrc = match?.src;
          const logoAlt = match?.alt;

          return (
            <a
              key={e.id}
              href={`/events`}
              className="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:scale-105 transition-transform"
            >
              {logoSrc && (
                <img
                  src={logoSrc}
                  alt={logoAlt}
                  className="w-12 h-12 object-contain mb-4 mx-auto"
                  loading="lazy"
                />
              )}
              <h3 className="text-xl font-semibold text-white group-hover:text-primary">
                {e.name}
              </h3>
              <p className="text-gray-400 mt-1">
                {new Date(e.date).toLocaleDateString()}
              </p>
              <p className="text-gray-400">{e.location}</p>

              {resultsMap[e.id]?.[0] && (
                <p className="text-sm text-gray-300 mt-2">
                  Winner: {resultsMap[e.id]![0].skater_name} (
                  {resultsMap[e.id]![0].score})
                </p>
              )}

              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary mt-4 transition-colors" />
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedEvents;
