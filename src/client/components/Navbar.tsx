import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FiSearch, FiBell, FiPlus, FiLogIn, FiUserPlus } from "react-icons/fi";
import ProfileMenu from "./ProfileMenu";
import { useLocation } from "react-router-dom"; // Import useLocation

const Navbar: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [plusOpen, setPlusOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const prevScrollY = useRef(0); // Keeps track of the previous scroll position

  const plusRef = useRef<HTMLDivElement>(null);
  const location = useLocation(); // Get the current path

  // close + menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (plusRef.current && !plusRef.current.contains(e.target as Node)) {
        setPlusOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Scroll event listener for hiding/revealing navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > prevScrollY.current) {
        // Scroll down
        setShowNavbar(false);
      } else {
        // Scroll up
        setShowNavbar(true);
      }
      prevScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // detect token
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return (
    <>
      <nav
        className={`backdrop-blur-sm border-b border-neutral-700 sticky top-0 z-50 transition-all duration-300 ${
          showNavbar ? "transform translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Logo + Links */}
            <div className="flex items-center space-x-6">
              <a
                href="/"
                className="flex items-center text-gray-100 hover:text-white transition"
              >
                <span className="ml-2 text-xl font-semibold tracking-wide">
                  Home
                </span>
              </a>
              <div className="hidden md:flex space-x-4">
                <a
                  href="/events"
                  className={`relative group text-gray-300 hover:text-white px-2 py-1 text-sm font-medium focus:outline-none ${
                    location.pathname === "/events" ? "text-white" : ""
                  }`}
                >
                  Events
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 block h-0.5 bg-white transition-all duration-300 ${
                      location.pathname === "/events"
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
                <a
                  href="/support&feedback"
                  className={`relative group text-gray-300 hover:text-white px-2 py-1 text-sm font-medium focus:outline-none ${
                    location.pathname === "/support&feedback"
                      ? "text-white"
                      : ""
                  }`}
                >
                  Support & Feedback
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 block h-0.5 bg-white transition-all duration-300 ${
                      location.pathname === "/support&feedback"
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
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
              {!token ? (
                <div className="flex items-center space-x-4">
                  <a
                    href="/login"
                    className="relative group text-gray-300 hover:text-white px-3 py-2 text-sm font-medium focus:outline-none"
                  >
                    <FiLogIn className="inline-block mr-1 w-5 h-5 align-text-bottom" />
                    Login
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 block h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
                  </a>

                  <a
                    href="/signup"
                    className="inline-flex items-center bg-white text-neutral-900 px-4 py-2 text-sm font-medium rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                  >
                    <FiUserPlus className="inline-block mr-1 w-5 h-5 align-text-bottom" />
                    Sign Up
                  </a>
                </div>
              ) : (
                <>
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

                  <button
                    className="relative p-2 rounded-md text-gray-300 hover:bg-neutral-800 hover:text-white transition"
                    aria-label="Notifications"
                  >
                    <FiBell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 inline-block w-2 h-2 bg-red-600 rounded-full" />
                  </button>

                  <ProfileMenu
                    profileOpen={profileOpen}
                    setProfileOpen={setProfileOpen}
                  />
                </>
              )}

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
              Support & Feedback
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
