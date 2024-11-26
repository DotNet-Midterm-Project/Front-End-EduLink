import React from "react";

const EventSessions = ({ sessions }) => {
  return (
    <div>
      {sessions.length > 0 ? (
        sessions.map((session, index) => (
          <div key={index} className="border-b py-2 text-sm text-gray-600">
            <p>
              <strong>Start:</strong> {new Date(session.startDate).toLocaleString()}
            </p>
            <p>
              <strong>End:</strong> {new Date(session.endDate).toLocaleString()}
            </p>
            <p>
              <strong>Details:</strong> {session.details}
            </p>
            <p>
              <strong>Capacity:</strong> {session.sessionCapacity}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No sessions available for this event.</p>
      )}
    </div>
  );
};

export default EventSessions;
