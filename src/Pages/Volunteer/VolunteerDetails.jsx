import React, { useEffect } from "react";
import ImageShow from "../../Components/Student/ImageShow";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchAllVolunteerCourses,
} from "../../Redux/Slices/VolunteerSlice";
import CourseCard from "../../Components/Student/CourseCard";
import NoData from "../../Components/Error/NoData";
import Loading from "../../Components/Loading";
import ServerError from "../../Components/Error/ServerError";

function VolunteerDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve logged-in user's data from localStorage
  const loggedInEmail = localStorage.getItem("email");
  
  const { courses, loading, error } = useSelector((state) => state.volunteer);

  const location = useLocation();
  const volunteer = location?.state?.volunteer;

  useEffect(() => {
    if (volunteer?.volunteerID) {
      dispatch(FetchAllVolunteerCourses(volunteer.volunteerID));
    }
  }, [dispatch, volunteer?.volunteerID]);

  if (!volunteer) {
    return (
      <div className="mt-10 text-center">
        <p className="text-gray-600 text-lg">
          Volunteer data is not available.
        </p>
        <p className="text-blue-500 underline">
          Please navigate back and try again.
        </p>
      </div>
    );
  }

  // Check if the logged-in user is viewing their own profile
  const isOwnProfile = volunteer?.email === loggedInEmail;

  return (
    <div className="container mx-auto p-4">
      <ImageShow
        image={volunteer.profile || "/default-profile.jpg"} // Fallback image
        user={volunteer.volunteerName || "Unknown Volunteer"}
        email={volunteer.email || "Email not provided"}
      />

      {/* About and Skills Sections */}
      <div className="mt-12 mx-auto p-4 space-y-4">
        <div className="bg-gray-200 shadow rounded-lg overflow-hidden">
          <div className="px-4 py-2 sm:px-6">
            <h2 className="text-lg font-semibold text-gray-900">About</h2>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <p className="text-sm text-gray-800">
              {volunteer.about ||
                "No additional information available about this volunteer."}
            </p>
          </div>
        </div>

        <div className="bg-gray-200 shadow rounded-lg overflow-hidden">
          <div className="px-4 py-2 sm:px-6">
            <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
          </div>
          <div className="px-4 py-5 sm:p-6 bg-gray-200">
            <ul className="space-y-2">
              {volunteer.courses.map((course, index) => (
                <li
                  key={index}
                  className="text-sm flex items-center gap-2 text-gray-800"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  {course}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Courses Section */}
        <div className="Courses">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Courses</h2>
          {loading ? (
            <Loading />
          ) : error ? (
            <ServerError error={error} />
          ) : courses?.length > 0 ? (
            courses.map((course) => (
              <CourseCard
                key={course?.courseId || Math.random()}
                id={course?.courseID}
                name={course?.courseName || "Unnamed Course"}
                count={course?.volunteerCount}
                description={
                  course?.courseDescription || "No description available."
                }
              />
            ))
          ) : (
            <NoData />
          )}
        </div>

        {/* Add Event Button */}
        {isOwnProfile && (
          <div className="mt-6 text-right">
            <button
              onClick={() => navigate("/add-event")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VolunteerDetails;
