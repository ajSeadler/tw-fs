import React, { useState } from "react";

import { SupportCards } from "./SupportCards";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "general",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // TODO: replace with your real API call
    setTimeout(() => setStatus("success"), 1000);
  };

  return (
    <section className="px-4 py-12">
      {/* Intro */}
      <div className="max-w-2xl mx-auto text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">
          Get Support & Give Feedback
        </h2>
        <p className="text-gray-400">
          Questions about favorites, stats, or just want to request a feature?
          We’re all ears.
        </p>
      </div>

      <div className="flex flex-row px-10">
        <SupportCards />
        {/* Feedback Form */}
        <div className="mt-16 max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="border border-neutral-800 rounded-lg p-8 shadow-sm space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white text-center">
              Send Us a Message
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-400 text-sm">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full mt-1 px-3 py-2 border border-neutral-800 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-400 text-sm">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full mt-1 px-3 py-2 border border-neutral-800 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="type" className="block text-gray-400 text-sm">
                  Inquiry Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border border-neutral-800 rounded-md bg-transparent text-white focus:outline-none"
                >
                  <option value="general">General</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-gray-400 text-sm"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className="w-full mt-1 px-3 py-2 border border-neutral-800 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-3 font-medium rounded-md border border-green-500 text-white hover:bg-green-500 transition"
            >
              {status === "sending" ? "Sending..." : "Submit"}
            </button>

            {status === "success" && (
              <p className="mt-4 text-green-400 text-center">
                Thanks! We’ll be in touch.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-red-500 text-center">
                Oops—something went wrong.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* FAQs */}
      <div className="mt-16 max-w-xl mx-auto space-y-4">
        <h3 className="text-2xl font-semibold text-white text-center">FAQs</h3>
        {[
          {
            q: "How do I favorite an event?",
            a: "Click the ★ icon next to any event in the list to add it to your favorites.",
          },
          {
            q: "Where can I see my stats?",
            a: "Head to your profile page to view total favorites, top performers, and more.",
          },
          {
            q: "How do I request a new feature?",
            a: "Use the “Feature Request” channel above or submit a request via the form.",
          },
        ].map(({ q, a }) => (
          <details key={q} className="border border-neutral-800 rounded-lg p-4">
            <summary className="cursor-pointer font-medium text-neutral-300">
              {q}
            </summary>
            <p className="mt-2 text-gray-400">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default ContactSection;
