import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Loading from "../../Components/Loading";
import ServerError from "../../Components/Error/ServerError";
import Card from "../../Components/Card";
import Search from "../../Components/Search";
import NoData from "../../Components/Error/NoData";

import AddSessionModal from "./AddSessionModal";
import { FetchAllVolunteerEvents } from "../../Redux/Slices/VolunteerSlice";
import AddEventContentModal from "./AddEventContentModal";
import EventSessions from "./EventSessions";

function VolunteerEventPage() {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.volunteer);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showContentModal, setShowContentModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);

  const getVolunteerIDFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.VolunteerID || null;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  const volunteerID = getVolunteerIDFromToken();

  useEffect(() => {
    if (volunteerID) {
      dispatch(FetchAllVolunteerEvents(volunteerID));
    }
  }, [dispatch, volunteerID]);

  const filteredEvents = events?.filter((event) =>
    event.workshopName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddContent = (event) => {
    setSelectedEvent(event);
    setShowContentModal(true);
  };

  const handleAddSession = (event) => {
    setSelectedEvent(event);
    setShowSessionModal(true);
  };

  const handleSessionAdded = async () => {
    if (selectedEvent) {
      await dispatch(FetchAllVolunteerEvents(volunteerID)); // تحديث الأحداث
    }
  };

  if (loading) return <Loading />;
  if (error) return <ServerError />;

  return (
    <>
      <div className="mt-28">
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search for event..."
        />
      </div>
      <div className="my-28 mx-8">
        {filteredEvents?.length > 0 ? (
          filteredEvents.map((event) => (
            // "eventID": 0,
            // "volunteerID": 9,
            // "courseID": 0,
            // "volunteerName": "fadi",
            // "workshopName": "java",
            // "workshopDescription": "java totrial",
            // "workshopDateTime": "2024-11-23T14:14:37.91",
            // "sessionLink": "The session link will be sent later",
            // "capacity": 10
            <Card
              key={event.eventID}
              id={event.eventID}
              eventId={event.eventID}
              courseID={event.courseID}
              volunteerID={event.volunteerID}
              title={event.workshopName}
              author={event.volunteerName}
              description={event.workshopDescription}
              date={event.workshopDateTime}
              image={event.eventFile}
              capacity={event.capacity}
              sessionLink={event.sessionLink}
              location="event"
            >
              {/* Buttons for Event Content and Session */}
              {event.eventType === "Workshop" && (
                <button
                  onClick={() => handleAddContent(event)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Event Content
                </button>
              )}
              {event.eventType === "PrivateSession" && event.sessionCount > 0 && (
                <button
                  onClick={() => handleAddSession(event)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add Session
                </button>
              )}
              <EventSessions eventId={event.eventID} />
            </Card>
          ))
        ) : (
          <NoData location="event" />
        )}
      </div>

      {/* Modals */}
      {showContentModal && (
        <AddEventContentModal
          event={selectedEvent}
          onClose={() => setShowContentModal(false)}
        />
      )}
      {showSessionModal && (
        <AddSessionModal
          event={selectedEvent}
          onClose={() => setShowSessionModal(false)}
          onSessionAdded={handleSessionAdded}
        />
      )}
    </>
  );
}

export default VolunteerEventPage;
