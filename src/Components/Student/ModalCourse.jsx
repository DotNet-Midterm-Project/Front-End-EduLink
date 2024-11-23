import { useEffect } from "react";
import { close } from "../../assets";
import { useDispatch } from "react-redux";
import { fetchAllEvent } from "../../Redux/Slices/bookingEventSlice"; // Adjust path if needed
import { useNavigate } from "react-router-dom";

function ModalCourse({ props, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
console.log(props);

  const handleViewVolunteer = () => {
    // Dispatch the action to fetch volunteers
    dispatch(fetchAllEvent(props?.id))
      .unwrap()
      .then(() => {
        // Navigate to the volunteers page
        navigate(`/event-by-course/${props?.id}`);
      })
      .catch((error) => {
        console.error("Error fetching volunteers:", error);
      });
  };

  return (
    <div
      id="default-modal"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-2xl max-h-full bg-[#0D47A1] rounded-lg shadow-md">
        <div className="relative rounded-lg">
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-white">
            <h3 className="text-xl font-semibold text-white">{props?.name}</h3>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <img src={close} />
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-white">
              {props?.description}
            </p>
            <p className="text-base leading-relaxed text-white">
              Volunteers: {props?.count}
            </p>
          </div>
          <div className="flex items-center justify-end p-4 md:p-5 border-t border-white">
            <button
              onClick={onClose}
              type="button"
              className="py-2.5 px-5 ms-3 mr-4 text-sm font-medium text-white bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleViewVolunteer}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              View Volunteers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCourse;
