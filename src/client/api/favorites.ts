// src/api/favorites.ts
const BASE_URL = "http://localhost:3000/api";

import { type Event } from "../api/events";

export async function favoriteEvent(eventId: number, token: string) {
  const res = await fetch(`${BASE_URL}/favorites/${eventId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(`Failed to favorite (${res.status})`);
  return res.json();
}

export async function unfavoriteEvent(eventId: number, token: string) {
  const res = await fetch(`${BASE_URL}/favorites/${eventId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Failed to unfavorite (${res.status})`);
  return res.json();
}

export async function fetchFavorites(token: string) {
  const res = await fetch(`${BASE_URL}/favorites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Failed to fetch favorites (${res.status})`);
  const { favorites } = await res.json();
  return (favorites as Event[]).map((e) => e.id);
}
