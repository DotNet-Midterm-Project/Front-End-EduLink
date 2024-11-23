import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  fetchEventsByVolunteerAndCourse,
  clearMessages,
  deleteBooking,
} from "../../Redux/Slices/bookingEventSlice";
import { bookAnEvent } from "../../Redux/Slices/bookingEventSlice";
import Loading from "../../Components/Loading";
import { arrow_left } from "../../assets";
import { EventDateTime } from "../../utils/dateUtils";
import { trsh, download } from "../../assets";

function EventContentPage() {
  const { eventId } = useParams();
  const location1 = useLocation();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const eventDetailsFromEventPAge = location1?.state;
  const dispatch = useDispatch();
  const isYourEvent = event?.location === "YourEvent";

  useEffect(() => {
    setEvent(eventDetailsFromEventPAge);
  }, [eventDetailsFromEventPAge]);

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

  const eventDetails2 = eventContent?.filter(
    (event) => event?.eventID == eventId
  );
  console.log(eventContent);

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
        // Swal.fire("Error", bookingError, "error");
      }
      dispatch(clearMessages());
    }
  }, [successMessage, bookingError, dispatch]);

  const handleJoinNow = () => {
    console.log();

    if (!eventDetails2[0]) {
      Swal.fire("Error", "Event details are not available.", "error");
      return;
    }

    // Check if the event is closed
    if (eventDetails2[0]?.state === "Closed") {
      Swal.fire(
        "Event Closed",
        "This event is currently closed for bookings.",
        "warning"
      );
      return;
    }

    // Check if the capacity is 0
    if (eventDetails2[0]?.capacity === 0) {
      Swal.fire(
        "Tickets Sold Out",
        "All tickets for this event are sold out.",
        "info"
      );
      return;
    }

    // Proceed to book the event
    if (!eventId) {
      Swal.fire("Error", "Invalid event ID", "error");
      return;
    }

    dispatch(bookAnEvent(eventId));
  };

  if (eventsLoading) return <Loading />;

  const handleDeleteEvent = (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the booking permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBooking(bookingId)).then((action) => {
          if (deleteBooking.fulfilled.match(action)) {
            Swal.fire(
              "Deleted!",
              "Your booking has been deleted.",
              "success"
            ).then(() => {
              navigate("/student-page");
            });
          } else {
            Swal.fire(
              "Error",
              action.payload || "Failed to delete the booking.",
              "error"
            );
          }
        });
      }
    });
  };

  const eventDetails = [
    {
      label: "Address",
      value: isYourEvent
        ? event?.eventAddress
        : eventDetails2[0]?.eventAddress || "N/A",
    },
    {
      label: "Location",
      value: isYourEvent
        ? event?.eventLocation
        : eventDetails2[0]?.location || "N/A",
    },
    {
      label: "Event Type",
      value: isYourEvent
        ? event?.eventType
        : eventDetails2[0]?.eventType || "N/A",
    },
    {
      label: "Status",
      value: isYourEvent
        ? event?.sessionStatus
        : eventDetails2[0]?.eventStatus || "N/A",
    },
    {
      label:
        eventDetails2[0]?.eventType == "Workshop"
          ? "Capacity"
          : "Session Count",
      value: isYourEvent
        ? event?.capacity
        : eventDetails2[0]?.eventType == "Workshop"
        ? eventDetails2[0]?.capacity
        : eventDetails2[0]?.sessionCount || "N/A",
    },
    {
      label: "Start Date",
      value: isYourEvent ? (
        <EventDateTime dateTime={event?.startTime} />
      ) : (
        <EventDateTime dateTime={eventDetails2[0]?.startTime} /> || "N/A"
      ),
    },
    {
      label: "End Date",
      value: isYourEvent ? (
        <EventDateTime dateTime={event?.endTime} />
      ) : (
        <EventDateTime dateTime={eventDetails2[0]?.endTime} /> || "N/A"
      ),
    },
    ...(isYourEvent && event?.eventType === "PrivateSession"
      ? [{ label: "Session", value: event?.sessionCount }]
      : []),
  ];
  console.log(eventDetails2);

  return (
    <main className="antialiased mt-12 mx-8">
      <div className="flex justify-between px-4 w-full">
        <article className="w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <div className="w-8 h-8">
            <Link to={!isYourEvent ? "/event-page" : "/your-event-page"}>
              <img src={arrow_left} alt="Back" />
            </Link>
          </div>
          <div className="rounded-gl mx-auto w-full h-[27rem] opacity-90">
            <img
              src={
                !isYourEvent
                  ? `${import.meta.env.VITE_URL_BACKEND}/Resources/${
                      eventDetails2[0]?.bannerImage
                    }`
                  : `${import.meta.env.VITE_URL_BACKEND}/Resources/${
                      event?.image
                    }`
              }
              alt={eventDetails2[0]?.title || "Event Banner"}
              className="block w-full h-full object-cover"
              style={{ borderRadius: "0px 20px 20px 20px" }}
            />
          </div>

          <div className="mt-8">
            <h1 className="font-bold mt-4">
              {isYourEvent ? event?.auther : eventDetails2[0]?.volunteerName}
            </h1>
            <p className="lead mt-4">
              {isYourEvent
                ? event?.title
                : eventDetails2[0]?.title || "Event Title"}{" "}
              -{" "}
              {isYourEvent
                ? event?.courseName
                : eventDetails2[0]?.courseName || "Course Name"}
            </p>
            <p className="lead mt-4">
              {isYourEvent
                ? event?.description
                : eventDetails2[0]?.eventDescription ||
                  "Description not available."}
            </p>
          </div>

          <div className="max-w-2xl p-4">
            <div className="border-2 border-black rounded-2xl overflow-hidden">
              {eventDetails?.map((detail, index) => (
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

          {(isYourEvent &&
            event?.eventLocation == "Online" &&
            event?.eventAddress != "The Event link will be sent later") ||
          eventDetails2[0]?.eventType == "PrivateSession" ? (
            <div
              className={`mx-3 mt-4 relative flex w-[23rem] max-w-[26rem] flex-col
           bg-white bg-clip-borde shadow-lg transition duration-300 ease-in-out`}
            >
              <div className="p-6 border-2 border-blue-900 rounded-xl">
                <div className="mb-3 flex items-center justify-center ">
                  <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal antialiased">
                    {event?.title} - {event?.courseName}
                  </h5>
                </div>
                <p className="block font-sans text-base leading-relaxed antialiased">
                  {event?.description}
                </p>
                <p className="block font-bold mt-4 text-base leading-relaxed antialiased">
                  capacity: {event?.capacity}
                </p>
                <a
                  href={event?.eventAddress}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-12 block w-full select-none rounded-lg bg-[#171E4B] py-3.5 px-7 text-center align-middle font-sans
             text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:bg-[#293aaa]
              focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Join
                </a>
              </div>
            </div>
          ) : null}
        </article>
      </div>
      <div className="flex justify-end m-12">
        {isYourEvent ? (
          <button
            onClick={() => handleDeleteEvent(event?.bookingId)}
            className="flex justify-center items-center text-red-600 font-bold font-mono border border-red-600 w-48 rounded-lg py-2"
          >
            <img src={trsh} alt="Trash Icon" />
            <p>Delete Event</p>
          </button>
        ) : eventDetails2[0]?.eventType === "Workshop" ? (
          <button
            onClick={handleJoinNow}
            className="bg-[#0B102F] font-bold font-mono text-white p-2 w-48 rounded-lg"
            disabled={bookingLoading}
          >
            {bookingLoading ? "Joining..." : "Join Now"}
          </button>
        ) : null}
      </div>
    </main>
  );
}

export default EventContentPage;
