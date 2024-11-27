import { Link } from "react-router-dom";
import { formatDate, splitDescription } from "../../utils/dateUtils";
import { useState } from "react";

function ImageShow(props) {
  const [showModal, setShowModal] = useState(false);
const toke = localStorage.getItem("token");
  const handleImageClick = (e) => {
    if (!toke) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  return (
    <>
      <div
        id={props?.id}
        key={props?.id}
        className="relative"
        data-te-carousel-init
        data-te-ride="carousel"
      >
        <div className="relative rounded-gl mx-auto w-full md:w-[72rem] h-60 md:h-96 opacity-90">
          <Link to={`/articles/${props?.id}`} onClick={handleImageClick}>
            <img
              src={`${import.meta.env.VITE_URL_BACKEND}/Resources/${
                props?.image
              }`}
              className="block w-full h-full object-cover"
              style={{ borderRadius: "0px 20px 20px 20px" }}
              alt={props?.title || "Image"}
            />
          </Link>

          <div className="absolute bottom-2 md:bottom-5 p-2 md:p-5 text-left text-white rounded-lg">
            {/* Author and Date */}
            <p className="flex items-center text-sm md:text-base">
              {props?.auther}
              <span className="flex items-center text-xs md:text-sm font-medium text-gray-200 ms-2">
                <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
                {formatDate(props?.date)}
              </span>
            </p>

            {/* Title */}
            <h5 className="text-lg md:text-2xl font-bold mt-1">
              {props?.title}
            </h5>

            {/* Description with reduced characters for mobile */}
            <p className="text-xs md:text-sm mt-1">
              {splitDescription(
                props?.description,
                window.innerWidth < 768 ? 5 : 10
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="w-[35rem] rounded-lg bg-[#EFEFEF] p-8 shadow-lg"
            style={{ borderColor: "#6B6868", borderWidth: "2px" }}
          >
            <h2 className="mb-6 text-2xl font-bold text-[#0D47A1]">
              Access Restricted
            </h2>
            <p className="mb-8 text-lg text-[#6B6868]">
              To read this article, you need to be logged in or create an
              account.
            </p>
            <div className="flex justify-end gap-6">
              <button
                className="rounded-lg bg-[#6B6868] px-6 py-3 text-white hover:bg-opacity-80"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <Link
                to="/register"
                className="rounded-lg bg-[#F28E33] px-6 py-3 text-white hover:bg-opacity-80"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ImageShow;
