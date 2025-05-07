// src/components/SignUp.tsx
import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ApiResponse =
  | { user: { id: number; email: string }; token: string }
  | { error: string };

const SignUp: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
    <div className="flex flex-col items-center justify-start h-screen bg-zinc-950 px-4">
      <div className="w-full max-w-md space-y-6 mt-20">
        <h1 className="text-3xl font-bold text-white text-left">
          Create Your Account
        </h1>

        {message && (
          <p
            className={`p-3 rounded ${
              message.startsWith("✅") ? "bg-green-800" : "bg-red-800"
            } text-sm text-white`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
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

          {/* Password */}
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
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-neutral-800 py-2 text-white font-medium hover:bg-gray-500 transition"
          >
            Sign Up
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
