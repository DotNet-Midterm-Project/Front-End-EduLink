import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllbookings } from "../../Redux/Slices/bookingEventSlice"; 
import Loading from "../../Components/Loading";
import NoData from "../../Components/Error/NoData";
import Card from "../../Components/Card";
import Breadcrumb from "../../Components/Breadcrumb";

function YourEvent() {
  const dispatch = useDispatch();

  // Select state from Redux
  const { allbookings, loading, error } = useSelector(
    (state) => state.bookingEvent || []
  );

  useEffect(() => {
    dispatch(fetchAllbookings());
  }, [dispatch]);

  if (loading) return <Loading />;
//   if (error) return <ServerError message={error} />;
  if (!allbookings) return <NoData message="No workshops found for this course." />;
  
  console.log(allbookings);
  
  return (
    <>
    <div className="mt-40">

    <Breadcrumb/> 
    </div>
      <div className="flex flex-wrap justify-start gap-8 mx-8 mb-32 mt-20">
        {allbookings?.length === null || error ? (
          <NoData message="No workshops found for this course." />
        ) : (
        allbookings?.map((event) => (
          <Card
            key={event?.bookingId}
            id={event?.eventID}
            bookingId={event?.bookingId}
            eventId={event?.eventID}
            courseID={event?.courseID}
            volunteerID={event?.volunteerID}
            title={event?.eventTitle}
            auther={event?.volunteerName}
            description={event?.eventDescription}
            courseName={event?.courseName}
            startTime={event?.startTime}
            endTime={event?.endTime}
            image={event?.bannerImage}
            capacity={event?.capacity}
            eventAddress={event?.eventAddress}
            eventLocation={event?.eventLocation}
            sessionStatus={event?.sessionStatus}
            eventType={event?.eventType}
            eventContentFiles={event?.eventContentFiles}
            location="YourEvent"
          />
       ) ))}
      </div>
    </>
  );
}

export default YourEvent;
