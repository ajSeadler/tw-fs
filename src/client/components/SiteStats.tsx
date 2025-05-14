// components/SiteStats.tsx
import type { FC } from "react";
import { Calendar, PencilIcon, Users } from "lucide-react";

const stats = [
  { number: "10+", label: "Years of Events", icon: Calendar },
  { number: "200+", label: "Events Tracked", icon: PencilIcon },
  { number: "1200+", label: "Skaters Profiled", icon: Users },
];

const SiteStats: FC = () => (
  <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
    {stats.map(({ number, label, icon: Icon }, idx) => (
      <div
        key={idx}
        className="group flex flex-col items-center text-center space-y-4 px-6 py-8 rounded-2xl transition-transform duration-500 hover:scale-105"
      >
        <div
          className="
            p-3 rounded-full
            bg-white/20
            transition-colors duration-300
            group-hover:bg-neutral-800
          "
        >
          <Icon
            className="
              w-6 h-6
              text-white
              transition-colors duration-300
              group-hover:text-violet-500
            "
          />
        </div>
        <h3 className="text-4xl font-extrabold text-white tracking-tight">
          {number}
        </h3>
        <p className="text-sm font-medium uppercase text-gray-300">{label}</p>
      </div>
    ))}
  </div>
);

export default SiteStats;
