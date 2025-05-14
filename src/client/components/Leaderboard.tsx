import React, { useEffect, useState } from "react";

type Leader = {
  category: string;
  skater: string;
  score: number | null;
};

const iconMap: { category: string; src: string; alt: string }[] = [
  {
    category: "SLS Super Crown 2024",
    src: "/images/sls-white.png",
    alt: "Street League Skateboarding",
  },
  {
    category: "X Games Men’s Street 2024",
    src: "/images/xgames.png",
    alt: "X Games",
  },
  {
    category: "Tampa Pro 2024",
    src: "/images/tampa.png",
    alt: "Tampa Pro",
  },
];

const staticLeaders: Leader[] = [
  {
    category: "SLS Super Crown 2024",
    skater: "Nyjah Huston",
    score: 36.8,
  },
  {
    category: "X Games Men’s Street 2024",
    skater: "Sora Shirai",
    score: 94.66,
  },
  {
    category: "Tampa Pro 2024",
    skater: "Yuto Horigome",
    score: null, // No score published, but he won
  },
];

const Leaderboard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500 py-10">Loading…</div>;
  }

  return (
    <section className="max-w-5xl mx-auto mb-16 px-4">
      <h1 className="text-white text-2xl font-bold mb-8 flex items-center gap-2">
        Recent Highlights
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {staticLeaders.map((leader) => {
          const icon = iconMap.find((i) => i.category === leader.category);
          return (
            <div
              key={leader.category}
              className="bg-white/10 border border-neutral-800 rounded-2xl p-6 shadow-lg hover:shadow-primary-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                {icon && (
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    className="w-18 h-18 object-contain"
                    loading="lazy"
                  />
                )}
              </div>
              <p className="text-xs uppercase text-neutral-400 mb-1">
                {leader.category}
              </p>
              <h2 className="text-white text-xl font-bold tracking-tight mb-2">
                {leader.skater}
              </h2>
              <p className="text-gray-300 text-lg font-semibold">
                {leader.score !== null
                  ? `${leader.score.toFixed(2)} top score`
                  : "1st place finish"}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Leaderboard;
