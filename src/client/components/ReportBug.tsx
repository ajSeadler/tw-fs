import React, { useState } from "react";
import { Bug, UploadCloud } from "lucide-react";

const ReportBug: React.FC = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    steps: "",
    screenshot: null as File | null,
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as never;
    if (name === "screenshot") {
      setForm((f) => ({ ...f, screenshot: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // TODO: integrate your bug-report API here (FormData if file upload)
    setTimeout(() => setStatus("success"), 1000);
  };

  return (
    <section className="px-4 py-12">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center space-y-2">
        <Bug size={48} className="mx-auto text-white" />
        <h1 className="text-4xl font-bold text-white">Report a Bug</h1>
        <p className="text-gray-400">
          Help us squash bugs! Describe what happened and we’ll investigate.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 max-w-2xl mx-auto border border-neutral-800 rounded-lg p-8 shadow-sm space-y-6"
      >
        {/* Bug Title */}
        <div>
          <label htmlFor="title" className="block text-white font-semibold">
            Bug Title
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Short, descriptive summary"
            className="w-full mt-1 px-3 py-2 border border-neutral-800 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-white font-semibold"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            placeholder="What did you see? What did you expect?"
            className="w-full mt-1 px-3 py-2 border border-neutral-800 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none"
            required
          />
        </div>

        {/* Steps to Reproduce */}
        <div>
          <label htmlFor="steps" className="block text-white font-semibold">
            Steps to Reproduce
          </label>
          <textarea
            id="steps"
            name="steps"
            rows={4}
            value={form.steps}
            onChange={handleChange}
            placeholder="1. … 2. … 3. …"
            className="w-full mt-1 px-3 py-2 border border-neutral-800 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none"
            required
          />
        </div>

        {/* Screenshot Upload */}
        <div>
          <label className="block text-white font-semibold">
            Screenshot (optional)
          </label>
          <label
            htmlFor="screenshot"
            className="mt-1 flex items-center justify-center space-x-2 border border-neutral-800 rounded-md px-4 py-3 cursor-pointer hover:shadow-sm transition"
          >
            <UploadCloud className="text-gray-400" />
            <span className="text-gray-400 text-sm">
              {form.screenshot ? form.screenshot.name : "Click to upload"}
            </span>
            <input
              id="screenshot"
              name="screenshot"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full py-3 font-medium rounded-md border border-green-500 text-white hover:bg-green-500 transition"
        >
          {status === "sending" ? "Submitting..." : "Submit Bug"}
        </button>

        {status === "success" && (
          <p className="mt-4 text-green-400 text-center">
            Thanks! We’ve received your report.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-500 text-center">
            Oops—something went wrong. Please try again.
          </p>
        )}
      </form>

      {/* Helpful Links */}
      <div className="mt-16 max-w-2xl mx-auto space-y-4">
        <h2 className="text-2xl font-semibold text-white text-center">
          Need More Help?
        </h2>
        <p className="text-gray-400 text-center">
          Explore our community discussions or reach out on GitHub.
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="/support"
            className="text-white font-semibold hover:underline"
          >
            General Support
          </a>
          <a
            href="https://github.com/your-repo/issues"
            target="_blank"
            rel="noopener"
            className="text-white font-semibold hover:underline"
          >
            GitHub Issues
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReportBug;
