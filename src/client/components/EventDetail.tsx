import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventWithResults, type Event, type Result } from "../api/events";
import { Calendar, MapPin, Star } from "lucide-react";

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const eventId = Number(id);
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const fetchedEvent = await fetchEventWithResults(eventId);
        setEvent(fetchedEvent);
      } catch (err) {
        setError("Error fetching event details.");
      }
    }

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!event) {
    return <div className="text-center">Loading event details...</div>;
  }

  const lower = event.name.toLowerCase();

  return (
    <div className="max-w-screen-lg mx-auto py-10 px-6">
      {/* Header with Event Title and Logo */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          {lower.includes("sls") && (
            <img src="/images/sls-white.png" alt="SLS" className="h-8" />
          )}
          {lower.includes("x games") && (
            <img src="/images/xgames.png" alt="X Games" className="h-8" />
          )}
          {lower.includes("tampa") && (
            <img src="/images/tampa.png" alt="Tampa" className="h-8" />
          )}
          <h1 className="text-4xl font-semibold text-white">{event.name}</h1>
        </div>
        <button
          className="p-2 rounded-full text-white hover:text-neutral-400 transition-colors"
          aria-label="Favorite event"
        >
          <Star className="w-6 h-6" />
        </button>
      </div>

      {/* Event Information Section */}
      <div className="flex flex-col space-y-4 mb-10 text-neutral-100">
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-neutral-400" />
          <p>{event.location}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-neutral-400" />
          <p>{new Date(event.date).toLocaleDateString()}</p>
        </div>
        <div>
          Hosted by:{" "}
          <span className="text-neutral-300 font-semibold">{event.host}</span>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Results</h2>
        <div className="space-y-4">
          {event.results.length > 0 ? (
            event.results.map((result: Result) => (
              <div
                key={result.id}
                className="flex justify-between items-center p-4 bg-neutral-800 rounded-lg shadow-md"
              >
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-white">
                    {result.skater_name}
                  </p>
                  <p className="text-sm text-neutral-300">{result.placement}</p>
                </div>
                <div className="flex flex-col items-end text-sm text-neutral-300">
                  {result.score && <p>Score: {result.score}</p>}
                  <p>Country: {result.country}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-neutral-300">
              No results available for this event.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
