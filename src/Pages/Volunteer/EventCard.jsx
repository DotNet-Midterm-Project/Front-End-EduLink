import React from "react";
import EventSessions from "./EventSessions";

const EventCard = ({ event, onAddContent, onAddSession, onSessionAdded }) => {
  return (
    <div className="w-full max-w-xs border rounded-lg shadow-lg bg-white p-6 mb-8 transition-transform transform hover:scale-105 hover:shadow-xl">
      {/* Image */}
      <div className="relative mb-6">
        <img
          src={`${import.meta.env.VITE_URL_BACKEND}/Resources/${event.bannerImage}`}
          alt={event.workshopName}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      {/* Event Details */}
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold text-gray-800">{event.workshopName}</h3>
        <p className="text-sm text-gray-500 mt-2">
          {event.volunteerName} |{" "}
          {new Date(event.workshopDateTime).toLocaleString()}
        </p>
        <p className="mt-4 text-gray-700">{event.workshopDescription}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4 items-center">
        {/* Workshop Button */}
        {event.eventType === "Workshop" && (
          <button
            onClick={() => onAddContent(event)}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
          >
            Add Event Content
          </button>
        )}

        {/* Private Session Buttons */}
        {event.eventType === "PrivateSession" && (
          <>
            <div className="flex gap-2 w-full">
              <button
                onClick={() => onAddSession(event)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition-all duration-200"
              >
                Add Session
              </button>
              <button
                onClick={() => onAddContent(event)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
              >
                Add Content
              </button>
            </div>

            {event.sessions?.length > 0 && (
              <div className="mt-4 w-full">
                <h4 className="text-md font-bold text-gray-800 mb-2">
                  Sessions
                </h4>
                <EventSessions
                  eventId={event.eventID}
                  sessions={event.sessions}
                  onSessionAdded={onSessionAdded}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventCard;
