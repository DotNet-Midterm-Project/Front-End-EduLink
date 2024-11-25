import React from "react";
import EventSessions from "./EventSessions";
import Swal from "sweetalert2";
import { splitDescription } from "../../utils/dateUtils";

const EventCard = ({ event, onAddContent, onAddSession, onSessionAdded }) => {
  return (
    <div
      className="h-[500px] w-full max-w-xs border rounded-lg shadow-lg bg-white p-6 mb-8 transition-transform transform 
    hover:scale-104 hover:shadow-xl flex flex-col justify-between
    mx-3 mt-4 relative bg-clip-border text-gray-700 duration-300 ease-in-out hover:bg-gray-300"
    >
      {/* Image */}
      <div className="relative mb-6">
        <img
          src={`${import.meta.env.VITE_URL_BACKEND}/Resources/${
            event?.bannerImage
          }`}
          alt={event?.workshopName}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      {/* Event Details */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-left text-gray-800">
          {event?.workshopName}
        </h3>
        <p className="text-sm font-normal text-gray-500 mt-2">
          {event?.volunteerName} |{" "}
          {new Date(event?.workshopDateTime).toLocaleString()}
        </p>
        <p className="mt-4 font-normal text-gray-700">
          {/* {event?.workshopDescription} */}
          {splitDescription(event?.workshopDescription, 20)}

        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4 items-center">
        {/* Workshop Button */}
        {event?.eventType === "Workshop" && (
          <button
            onClick={() => onAddContent(event)}
            className="w-full px-4 py-2 mt-2 bg-[#0D47A1] text-white rounded-lg
             shadow-md hover:bg-[#0d48a1de] transition-all duration-200"
          >
            Add Event Content
          </button>
        )}

        {/* Private Session Buttons */}
        {event?.eventType === "PrivateSession" && (
          <>
            <div className="flex gap-2 w-full">
              <button
                onClick={() => {
                  if (event?.sessionCount == 0) {
                    Swal.fire({
                      icon: "info",
                      title: "All sessions have been added!",
                      text: "All the sessions for this event have already been added.",
                      confirmButtonColor: "#3085d6",
                      confirmButtonText: "OK",
                    });
                  } else {
                    onAddSession(event);
                  }
                }}
                className="flex-1 px-1 py-2 bg-[#f28f33] text-white rounded-lg shadow-md hover:bg-[#f28f33e2] transition-all duration-200"
              >
                Add Session ({event?.sessionCount})
              </button>

              <button
                onClick={() => onAddContent(event)}
                className="flex-1 py-2 bg-[#0D47A1] text-white rounded-lg shadow-md hover:bg-[#0d48a1de] transition-all duration-200"
              >
                Add Content
              </button>
            </div>

            {event?.sessions?.length > 0 && (
              <div className="mt-4 w-full">
                <h4 className="text-md font-bold text-gray-800 mb-2">
                  Sessions
                </h4>
                <EventSessions
                  eventId={event?.eventID}
                  sessions={event?.sessions}
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
