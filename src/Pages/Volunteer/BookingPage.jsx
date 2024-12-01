import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../Redux/Slices/VolunteerSlice";
import Loading from "../../Components/Loading";
import ServerError from "../../Components/Error/ServerError";
import NoData from "../../Components/Error/NoData";
import axios from "axios";
import { FaMapMarkerAlt, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";

function BookingPage() {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.volunteer);

  const [generatingUrl, setGeneratingUrl] = useState(null);
  const [activeTab, setActiveTab] = useState("Event");

  useEffect(() => {
    dispatch(fetchBookings(3)); 
  }, [dispatch]);

  const handleGenerateUrl = async (type, id) => {
    try {
      setGeneratingUrl(id);
      let url = "";
      if (type === "Event") {
        const response = await axios.post(
          `http://localhost:5085/api/Volunteer/generate-event-url/${id}`,null,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
          
        );
      
        url = response.data;

      
        url = response.data;
      } else if (type === "Session") {
        const response = await axios.post(
          `http://localhost:5085/api/Volunteer/generate-session-url/${id}`,null,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      }
      alert(`Generated URL: ${url}`);
    } catch (error) {
      console.error("Failed to generate URL", error);
      alert("Failed to generate URL");
    } finally {
      setGeneratingUrl(null);
    }
  };

  if (loading) return <Loading />;

  const eventBookings = bookings?.filter((booking) => booking?.bookingType === "Event");
  const sessionBookings = bookings?.filter((booking) => booking?.bookingType === "Session");

  const statusColors = {
    Pending: "bg-yellow-200 text-yellow-800",
    Confirmed: "bg-blue-200 text-blue-800",
    Completed: "bg-green-200 text-green-800",
    Canceled: "bg-red-200 text-red-800",
  };

  return (
    <div className="my-36 px-6 max-w-6xl mx-auto ">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Bookings</h1>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-6 py-2 text-lg font-semibold ${
            activeTab === "Event" ? "border-b-4 border-blue-600 text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Event")}
        >
          Event Bookings
        </button>
        <button
          className={`px-6 py-2 text-lg font-semibold ${
            activeTab === "Session" ? "border-b-4 border-blue-600 text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Session")}
        >
          Session Bookings
        </button>
      </div>
      {bookings ? 
      <div>
        {(activeTab === "Event" ? eventBookings : sessionBookings)?.map((booking) => (
          <div
            key={booking?.bookingID}
            className="relative p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
          >
            {/* Status Badge */}
            <span
              className={`absolute top-2 right-2 px-3 py-1 text-sm font-medium rounded-full ${statusColors[booking?.bookingStatus]}`}
            >
              {booking?.bookingStatus}
            </span>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{booking?.eventTitle}</h3>

            {/* Info Section */}
            <div className="flex flex-col space-y-2 text-gray-600">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                <span>{booking?.location}</span>
              </div>
              <div className="flex items-center">
                <FaRegCalendarAlt className="mr-2 text-green-500" />
                <span>Start: {new Date(booking?.startDate).toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <FaRegClock className="mr-2 text-yellow-500" />
                <span>End: {new Date(booking?.endDate).toLocaleString()}</span>
              </div>
            </div>

            {/* Generate Link Button */}
            {booking?.location === "Online" &&
              (booking?.bookingStatus === "Pending" || booking?.bookingStatus === "Confirmed") && (
                <button
                  className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  onClick={() =>
                    handleGenerateUrl(activeTab === "Event" ? "Event" : "Session",activeTab === "Event" ?  booking?.eventID:  booking?.sessionID)
                  }
                  disabled={generatingUrl === booking?.bookingID}
                >
                  {generatingUrl === booking?.bookingID ? "Generating..." : "Generate Link"}
                </button>
              )}
          </div>
        ))}

      </div>
: <NoData message="No bookings available" />}
    </div>
  );
}

export default BookingPage;
