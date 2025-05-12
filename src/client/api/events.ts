// src/api/events.ts
const BASE_URL = "http://localhost:3000/api";

export interface Event {
  id: number;
  name: string;
  location: string;
  date: string; // ISO string
  host: string;
}

export interface Result {
  id: number;
  event_id: number;
  skater_name: string;
  placement: number;
  score: string | null;
  country: string;
}

/** Fetch all events, ordered by date descending on the server. */
export async function fetchEvents(): Promise<Event[]> {
  const res = await fetch(`${BASE_URL}/events`);
  if (!res.ok) throw new Error(`Events fetch failed: ${res.status}`);
  return res.json();
}

/**
 * Fetch the N most recent events.
 * Falls back to sorting client-side if the server doesn’t support `?limit=`.
 */
export async function fetchRecentEvents(limit = 3): Promise<Event[]> {
  // If your API supports `?limit=3&sort=date_desc`, you could do:
  // const res = await fetch(`${BASE_URL}/events?limit=${limit}&sort=date_desc`);
  // if (!res.ok) throw new Error(`Recent events fetch failed: ${res.status}`);
  // return res.json();

  // Fallback: fetch all & slice
  const all = await fetchEvents();
  return all
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, limit);
}

/** Fetch results for one event. */
export async function fetchResultsFor(eventId: number): Promise<Result[]> {
  const res = await fetch(`${BASE_URL}/results/${eventId}`);
  if (!res.ok) throw new Error(`Results fetch failed for event ${eventId}`);
  return res.json();
}
