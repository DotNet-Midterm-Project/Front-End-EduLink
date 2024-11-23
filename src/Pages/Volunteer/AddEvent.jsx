import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from '../../Redux/Slices/bookingEventSlice';
import { FetchAllVolunteerCourses } from '../../Redux/Slices/VolunteerSlice';
import Loading from '../../Components/Loading';

export default function AddEvent() {
  const dispatch = useDispatch();
  const [eventTitle, setEventTitle] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [capacity, setCapacity] = useState('');
  const [sessionCount, setSessionCount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const { courses, loading, error } = useSelector((state) => state.volunteer);

  useEffect(() => {
    dispatch(FetchAllVolunteerCourses(1)); // Volunteer ID is set to 1 as an example
  }, [dispatch]);

  const validateForm = () => {
    if (!eventTitle || !selectedLocation || !selectedType || !eventDescription || !capacity || !startDate || !endDate) {
      alert('Please fill in all required fields.');
      return false;
    }
    if (!selectedCourseId) {
      alert('Please select a course.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const selectedCourse = courses.find((course) => course.courseID === parseInt(selectedCourseId));
      const courseName = selectedCourse ? selectedCourse.courseName : '';

      const eventData = new FormData();
      eventData.append('title', eventTitle);
      eventData.append('location', selectedLocation);
      eventData.append('eventType', selectedType);
      eventData.append('eventDescription', eventDescription);
      eventData.append('eventDetails', eventDetails || '');
      eventData.append('bannerImage', bannerImage || '');
      eventData.append('capacity', capacity);
      eventData.append('sessionCount', sessionCount || '');
      eventData.append('startDate', startDate);
      eventData.append('endDate', endDate);
      eventData.append('courseId', selectedCourseId);
      eventData.append('courseName', courseName);

      dispatch(addEvent(eventData));
    }
  };

  return (
    <div className="container max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add an Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <label className="w-1/3 font-medium">Event Title:</label>
          <input
            type="text"
            className="w-2/3 p-2 border rounded"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 font-medium">Event Type:</label>
          <select
            className="w-2/3 p-2 border rounded"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            required
          >
            <option value="">Select Event Type</option>
            <option value="Workshop">Workshop</option>
            <option value="PrivateSession">Private Session</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="w-1/3 font-medium">Location:</label>
          <select
            className="w-2/3 p-2 border rounded"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            required
          >
            <option value="">Select Location</option>
            <option value="Online">Online</option>
            <option value="OnSite">On-Site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="w-1/3 font-medium">Select Course:</label>
          <select
            className="w-2/3 p-2 border rounded"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            required
          >
            <option value="">Select Course</option>
            {loading ? (
              <Loading />
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
          <label className="w-1/3 font-medium">Event Description:</label>
          <textarea
            className="w-2/3 p-2 border rounded"
            rows={3}
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex items-center">
          <label className="w-1/3 font-medium">Event Details:</label>
          <textarea
            className="w-2/3 p-2 border rounded"
            rows={3}
            value={eventDetails}
            onChange={(e) => setEventDetails(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center">
          <label className="w-1/3 font-medium">Capacity:</label>
          <input
            type="number"
            className="w-2/3 p-2 border rounded"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>
        {selectedType === 'PrivateSession' && (
          <div className="flex items-center">
            <label className="w-1/3 font-medium">Session Count:</label>
            <input
              type="number"
              className="w-2/3 p-2 border rounded"
              value={sessionCount}
              onChange={(e) => setSessionCount(e.target.value)}
            />
          </div>
        )}
        <div className="flex items-center">
          <label className="w-1/3 font-medium">Start Date:</label>
          <input
            type="date"
            className="w-2/3 p-2 border rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 font-medium">End Date:</label>
          <input
            type="date"
            className="w-2/3 p-2 border rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 font-medium">Banner Image:</label>
          <input
            type="file"
            className="w-2/3 p-2 border rounded"
            onChange={(e) => setBannerImage(e.target.files[0])}
          />
        </div>
        <div className="text-right">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
}
