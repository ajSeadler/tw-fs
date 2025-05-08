// src/api/events.ts
const BASE_URL = "http://localhost:3000/api";

export interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
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

/**
 * Fetch all events, ordered by date descending.
 */
export async function fetchEvents(): Promise<Event[]> {
  const res = await fetch(`${BASE_URL}/events`);
  if (!res.ok) throw new Error(`Events fetch failed: ${res.status}`);
  return res.json();
}

/**
 * Fetch results for a given event ID.
 */
export async function fetchResultsFor(eventId: number): Promise<Result[]> {
  const res = await fetch(`${BASE_URL}/results/${eventId}`);
  if (!res.ok) throw new Error(`Results fetch failed for event ${eventId}`);
  return res.json();
}
