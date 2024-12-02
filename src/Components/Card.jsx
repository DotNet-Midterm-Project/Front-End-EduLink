import { Link } from "react-router-dom";
import { formatDate, splitDescription } from "../utils/dateUtils";
import { useState, useEffect } from "react";

function Card(props) {
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const [imageSrc, setImageSrc] = useState("");

  const linkPath =
  props?.location == "event" || props?.location =="YourEvent"
    ? `/event-content/${props?.eventId}`
    : `/articles/${props?.id}`;

  const handleReadMoreClick = (e) => {
    if (!token) {
      e.preventDefault();
      setShowModal(true);
    }
  };
  // console.log(imageSrc);
  
    useEffect(() => {
      if (props?.image) {
        fetch(`${import.meta.env.VITE_URL_BACKEND}/Resources/${props?.image}`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          }
        })
        .then(response => response.blob())
        .then(blob => {
          const imgURL = URL.createObjectURL(blob);
          setImageSrc(imgURL);
        })
        .catch(error => console.error("Error loading image:", error));
        
      }
    }, [props?.image]);


  return (
    <>
      <div
        className={`mx-3 mt-4 relative flex w-[23rem] max-w-[26rem] flex-col bg-[#EFEFEF] bg-clip-border text-gray-700 shadow-lg transition duration-300 ease-in-out ${
          props?.location == "event" ? "hover:bg-white" : "hover:bg-gray-300"
        }`}
        style={{
          borderRadius: "20px",
          borderTopLeftRadius: "0px",
        }}
      >
        {props?.location == "event" || props?.location == "YourEvent" || props?.location == "ArticlesList" ? (
          <Link
            to={linkPath}
            state={{ ...props }}
            onClick={handleReadMoreClick}
          >
            <div className="relative overflow-hidden hover:sky-500">
              <img
                src={
                  imageSrc
                    ? `${import.meta.env.VITE_URL_BACKEND}/Resources/${
                        props?.image
                      }`
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Microsoft_.NET_logo.svg/640px-Microsoft_.NET_logo.svg.png"
                }
                alt={props?.title}
                style={{
                  borderRadius: "0px 20px 0px 0px",
                }}
                className="h-56 w-full object-cover transition-opacity duration-500 hover:sky-500"
              />
            </div>
            <div className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="block font-sans text-base font-light leading-relaxed text-[#0B102F] antialiased">
                  {props?.auther}. {formatDate(props?.date)}
                </p>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-[#0B102F] antialiased">
                  {props?.title}
                </h5>
              </div>
              <p className="block font-sans text-base font-light leading-relaxed text-[#0B102F] antialiased">
                {splitDescription(props?.description, 20)}
              </p>
            </div>
          </Link>
        ) : null}
      </div>

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

export default Card;