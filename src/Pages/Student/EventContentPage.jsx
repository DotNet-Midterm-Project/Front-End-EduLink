import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  fetchEventsByVolunteerAndCourse,
  clearMessages,
  deleteBooking,
  fetchAlleventSessions,
  joinSession,
  fetchEventContent,
  downloadFile,
  bookAnEvent,
} from "../../Redux/Slices/bookingEventSlice";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";
import { EventDateTime } from "../../utils/dateUtils";
import {
  trsh,
  download,
  StartDate,
  EndDate,
  Capacity,
  status,
  eventType,
  address,
  location,
  counting,
} from "../../assets";

function EventContentPage() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location1 = useLocation();
  const [event, setEvent] = useState({});
  const eventDetailsFromEventPAge = location1?.state;
  const isYourEvent = event?.location === "YourEvent";

  const { eventContent, loading: eventsLoading } = useSelector(
    (state) => state.bookingEvent
  );
  const { selectedEvent } = useSelector((state) => state.bookingEvent);
  console.log(eventDetailsFromEventPAge);

  const eventDetails2 = eventContent?.filter(
    (event) => event?.eventID == eventId
  );

  const { eventSessions } = useSelector((state) => state.bookingEvent);

  console.log(eventSessions);

  const {
    loading: bookingLoading,
    successMessage,
    error: bookingError,
  } = useSelector((state) => state.bookingEvent);

  useEffect(() => {
    setEvent(eventDetailsFromEventPAge);
  }, [eventDetailsFromEventPAge]);
  

  useEffect(() => {
    // if (eventDetails2[0]?.eventType == "PrivateSession") {
    // console.log(eventDetails2[0]?.eventType == "PrivateSession");

    dispatch(fetchAlleventSessions(eventId));
  }, [dispatch, eventId]);

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
    if (isYourEvent) {
      dispatch(fetchEventContent(eventId));
    }
  }, [dispatch, eventId, isYourEvent]);

  useEffect(() => {
    if (successMessage) {
      Swal.fire("Success", successMessage, "success");
      dispatch(clearMessages());
    }
    if (bookingError) {
      if (bookingError === "You have already booked this event.") {
        Swal.fire("Already Booked", bookingError, "info");
      }
      dispatch(clearMessages());
    }
  }, [successMessage, bookingError, dispatch]);

  const handleDownload = (eventID) => {
    dispatch(downloadFile(eventID));
  };

  const handleJoinNow = () => {
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

  const handleJoinSession = async (sessionId) => {
    try {
      const resultAction = await dispatch(joinSession(sessionId));

      if (joinSession.fulfilled.match(resultAction)) {
        Swal.fire({
          title: "Success!",
          text: "You have successfully joined the session.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
      } else {
        console.error("Failed to join session:", resultAction.payload);

        Swal.fire({
          title: "Error!",
          text: resultAction.payload || "Failed to join the session.",
          icon: "error",
          confirmButtonText: "Retry",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("An error occurred while joining the session:", error);

      Swal.fire({
        title: "Unexpected Error",
        text: "An unexpected error occurred. Please try again later.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#f39c12",
      });
    }
  };

  const hasJoinedSession = (sessionId) => {
    return eventSessions?.some((session) => session.sessionId === sessionId);
  };

  const isValidURL = (string) => {
    try {
      const url = new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  };
  console.log(isYourEvent);

  const eventDetails = [
    {
      label:
        eventDetails2[0]?.eventType === "PrivateSession" ? null : (
          <div className="flex flex-col font-bold">
            <img src={address} className="w-16 h-8" />
            Address
          </div>
        ),
      value:
        eventDetails2[0]?.eventType ===
        "PrivateSession" ? null : isYourEvent ? (
          isValidURL(event?.eventAddress) ? (
            <a
              href={event?.eventAddress}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {event?.eventAddress}
            </a>
          ) : (
            event?.eventAddress || "N/A"
          )
        ) : isValidURL(eventDetails2[0]?.eventAddress) ? (
          <a
            href={eventDetails2[0]?.eventAddress}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {eventDetails2[0]?.eventAddress}
          </a>
        ) : (
          eventDetails2[0]?.eventAddress || "N/A"
        ),
    },
    {
      label: (
        <div className="flex flex-col font-bold">
          <img src={location} className="w-16 h-8" />
          Location
        </div>
      ),
      value: isYourEvent
        ? event?.eventLocation
        : eventDetails2[0]?.location || "N/A",
    },
    {
      label: (
        <div className="flex flex-col font-bold items-center">
          <img src={eventType} className="w-16 h-8" />
          Event Type
        </div>
      ),
      value: isYourEvent
        ? event?.eventType
        : eventDetails2[0]?.eventType || "N/A",
    },
    {
      label: (
        <div className="font-bold ">
          <img src={status} className="w-16 h-8" />
          Status
        </div>
      ),
      value: isYourEvent
        ? event?.sessionStatus
        : eventDetails2[0]?.eventStatus || "N/A",
    },
    {
      label:
        eventDetails2[0]?.eventType == "Workshop" ? (
          <div className="flex flex-col font-bold">
            <img src={Capacity} className="w-16 h-8" />
            Capacity
          </div>
        ) : (
          <div className="flex flex-col font-bold items-center">
            <img src={counting} className="w-16 h-8" />
            Session Count
          </div>
        ),
      value: isYourEvent
        ? event?.capacity
        : eventDetails2[0]?.eventType == "Workshop"
        ? eventDetails2[0]?.capacity
        : eventDetails2[0]?.sessionCount || "N/A",
    },
    {
      label: (
        <div className="flex flex-col font-bold items-center">
          <img src={StartDate} className="w-16 h-8" />
          Start Date
        </div>
      ),
      value: isYourEvent ? (
        <>
          <EventDateTime dateTime={event?.startTime} />
        </>
      ) : (
        <EventDateTime dateTime={eventDetails2[0]?.startTime} /> || "N/A"
      ),
    },
    {
      label: (
        <div className="flex flex-col font-bold">
          <img src={EndDate} className="w-16 h-8" />
          End Date
        </div>
      ),
      value: isYourEvent ? (
        <EventDateTime dateTime={event?.endTime} />
      ) : (
        <EventDateTime dateTime={eventDetails2[0]?.endTime} /> || "N/A"
      ),
    },
  ];

  return (
    <main className="antialiased mt-12 mx-8">
      <div className="flex justify-between px-4 w-full">
        <article className="w-full">
          <div className="min-h-screen bg-white">
            <div className="md:p-10 p-0">
              <div className="flex items-center gap-2 mb-5 mt-8">
                <div className="relative group flex items-center">
                  {/* Dynamic Link */}
                  <Link
                    to={!isYourEvent ? "/event-page" : "/my-event-page"}
                    className="flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 120.14 75.05"
                      className="h-6 w-6 text-gray-600 hover:text-gray-800 transition duration-200 ease-in-out"
                    >
                      <path
                        d="M554.58,574.75a7.6,7.6,0,0,1,1.66,1q7.82,7.74,15.55,15.54A7.49,7.49,0,0,1,567.24,604a6.94,6.94,0,0,1-5.94-2q-15.13-15.09-30.21-30.22a7.21,7.21,0,0,1,.06-10.44q15-15.1,30.09-30.09a7.47,7.47,0,0,1,10.6,10.52c-5.11,5.25-10.34,10.39-15.51,15.57-.45.45-.88.92-1.7,1.78H557q41.67,0,83.35,0a12.09,12.09,0,0,1,3.8.47,7.3,7.3,0,0,1,4.82,7.89A7.38,7.38,0,0,1,642,574c-.76,0-1.52,0-2.29,0H555.17Z"
                        transform="translate(-528.89 -529)"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                  Event Details
                </h2>
              </div>

              <div className="rounded-lg mx-auto w-full h-[27rem] overflow-hidden">
                {" "}
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
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div className="mt-4 px-4">
                <h1 className="font-bold text-2xl text-[#0B102F]">
                  {isYourEvent
                    ? event?.title
                    : eventDetails2[0]?.title || "Event Title"}{" "}
                  -{" "}
                  {isYourEvent
                    ? event?.courseName
                    : eventDetails2[0]?.courseName || "Course Name"}
                  <span className="font-normal text-lg text-[#F07E12] ml-2">
                    {" "}
                    By (
                    {isYourEvent
                      ? event?.auther
                      : eventDetails2[0]?.volunteerName}
                    )
                  </span>
                </h1>
                <p className="text-2xl text-[#0B102F] my-8">
                  {isYourEvent
                    ? event?.description
                    : eventDetails2[0]?.eventDescription ||
                      "Description not available."}
                </p>
              </div>

              <div className="w-full p-4">
                <div className="bg-white rounded-[20px] border border-gray-200 overflow-hidden">
                  <div className="grid grid-cols-7 divide-x divide-gray-200">
                    {/* Date row */}
                    {eventDetails?.map((detail, index) => (
                      <div
                        key={`date-${index}`}
                        className="flex flex-col text-center justify-center items-center p-4 space-y-2 border-b border-gray-200"
                      >
                        <span className="font-medium text-gray-900">
                          {detail?.label}
                        </span>
                      </div>
                    ))}
                    {/* Details row */}
                    {eventDetails?.map((detail, index) => (
                      <div
                        key={`details-${index}`}
                        className="flex items-center text-center justify-center p-4"
                      >
                        <div className="text-[#0B102F]">{detail?.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {eventDetails2[0]?.eventType == "PrivateSession" ? (
                <div className="flex justify-start mt-8">
                  {eventSessions?.map((session) => {
                    const joined = hasJoinedSession(session?.sessionID);
                    return (
                      <div
                        key={session?.sessionID}
                        className={`mx-3 mt-4 relative flex w-[23rem] max-w-[26rem] flex-col
           bg-white bg-clip-borde shadow-lg transition duration-300 ease-in-out`}
                      >
                        <div className="p-6 border-2 border-blue-900 rounded-xl">
                          <div className="mb-3 flex items-center justify-center ">
                            <h5 className="block text-xl font-medium leading-snug tracking-normal antialiased">
                              {session?.eventTitle} - {session?.courseName}
                            </h5>
                          </div>
                          <p className="block text-base leading-relaxed antialiased">
                            {session?.eventDetails}
                          </p>
                          {isYourEvent ? (
                            <p className="block font-bold mt-4 text-base leading-relaxed antialiased">
                              Session Link:{" "}
                              {isYourEvent &&
                              isValidURL(session?.eventAddress) ? (
                                <a
                                  href={session?.eventAddress}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 underline"
                                >
                                  {session?.eventAddress}
                                </a>
                              ) : (
                                <span>The session link will be sent later</span>
                              )}
                            </p>
                          ) : null}

                          <p className="block font-bold mt-4 text-base leading-relaxed antialiased">
                            capacity: {session?.capacity}
                          </p>
                          {joined ? (
                            <p className="block font-bold mt-4 text-green-600">
                              You have joined this session
                            </p>
                          ) : (
                            <button
                              onClick={() =>
                                handleJoinSession(session.sessionID)
                              }
                              className="mt-12 block w-full select-none rounded-lg bg-[#171E4B] py-3.5 px-7 text-center align-middle
                            text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:bg-[#293aaa]
                            focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                              Join
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </article>
      </div>
      {isYourEvent ? (
        <div className="flex justify-start ml-16 flex-col">
          <h1 className="font-bold text-2xl ml-4">Event Content</h1>
          {selectedEvent?.map((file) => (
            <div
              key={file?.contentID}
              className={`mx-3 mt-4 relative flex w-[23rem] max-w-[26rem] flex-col
           bg-white bg-clip-borde shadow-lg transition duration-300 ease-in-out`}
            >
              <div className="p-6 border-2 border-blue-900 rounded-xl">
                <div className="mb-3 flex items-center justify-center ">
                  <h5 className="block text-xl font-medium leading-snug tracking-normal antialiased">
                    {file?.contentName}
                  </h5>
                </div>
                <p className="block text-base leading-relaxed antialiased">
                  {file?.contentAddress}
                </p>
                <p className="block font-bold my-4 text-base leading-relaxed antialiased">
                  {file?.contentType}
                </p>
                <a
                  target="_blank"
                  href={`${
                    import.meta.env.VITE_URL_BACKEND
                  }/api/Student/download/${eventId}`}
                  // onClick={() => handleDownload(file?.eventID)}
                  className="w-full flex items-center justify-center gap-6 bg-blue-500 hover:bg-blue-700
                   text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  <img src={download} alt="Download Icon" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      <div className="flex justify-end my-12 mr-20">
        {isYourEvent ? (
          <button
            onClick={() => handleDeleteEvent(event?.bookingId)}
            className="flex justify-center items-center text-red-600 font-bold border border-red-600 w-48 rounded-lg py-2 hover:bg-red-600 hover:text-white"
          >
            <img src={trsh} alt="Trash Icon" />
            <p>Delete Event</p>
          </button>
        ) : eventDetails2[0]?.eventType === "Workshop" ? (
          <button
            onClick={handleJoinNow}
            className="bg-[#0B102F] font-bold text-white p-2 w-48 rounded-lg"
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
