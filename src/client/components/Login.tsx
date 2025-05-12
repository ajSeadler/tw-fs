import React, { useState } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

const Login: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const { user, token } = await loginUser(email, password);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage("Login successful! Redirecting…");
      setTimeout(() => navigate("/me"), 1500);
    } catch (error) {
      setMessage(`❌ ${(error as Error).message || "Login failed"}`);
    }
  };

  return (
    <div className="my-20 flex flex-col w-100 mx-auto">
      <p className="text-[32px] font-bold text-white text-left">
        Welcome Back!
      </p>
      <p className="mb-2.5 mt-2.5 font-normal text-zinc-400 text-left">
        Enter your email and password to sign in!
      </p>

      <form onSubmit={handleLogin} className="space-y-4 mt-8">
        {message && (
          <p
            className={`p-3 rounded ${
              message.startsWith("Login") ? "bg-green-800/40" : "bg-red-800/40"
            } text-sm text-white text-center`}
          >
            {message}
          </p>
        )}

        <div className="grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border bg-zinc-950 text-white border-zinc-800 px-4 py-3 text-sm font-medium placeholder:text-zinc-400 focus:outline-0"
            />

            <label htmlFor="password" className="text-white mt-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border bg-zinc-950 text-white border-zinc-800 px-4 py-3 text-sm font-medium placeholder:text-zinc-400 focus:outline-0"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-neutral-800 py-2 text-white font-medium hover:bg-gray-500 transition"
          >
            Sign in
          </button>
        </div>
      </form>

      <div className="text-center mt-4">
        <p>
          <a
            href="/forgot-password"
            className="font-medium text-white text-sm hover:underline"
          >
            Forgot your password?
          </a>
        </p>
        <p className="mt-1">
          <a
            href="/signup"
            className="font-medium text-white text-sm hover:underline"
          >
            Don't have an account? Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
