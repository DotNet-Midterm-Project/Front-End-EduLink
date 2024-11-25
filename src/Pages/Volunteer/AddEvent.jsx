import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../../Redux/Slices/bookingEventSlice";
import { FetchAllVolunteerCourses } from "../../Redux/Slices/VolunteerSlice";
import Loading from "../../Components/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../../Components/Breadcrumb";

export default function AddEvent() {
  const dispatch = useDispatch();
  const [eventTitle, setEventTitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [capacity, setCapacity] = useState("");
  const [sessionCount, setSessionCount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const { courses, loading, error } = useSelector((state) => state.volunteer);

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
      dispatch(FetchAllVolunteerCourses(volunteerID));
    }
  }, [dispatch, volunteerID]);

  const validateForm = () => {
    if (!eventTitle.trim()) {
      toast.error("Event title is required.");
      return false;
    }
    if (!selectedLocation) {
      toast.error("Event location is required.");
      return false;
    }
    if (!selectedType) {
      toast.error("Event type is required.");
      return false;
    }
    if (!eventDescription.trim()) {
      toast.error("Event description is required.");
      return false;
    }
    if (!startDate || !endDate || new Date(startDate) > new Date(endDate)) {
      toast.error("Invalid start or end date.");
      return false;
    }
    if (selectedLocation !== "0" && !eventAddress.trim()) {
      toast.error("Event address is required for onsite or hybrid events.");
      return false;
    }
    if (!selectedCourseId) {
      toast.error("Please select a course.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const eventData = new FormData();

      eventData.append("EventDescription", eventDescription);
      eventData.append("Details", eventDetails || "");
      eventData.append("EndTime", endDate || new Date().toISOString());
      eventData.append("StartTime", startDate || new Date().toISOString());
      eventData.append("EventType", parseInt(selectedType, 10));
      if (bannerImage) {
        eventData.append("EventBannerImage", bannerImage);
      }
      eventData.append("Location", parseInt(selectedLocation, 10));
      eventData.append("CourseID", parseInt(selectedCourseId, 10));
      eventData.append("Title", eventTitle.trim());
      eventData.append("EventAddress", eventAddress.trim());
      eventData.append("Capacity", parseInt(capacity, 10) || 0);
      eventData.append("SessionCounts", parseInt(sessionCount, 10) || 0);

      dispatch(addEvent(eventData))
        .then(() => {
          toast.success("Event added successfully!");

          // Clear fields
          setEventTitle("");
          setSelectedLocation("");
          setSelectedType("");
          setEventDescription("");
          setEventDetails("");
          setBannerImage(null);
          setCapacity("");
          setSessionCount("");
          setStartDate("");
          setEndDate("");
          setEventAddress("");
          setSelectedCourseId(null);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to add event. Please try again.");
        });
    }
  };

  return (
    <div className="mt-36">
      <Breadcrumb />
      <div className="container max-w-5xl mx-auto p-6 mt-8 mb-24 bg-[#F9F9F9] rounded-lg shadow-md">
        <ToastContainer />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center">
            <label className="w-40 font-medium">Event Title:</label>
            <input
            placeholder="Event Title"
              type="text"
              className="w-2/3 p-2 border rounded"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-40 font-medium">Event Type:</label>
            <select
              className="w-2/3 p-2 border rounded"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              required
            >
              <option value="">Select Event Type</option>
              <option value="0">General Event</option>
              <option value="1">Private Session</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-40 font-medium">Location:</label>
            <select
              className="w-2/3 p-2 border rounded"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              required
            >
              <option value="">Select Location</option>
              <option value="0">Online</option>
              <option value="1">On-Site</option>
              <option value="2">Hybrid</option>
            </select>
          </div>
          {selectedLocation !== "0" && (
            <div className="flex items-center">
              <label className="w-40 font-medium">Event Address:</label>
              <input
              placeholder="Event Address"
                type="text"
                className="w-2/3 p-2 border rounded"
                value={eventAddress}
                onChange={(e) => setEventAddress(e.target.value)}
                required
              />
            </div>
          )}
          <div className="flex items-center">
            <label className="w-40 font-medium">Select Course:</label>
            <select
              className="w-2/3 p-2 border rounded"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              required
            >
              <option value="">Select Course</option>
              {loading ? (
                <option>Loading...</option>
              ) : error ? (
                <option>{error}</option>
              ) : (
                courses.map((course) => (
                  <option key={course.courseID} value={course.courseID}>
                    {course.courseName}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-40 font-medium">Event Description:</label>
            <textarea
            placeholder="Event Description"
              className="w-2/3 p-2 border rounded"
              rows={3}
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex items-center">
            <label className="w-40 font-medium">Event Details:</label>
            <textarea
            placeholder="Event Details"
              className="w-2/3 p-2 border rounded"
              rows={3}
              value={eventDetails}
              onChange={(e) => setEventDetails(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center">
            <label className="w-40 font-medium">Capacity:</label>
            <input
            placeholder="Capacity"
              type="number"
              className="w-2/3 p-2 border rounded"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
          {selectedType === "1" && (
            <div className="flex items-center">
              <label className="w-40 font-medium">Session Count:</label>
              <input
                type="number"
                className="w-2/3 p-2 border rounded"
                value={sessionCount}
                onChange={(e) => setSessionCount(e.target.value)}
              />
            </div>
          )}
          <div className="flex items-center">
            <label className="w-40 font-medium">Start Date & Time:</label>
            <input
              type="datetime-local"
              className="w-2/3 p-2 border rounded"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-40 font-medium">End Date & Time:</label>
            <input
              type="datetime-local"
              className="w-2/3 p-2 border rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-40 font-medium">Banner Image:</label>
            <label
              htmlFor="uploadFile1"
              className="bg-white w-full p-2 text-gray-500 font-semibold text-base rounded max-w-md h-50
               flex flex-col items-center justify-center cursor-pointer border-2 border-gray-400 border-dashed font-[sans-serif]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-11 mb-2 fill-gray-500"
                viewBox="0 0 32 32"
              >
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000"
                />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000"
                />
              </svg>
              Upload image
              <input
               type="file"
               id="uploadFile1" 
               className="hidden w-40 p-2 border rounded"
               onChange={(e) => setBannerImage(e.target.files[0])}
               />
              <p className="text-xs font-medium text-gray-400 mt-2">
                PNG, JPG, JPEG are Allowed.
              </p>
            </label>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-[#F28E33] text-white rounded hover:bg-[#f28f33eb]"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
