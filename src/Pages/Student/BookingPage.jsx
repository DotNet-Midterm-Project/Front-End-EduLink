import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllBooking } from "../../Redux/Slices/bookingEventSlice";
import Loading from "../../Components/Loading";
import ServerError from "../../Components/Error/ServerError";
import NoData from "../../Components/Error/NoData";

function BookingPage() {
    // const dispatch = useDispatch();
  // const { booking, loading, error } = useSelector((state) => state.booking);

  // useEffect(() => {
  //   dispatch(fetchAllBooking());
  // }, [dispatch]);


  
  
  return (
    <div className="my-24">
      <h1>BookingPage</h1>
      
    </div>
  );
}   

export default BookingPage;