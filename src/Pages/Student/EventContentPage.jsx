import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  fetchEventContent,
  clearSelectedEvent, fetchEventsByVolunteerAndCourse
} from "../../Redux/Slices/bookingEventSlice";
import Loading from "../../Components/Loading";
import ServerError from "../../Components/Error/ServerError";
import { arrow_left, imagesecation } from "../../assets";

function EventContentPage() {
  const { eventId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  // const { selectedEvent, loading, error } = useSelector(
  //   (state) => state.bookingEvent
  // );
  const { eventContent, loading, error } = useSelector(
    (state) => state.bookingEvent
  );

  const event = location?.state;
  console.log("The event ",event);
  

  useEffect(() => {
    // dispatch(fetchEventContent(eventId));
    dispatch(fetchEventsByVolunteerAndCourse({ 
      volunteerID: event?.volunteerID, 
      courseID: event?.courseID 
    }));
    

    // return () => {
    //   dispatch(clearSelectedEvent());
    // };
  }, [dispatch, eventId]);

  if (loading) return <Loading />;
  if (error) return <ServerError message={error} />;

  // console.log("This is from event content page", selectedEvent);
  return (
    <div className="mx-8">
      <main className="antialiased mt-12">
        <div className="flex justify-between px-4 w-full">
          <article className="w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <div className="w-8 h-8">
              <Link to={"/event-page"}>
                <img src={arrow_left} />
              </Link>
            </div>

            <div className="rounded-gl mx-auto w-full h-[27rem] opacity-90">
              <img
                src={imagesecation}
                className="block w-full h-full object-cover"
                style={{ borderRadius: "0px 20px 20px 20px" }}
              />
            </div>

            <h1 className="font-bold mt-4 text-[#0B102F]">
              {/* {props?.title} */}
            </h1>
            <div className="">
              {/* <p className="lead mt-4">{props?.articleContent}</p> */}
            </div>
            <section className="not-format mt-12"></section>
          </article>
        </div>

        <div class="relative flex flex-col w-80 text-center h-full shadow-md border-2 border-black rounded-xl">
          <table class="w-full table-auto min-w-max">
            <tbody>
              <tr class="even:bg-blue-gray-50/50">
                <td class="p-4 border-r border-black text-center align-middle">
                  <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    John Michael
                  </p>
                </td>
                <td class="p-4 text-center align-middle">
                  <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    Manager
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default EventContentPage;
