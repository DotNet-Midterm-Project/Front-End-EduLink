import { Link } from "react-router-dom";
import { formatDate, splitDescription } from "../utils/dateUtils";
import { useState } from "react";

function Card(props) {
  const [showModal, setShowModal] = useState(false);

  const handleReadMoreClick = (e) => {
    if (!props.isAuthenticated) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  const linkPath =
    props.location === "event"
      ? `/event-content/${props?.eventId}`
      : `/articles/${props?.id}`;
  console.log("this is the card", props);

  return (
    <>
      <div
        className={`mx-3 mt-4 relative flex w-[23rem] max-w-[26rem] flex-col bg-[#EFEFEF] bg-clip-border text-gray-700 shadow-lg transition duration-300 ease-in-out ${
          props.location === "event" ? "hover:bg-white" : "hover:bg-gray-300"
        }`}
        style={{
          borderRadius: "20px",
          borderTopLeftRadius: "0px",
        }}
      >
        <Link to={linkPath} onClick={handleReadMoreClick}>
          <div className="relative overflow-hidden hover:sky-500">
            <img
              src={
                props?.image
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
            {props?.location == "event" || props?.location == "YourEvent" ? (
              <Link
                to={`/event-content/${props?.eventId}`}
                state={{ ...props }}
                class="mt-12 block w-full select-none rounded-lg bg-[#171E4B] py-3.5 px-7 text-center align-middle font-sans
             text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:bg-[#293aaa]
              focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                More Information
              </Link>
            ) : (
              <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                <p className="border-2 border-black rounded-lg px-2">Data</p>
                <p className="border-2 border-black rounded-lg px-2">
                  Development
                </p>
              </div>
            )}
          </div>
        </Link>
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
        To read this article, you need to be logged in or create an account.
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
