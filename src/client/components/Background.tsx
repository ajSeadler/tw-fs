import type { FC } from "react";

const Background: FC = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    {/* Top-left glow */}
    <div className="absolute inset-0 neon-top-left blur-2xl opacity-90" />

    {/* Bottom-right glow */}
    <div className="absolute inset-0 neon-bottom-right blur-3xl opacity-90" />
  </div>
);

export default Background;
