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
    <div className=" mx-8 my-24">
      <div className="w-8 h-8">
        <Link to={"/student-page"}>
          <img src={arrow_left} alt="Back" />
        </Link>
      </div>
      <div className="flex flex-wrap justify-start gap-8">
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
            image={event?.eventFile}
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
