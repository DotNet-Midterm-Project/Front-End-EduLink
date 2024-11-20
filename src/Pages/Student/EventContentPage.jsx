import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {
  fetchEventsByVolunteerAndCourse,
  clearMessages,
} from "../../Redux/Slices/bookingEventSlice";
import { bookAnEvent } from "../../Redux/Slices/bookingEventSlice";
import Loading from "../../Components/Loading";
import { arrow_left, imagesecation } from "../../assets";

function EventContentPage() {
  const location1 = useLocation();
  const event = location1?.state;
  const dispatch = useDispatch();

  const {
    eventContent,
    loading: eventsLoading,
    error,
  } = useSelector((state) => state.bookingEvent);
  const {
    loading: bookingLoading,
    successMessage,
    error: bookingError,
  } = useSelector((state) => state.bookingEvent);

  useEffect(() => {
    if (event?.volunteerID && event?.courseID) {
      dispatch(
        fetchEventsByVolunteerAndCourse({
          volunteerID: event?.volunteerID,
          courseID: event?.courseID,
        })
      );
    }
  }, [dispatch, event]);

  useEffect(() => {
    if (successMessage) {
      Swal.fire("Success", successMessage, "success");
      dispatch(clearMessages()); // Clear messages after showing
    }
    if (bookingError) {
      if (bookingError === "You have already booked this event.") {
        Swal.fire("Already Booked", bookingError, "info");
      } else {
        Swal.fire("Error", bookingError, "error");
      }
      dispatch(clearMessages());
    }
  }, [successMessage, bookingError, dispatch]);

  const handleJoinNow = () => {
    if (!eventDetails2) {
      Swal.fire("Error", "Event details are not available.", "error");
      return;
    }

    // Check if the event is closed
    if (eventDetails2?.state === "Closed") {
      Swal.fire(
        "Event Closed",
        "This event is currently closed for bookings.",
        "warning"
      );
      return;
    }

    // Check if the capacity is 0
    if (eventDetails2?.capacity === 0) {
      Swal.fire(
        "Tickets Sold Out",
        "All tickets for this event are sold out.",
        "info"
      );
      return;
    }

    // Proceed to book the event
    if (!event?.eventId) {
      Swal.fire("Error", "Invalid event ID", "error");
      return;
    }

    dispatch(bookAnEvent(event?.eventId));
  };

  if (eventsLoading) return <Loading />;

  const eventDetails = [
    { label: "Address", value: eventContent?.[0]?.eventAddress || "N/A" },
    { label: "Location", value: eventContent?.[0]?.location || "N/A" },
    { label: "Event Type", value: eventContent?.[0]?.eventType || "N/A" },
    { label: "Status", value: eventContent?.[0]?.eventStatus || "N/A" },
    { label: "Capacity", value: eventContent?.[0]?.capacity || "N/A" },
    { label: "Start Date", value: eventContent?.[0]?.startTime || "N/A" },
    { label: "End Date", value: eventContent?.[0]?.endTime || "N/A" },
  ];
  const eventDetails2 = eventContent?.[0];
  console.log(eventDetails2);

  return (
    <main className="antialiased mt-12 mx-8">
      <div className="flex justify-between px-4 w-full">
        <article className="w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <div className="w-8 h-8">
            <Link to={"/event-page"}>
              <img src={arrow_left} alt="Back" />
            </Link>
          </div>
          <div className="rounded-gl mx-auto w-full h-[27rem] opacity-90">
            <img
              src={eventDetails2?.bannerImage || imagesecation}
              alt={eventDetails2?.title || "Event Banner"}
              className="block w-full h-full object-cover"
              style={{ borderRadius: "0px 20px 20px 20px" }}
            />
          </div>

          <div className="">
            <h1 className="font-bold mt-4 text-[#0B102F]">
              {eventDetails2?.volunteerName || "Volunteer Name"}
            </h1>
            <p className="lead mt-4">
              {eventDetails2?.title || "Event Title"} -{" "}
              {eventDetails2?.courseName || "Course Name"}
            </p>
            <p className="lead mt-4">
              {eventDetails2?.eventDescription || "Description not available."}
            </p>
          </div>

          <div className="max-w-2xl p-4">
            <div className="border-2 border-black rounded-2xl overflow-hidden">
              {eventDetails.map((detail, index) => (
                <div
                  key={detail?.label}
                  className={`flex divide-x ${
                    index !== eventDetails?.length - 1
                      ? "border-b-2 border-black"
                      : ""
                  }`}
                >
                  <div className="w-1/2 p-4 font-bold text-center">
                    {detail?.label}
                  </div>
                  <div className="w-1/2 p-4 border-black text-center">
                    {detail?.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
      <div className="flex justify-end m-12">
        <button
          onClick={handleJoinNow}
          className="bg-[#0B102F] font-bold font-mono text-white p-2 w-48 rounded-lg"
          disabled={bookingLoading}
        >
          {bookingLoading ? "Joining..." : "Join Now"}
        </button>
      </div>
    </main>
  );
}

export default EventContentPage;
