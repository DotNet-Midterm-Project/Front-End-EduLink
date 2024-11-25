import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading";
import ServerError from "../../Components/Error/ServerError";
import Search from "../../Components/Search";
import NoData from "../../Components/Error/NoData";
import AddSessionModal from "./AddSessionModal";
import AddEventContentModal from "./AddEventContentModal";
import { FetchAllVolunteerEvents } from "../../Redux/Slices/VolunteerSlice";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import Breadcrumb from "../../Components/Breadcrumb";

function VolunteerEventPage() {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.volunteer);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showSessionsModal, setShowSessionsModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);

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

  const filteredEvents = Array?.isArray(events)
    ? events?.filter((event) =>
        event?.workshopName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      )
    : [];

  const handleAddSession = (event) => {
    setSelectedEvent(event);
    setShowSessionsModal(true);
  };

  const handleAddContent = (event) => {
    setSelectedEvent(event);
    setShowContentModal(true);
  };

  const handleSessionAdded = () => {
    dispatch(FetchAllVolunteerEvents(volunteerID));
  };

  console.log(events);

  if (loading) return <Loading />;
  if (error) return <ServerError />;

  return (
    <>
     
      <div className="mt-32">
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search for event..."
        />
      </div>

      <Breadcrumb />
      <div className="my-6 mx-4 flex flex-wrap justify-start ">
        {filteredEvents?.length > 0 ? (
          filteredEvents?.map((event) => (
            <div
              key={event?.eventID}
              className="sm:w-1/2 md:w-1/3 lg:w-1/4 h-full"
            >
              <EventCard
                event={event}
                onAddContent={handleAddContent}
                onAddSession={handleAddSession}
                onSessionAdded={handleSessionAdded}
              />
            </div>
          ))
        ) : (
          <NoData message="No event found." location="event" />
        )}
      </div>

      {/* Modals */}
      {selectedEvent && showSessionsModal && (
        <AddSessionModal
          event={selectedEvent}
          isOpen={showSessionsModal}
          onClose={() => setShowSessionsModal(false)}
          onSessionAdded={handleSessionAdded}
        />
      )}

      {selectedEvent && showContentModal && (
        <AddEventContentModal
          event={selectedEvent}
          isOpen={showContentModal}
          onClose={() => setShowContentModal(false)}
        />
      )}
    </>
  );
}

export default VolunteerEventPage;
