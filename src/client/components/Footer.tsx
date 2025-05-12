import type { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-black border-t border-neutral-700 text-gray-400 py-4">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center text-xs">
        <p>&copy; 2025 SkateEvents.com. All rights reserved.</p>
        <p className="text-white font-medium">SkateEvents.com</p>
        <a className="text-white underline" href="/terms">
          Terms and Conditions
        </a>
      </div>
    </footer>
  );
};

export default Footer;
