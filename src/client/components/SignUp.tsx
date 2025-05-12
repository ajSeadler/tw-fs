// src/components/SignUp.tsx
import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ApiResponse =
  | { user: { id: number; email: string }; token: string }
  | { error: string };

const SignUp: FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!agree) {
      setMessage("❌ You must agree to the terms.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${(data as { error: string }).error}`);
        return;
      }

      const { token } = data as {
        user: { id: number; email: string };
        token: string;
      };

      localStorage.setItem("token", token);
      setMessage("✅ Account created! Redirecting…");
      setTimeout(() => navigate("/finishaccount"), 1500);
    } catch {
      setMessage("❌ Network error, try again.");
    }
  };

  return (
    <div className="flex items-center justify-center my-20 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
          <p className="text-sm text-gray-400">
            Join the community. Create an account to save your progress and
            access exclusive features.
          </p>
        </div>

        {message && (
          <div
            className={`p-3 rounded text-sm text-white ${
              message.startsWith("✅") ? "bg-green-800" : "bg-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-white"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-white placeholder-zinc-500 focus:outline-none"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-white"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-white placeholder-zinc-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-white placeholder-zinc-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-white placeholder-zinc-500 focus:outline-none"
            />
            <p className="mt-1 text-xs text-gray-500">
              Must be at least 6 characters.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-0 rounded border-zinc-700 bg-zinc-950"
            />
            <label htmlFor="terms" className="text-sm text-gray-400">
              I agree to the{" "}
              <a href="/terms" className="underline hover:text-white">
                Terms & Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-neutral-800 py-2 text-white font-medium hover:bg-gray-500 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-medium text-gray-200 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
