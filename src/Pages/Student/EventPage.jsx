import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEvent } from "../../Redux/Slices/bookingEventSlice";
import Loading from "../../Components/Loading";
import ServerError from "../../Components/Error/ServerError";
import Card from "../../Components/Card";
import Search from "../../Components/Search";
import NoData from "../../Components/Error/NoData";
import Breadcrumb from "../../Components/Breadcrumb";

function EventPage() {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.bookingEvent);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllEvent());
  }, [dispatch]);

  const filteredEvents = events?.filter((event) =>
    event?.workshopName?.toLowerCase().includes(searchTerm?.toLowerCase())
  );
console.log(filteredEvents);

  if (loading) return <Loading />;
  if (error) return <ServerError />;

  return (
    <>
      <div className="mt-28 mx-8">
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search for event..."
        />
       <Breadcrumb/> 
      </div>

      <div className="my-16 mx-8 flex flex-wrap justify-start gap-4 m-auto">
        {filteredEvents?.length > 0 ? (
          filteredEvents?.map((event) => (
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
          ))
        ) : (
          <NoData location="event" />
        )}
      </div>
    </>
  );
}

export default EventPage;
