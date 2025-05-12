import type { FC } from "react";

const DemoScreenshot: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 px-4">
      <div className="max-w-4xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-white text-center">
          Website Demo
        </h1>
        <p className="text-sm text-gray-400 text-center">
          Here's a glimpse of what our website looks like. This demo showcases
          the features and design that you can expect. Explore, enjoy, and
          experience the clean and modern UI.
        </p>

        <div className="flex justify-center">
          <img
            src="/images/screenshot.png"
            alt="Website Demo"
            className="rounded-lg shadow-lg"
          />
        </div>

        <p className="text-center text-gray-400 mt-4">
          Take a tour and see how our features can help you achieve your goals.
        </p>
      </div>
    </div>
  );
};

export default DemoScreenshot;
