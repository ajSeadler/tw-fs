import React, { useState } from "react";
import { Search, BookOpen, LifeBuoy, Users } from "lucide-react";

const faqs = [
  {
    question: "How do I favorite an event?",
    answer:
      "Simply click the ★ icon next to the event name in any list. It will turn solid when favorited.",
  },
  {
    question: "How can I view my stats?",
    answer:
      "Visit your Profile page to see total favorites, last favorited event, top performers, and a breakdown of event types.",
  },
  {
    question: "Can I sync my favorites across devices?",
    answer:
      "Yes—just make sure you're logged in with the same account, and your favorites will stay in sync.",
  },
];

const articles = [
  {
    icon: <BookOpen size={32} />,
    title: "Getting Started",
    href: "/docs/getting-started",
  },
  {
    icon: <Users size={32} />,
    title: "Managing Your Profile",
    href: "/docs/profile",
  },
  {
    icon: <LifeBuoy size={32} />,
    title: "Troubleshooting",
    href: "/docs/troubleshooting",
  },
];

const GeneralSupport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter((f) =>
    f.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="px-4 py-12">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center space-y-2">
        <h1 className="text-4xl font-bold text-white">General Support</h1>
        <p className="text-gray-400">
          Find answers, browse guides, or get in touch if you need more help.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mt-8 max-w-2xl mx-auto">
        <div className="relative border border-neutral-800 rounded-lg overflow-hidden">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="Search help articles or FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Articles Section */}
      <div className="mt-12 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {articles.map(({ icon, title, href }) => (
          <a
            key={title}
            href={href}
            className="flex flex-col items-center text-center p-6 border border-neutral-800 rounded-lg hover:shadow-sm transition"
          >
            <div className="text-white mb-4">{icon}</div>
            <h2 className="text-neutral-200 font-semibold mb-2">{title}</h2>
          </a>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="mt-16 max-w-2xl mx-auto space-y-4">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">
          Frequently Asked Questions
        </h2>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map(({ question, answer }) => (
            <details
              key={question}
              className="border border-neutral-800 rounded-lg p-4"
            >
              <summary className="cursor-pointer font-medium text-neutral-200">
                {question}
              </summary>
              <p className="mt-2 text-gray-400">{answer}</p>
            </details>
          ))
        ) : (
          <p className="text-gray-400 text-center">
            No FAQs match “{searchTerm}.” Try another search.
          </p>
        )}
      </div>

      {/* Still Need Help */}
      <div className="mt-16 max-w-2xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-semibold text-white">Still Need Help?</h2>
        <p className="text-gray-400">
          If you can’t find what you’re looking for, drop us a line and we’ll
          get back to you ASAP.
        </p>
        <a
          href="/contact"
          className="inline-block px-6 py-3 border border-green-500 text-white font-medium rounded-md hover:bg-green-500 transition"
        >
          Contact Support
        </a>
      </div>
    </section>
  );
};

export default GeneralSupport;
