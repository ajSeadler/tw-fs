// src/api/auth.ts
export type LoginResponse =
  | { user: { id: number; email: string }; token: string; error: string }
  | { error: string };

export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: { id: number; email: string }; token: string }> => {
  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data: LoginResponse = await res.json();

  if (!res.ok || "error" in data) {
    throw new Error(data.error || "Login failed");
  }

  return data; // Now it's safely the success shape
};
