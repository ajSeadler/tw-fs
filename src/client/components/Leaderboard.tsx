import React from "react";

type Leader = {
  skater: string;
  wins: number;
  eventsCount: number;
};

type LeaderboardProps = {
  leaders: Leader[];
  loading: boolean;
};

const Leaderboard: React.FC<LeaderboardProps> = ({ leaders, loading }) => {
  if (loading) {
    return <div className="text-center text-gray-500 py-10">Loading…</div>;
  }

  return (
    <section className="max-w-4xl mx-auto mb-12">
      <h1 className="text-white text-3xl font-bold mb-4">
        Performance Highlights
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-800">
            <tr>
              <th className="py-2 px-4 text-white">Rank</th>
              <th className="py-2 px-4 text-white">Skater</th>
              <th className="py-2 px-4 text-white">Wins</th>
              <th className="py-2 px-4 text-white">Events</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((l, i) => (
              <tr key={l.skater} className="border-b border-gray-700">
                <td className="py-2 px-4 text-white">{i + 1}</td>
                <td className="py-2 px-4 text-white">{l.skater}</td>
                <td className="py-2 px-4 text-white">{l.wins}</td>
                <td className="py-2 px-4 text-white">{l.eventsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Leaderboard;
