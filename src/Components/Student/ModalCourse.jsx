import { useDispatch } from "react-redux";
import { fetchAllEvent } from "../../Redux/Slices/bookingEventSlice"; // Adjust path if needed
import { useNavigate } from "react-router-dom";
import { close } from "../../assets"; // Ensure the close icon is properly imported

function ModalCourse({ props, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
console.log(props);

  const handleSeeMore = () => {
    dispatch(fetchAllEvent(props?.id))
      .unwrap()
      .then(() => {
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
      <div className="relative w-full max-w-lg bg-[#EFEFEF] rounded-xl shadow-lg overflow-hidden">
        {/* Modal Header */}
        <div className="relative flex items-center justify-center p-5 bg-[#F28E33]">
          <h3 className="text-xl font-bold text-white">
            { "Course Details"}
          </h3>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200"
            aria-label="Close Modal"
          >
            <img src={close} alt="Close" className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <p className="text-[18px] text-sm text-[#0B102F] leading-relaxed">
            {props?.description || "No description available."}
          </p>
          <p className="text-sm text-[#0B102F] font-semibold">
            Volunteers: {props?.count ?? 0}
          </p>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-4 px-6 py-4 border-t border-gray-300">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#6B6868] text-white hover:bg-opacity-80 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSeeMore}
            className="px-5 py-2 rounded-lg bg-[#F07E12] text-white hover:bg-opacity-90 transition duration-200 shadow-sm"
          >
            Explore Events
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCourse;
