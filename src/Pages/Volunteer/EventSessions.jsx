import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Components/Admin/Loading";


const EventSessions = ({ eventId }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL_BACKEND}/api/Common/get-event-sessions?eventId=${eventId}`
        );
        setSessions(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [eventId]);

  if (loading) return <Loading />;

  return (
    <div>
      {sessions.length > 0 ? (
        sessions.map((session, index) => (
          <div key={index} className="session">
            <p>
              <strong>Start:</strong> {session.StartTime}
            </p>
            <p>
              <strong>End:</strong> {session.EndTime}
            </p>
            <p>
              <strong>Details:</strong> {session.Details}
            </p>
            <p>
              <strong>Capacity:</strong> {session.Capacity}
            </p>
          </div>
        ))
      ) : (
        <p>No sessions available for this event.</p>
      )}
    </div>
  );
};

export default EventSessions;
