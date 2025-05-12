// components/GuestAccess.tsx
import type { FC } from "react";

const GuestAccess: FC = () => (
  <section className="max-w-4xl mx-auto px-6 py-10  text-center space-y-4">
    <p className="text-gray-300 text-lg tracking-wide">
      Don’t want to create an account?{" "}
      <span className="text-white font-semibold">No problem!</span> You can
      still browse all events and see results in real-time.
    </p>
    <a
      href="/events"
      className="inline-block px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition"
    >
      Browse as Guest
    </a>
  </section>
);

export default GuestAccess;
