import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FiSearch, FiBell, FiPlus } from "react-icons/fi";
import { BiTargetLock } from "react-icons/bi";
import ProfileMenu from "./ProfileMenu"; // Import the ProfileMenu component

const Navbar: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [plusOpen, setPlusOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const plusRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (plusRef.current && !plusRef.current.contains(e.target as Node)) {
        setPlusOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <nav className="bg-neutral-950 border-b border-neutral-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Logo + Links */}
            <div className="flex items-center space-x-6">
              <a
                href="/"
                className="flex items-center text-gray-100 hover:text-white transition"
              >
                <BiTargetLock className="h-6 w-6" />
                <span className="ml-2 text-xl font-semibold tracking-wide">
                  FlatSpot
                </span>
              </a>
              <div className="hidden md:flex space-x-4">
                <a
                  href="/events"
                  className="text-gray-300 hover:text-gray-100 px-2 py-1 rounded-md text-sm font-medium transition"
                >
                  Events
                </a>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-gray-100 px-2 py-1 rounded-md text-sm font-medium transition"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Center: Search */}
            <div className="hidden md:flex flex-1 justify-center px-4">
              <div className="relative w-full max-w-md">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search or jump to…"
                  aria-label="Search"
                  className="w-full bg-neutral-800 text-gray-200 placeholder-neutral-500 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:bg-neutral-700 transition"
                />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-4">
              {/* Plus Menu */}
              <div className="relative" ref={plusRef}>
                <button
                  onClick={() => setPlusOpen((o) => !o)}
                  className="p-2 rounded-md text-gray-300 hover:bg-neutral-800 hover:text-white transition"
                  aria-label="Create new…"
                >
                  <FiPlus className="h-5 w-5" />
                </button>
                {plusOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-20 py-1 z-10">
                    <a
                      href="/new/event"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-neutral-700 transition"
                    >
                      New Event
                    </a>
                    <a
                      href="/new/park"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-neutral-700 transition"
                    >
                      New Skatepark
                    </a>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <button
                className="relative p-2 rounded-md text-gray-300 hover:bg-neutral-800 hover:text-white transition"
                aria-label="Notifications"
              >
                <FiBell className="h-5 w-5" />
                <span className="absolute top-1 right-1 inline-block w-2 h-2 bg-red-600 rounded-full" />
              </button>

              {/* Profile Menu */}
              <ProfileMenu
                profileOpen={profileOpen}
                setProfileOpen={setProfileOpen}
              />

              {/* Mobile Menu Toggle */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileOpen((o) => !o)}
                  className="p-2 rounded-md text-gray-300 hover:bg-neutral-800 hover:text-white transition"
                  aria-label="Toggle mobile menu"
                >
                  {mobileOpen ? (
                    <AiOutlineClose className="h-6 w-6" />
                  ) : (
                    <AiOutlineMenu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 transform ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={() => setMobileOpen(false)}
        />
        <div className="relative bg-gray-900 w-64 h-full p-4">
          <nav className="space-y-1">
            <a
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-gray-100 transition"
            >
              About
            </a>
            <a
              href="/events"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-gray-100 transition"
            >
              Events
            </a>
            <a
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-gray-100 transition"
            >
              Contact
            </a>
            <a
              href="/dashboard"
              className="block mt-4 px-3 py-2 rounded-md text-base font-medium bg-teal-600 text-white hover:bg-teal-700 transition"
            >
              Dashboard
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
