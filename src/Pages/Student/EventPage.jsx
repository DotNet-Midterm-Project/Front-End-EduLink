import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEvent } from "../../Redux/Slices/bookingEventSlice";
import Loading from "../../Components/Loading";
import ServerError from "../../Components/Error/ServerError";
import Card from "../../Components/Card";

function EventPage() {
      const dispatch = useDispatch();
    const { events, loading, error } = useSelector((state) => state.bookingEvent);

    useEffect(() => {
      dispatch(fetchAllEvent());
    }, [dispatch]);

console.log(events);
if(loading) return <Loading/>
if(error) return <ServerError/>
  return (
    <div className="my-24">
      <h1>EventPage</h1>

      <>
      {events?.map((event) => {
      return (
        <Card
          key={event?.volunteerID}
          id={event?.volunteerID}
          title={event?.workshopName}
          auther={event?.volunteerName}
          description={event?.workshopDescription }
          date={event?.workshopDateTime}
          image={event?.eventFile}
          location="event"
        />
      );
    })}
       
      </>
    </div>
  );
}

export default EventPage;
