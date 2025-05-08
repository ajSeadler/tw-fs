// src/api/results.ts
const BASE_URL = "http://localhost:3000/api";

export interface Result {
  id: number;
  event_id: number;
  skater_name: string;
  placement: number;
  score: string | null;
  country: string;
}

/**
 * Fetch results for a single event.
 */
export async function fetchResultsFor(eventId: number): Promise<Result[]> {
  const res = await fetch(`${BASE_URL}/results/${eventId}`);
  if (!res.ok) {
    throw new Error(`Results fetch failed for event ${eventId}: ${res.status}`);
  }
  return res.json();
}

/**
 * (Optional) Fetch *all* results across every event.
 * Useful if you want to build a global leaderboard without
 * hitting each event endpoint separately.
 */
export async function fetchAllResults(): Promise<Result[]> {
  const res = await fetch(`${BASE_URL}/results/all`);
  if (!res.ok) {
    throw new Error(`All‐results fetch failed: ${res.status}`);
  }
  return res.json();
}
