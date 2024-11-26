import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllEvent } from "../../Redux/Slices/bookingEventSlice"; // Adjust import path as needed
import Card from "../../Components/Card"; // Assuming `Card` is the correct component name
import Loading from "../Loading";
import ServerError from "../Error/ServerError";
import NoData from "../Error/NoData";
import { arrow_left } from "../../assets";

function ShowEventByCourse() {
  const { courseId } = useParams(); // Get the courseId from URL params
  const dispatch = useDispatch();

  // Select state from Redux
  const { events, loading, error } = useSelector(
    (state) => state.bookingEvent || []
  );

  useEffect(() => {
    if (courseId) {
      dispatch(fetchAllEvent(courseId)); // Dispatch the thunk with courseId
    }
  }, [courseId, dispatch]);

  if (loading) return <Loading />;
  if (error) return <ServerError message={error} />;
  if (!events) return <NoData message="No workshops found for this course." />;
  // console.log("this is the show events", events);

  return (
    <div className=" mx-8 my-36">
      <div className="flex items-center gap-2 mb-5">
        <div className="relative group flex items-center">
          <Link
            to={"/student-page"}
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
          Event By Course
        </h2>
      </div>
      <div className="flex flex-wrap justify-start gap-4 m-auto">
        {events?.map((event) => (
          <Card
            key={event?.eventID}
            id={event?.eventID}
            eventId={event?.eventID}
            courseID={event?.courseID}
            volunteerID={event?.volunteerID}
            title={event?.workshopName}
            auther={event?.volunteerName}
            description={event?.workshopDescription}
            date={event?.workshopDateTime}
            image={event?.eventBannerImage}
            capacity={event?.capacity}
            sessionLink={event?.sessionLink}
            location="event"
          />
        ))}
      </div>
    </div>
  );
}

export default ShowEventByCourse;
