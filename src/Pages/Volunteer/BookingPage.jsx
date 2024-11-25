import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../Redux/Slices/VolunteerSlice";
import Loading from "../../Components/Loading";
import ServerError from "../../Components/Error/ServerError";
import NoData from "../../Components/Error/NoData";

function BookingPage() {
    const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.volunteer);

  useEffect(() => {
    dispatch(fetchBookings(3));
  }, [dispatch]);

if (loading) return <Loading />;
if (error) return <ServerError />;
  
  
  return (
    <div className="my-24">
      <h1>BookingPage</h1>
      
    </div>
  );
}   

export default BookingPage;