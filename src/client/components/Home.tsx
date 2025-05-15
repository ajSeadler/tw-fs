// pages/Home.tsx
import type { FC } from "react";
import { CalendarCheck } from "lucide-react";
import SiteStats from "./SiteStats";
import GuestAccess from "./GuestAccess";
import FeaturedEvents from "./FeaturedEvents";
import TopPerformers from "./TopPerformers";

// import BackgroundBeams from "./Background";

const Home: FC = () => (
  <>
    <div className="relative min-h-screen overflow-hidden ">
      {/* <BackgroundBeams /> */}

      <div className="text-white relative">
        <section className="relative z-10 py-32 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-10">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                Discover and Track
                <br />
                Skateboarding Events
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-md">
                Stay up to date with contests, results, and skater profiles —
                from global competitions to your local park.
              </p>
              <a
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white text-white rounded-md hover:bg-white hover:text-neutral-900 transition-colors font-medium"
              >
                <CalendarCheck className="w-5 h-5" />
                Browse Events
              </a>
            </div>
            <SiteStats />
          </div>
        </section>
        <section className="py-20 px-6">
          <FeaturedEvents />
        </section>

        {/* Featured Events */}
        <section className="py-20 px-6">
          <TopPerformers />
        </section>

        {/* Join the Community */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center space-y-6">
          <h2 className="text-3xl font-semibold">Join the Community</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sign up today to unlock personalized event tracking, save your
            favorite contests, and connect with fellow skaters. Stay ahead of
            the game with real-time updates and exclusive content.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 mt-3 border border-white text-white rounded-md hover:bg-white hover:text-neutral-900 transition-colors font-medium"
          >
            Create an Account
          </a>
        </section>

        {/* Guest Access */}
        <section className="py-20 px-6">
          <GuestAccess />
        </section>
      </div>
    </div>
  </>
);

export default Home;
