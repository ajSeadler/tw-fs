import { LifeBuoy, MessageSquare, AtSign } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const cards = [
  {
    icon: <LifeBuoy size={48} />,
    title: "General Support",
    desc: "Need help navigating the app? Start here.",
    href: "/support",
  },
  {
    icon: <FaGithub size={48} />,
    title: "Report a Bug",
    desc: "Found a glitch? Let us know on GitHub.",
    href: "/bug-report",
  },
  {
    icon: <MessageSquare size={48} />,
    title: "Feature Request",
    desc: "Got an idea to improve favorites or stats? Share it.",
    href: "/feature-request",
  },
  {
    icon: <AtSign size={48} />,
    title: "Email Us",
    desc: "Prefer email? Send your thoughts anytime.",
    href: "mailto:feedback@skateevents.app",
  },
];

export const SupportCards: React.FC = () => (
  <div className="mt-12 max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
    {cards.map(({ icon, title, desc, href }) => (
      <a
        key={title}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener" : undefined}
        className="flex flex-col items-center text-center p-6 border border-neutral-800 rounded-lg hover:shadow-sm transition"
      >
        <div className="p-4 mb-4 border border-neutral-800 rounded-full">
          <span className="text-white">{icon}</span>
        </div>
        <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{desc}</p>
      </a>
    ))}
  </div>
);
