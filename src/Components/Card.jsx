import { Link } from "react-router-dom";
import { formatDate, splitDescription } from "../utils/dateUtils";

function Card(props) {
  const linkPath =
    props.location === "event"
      ? `/event-content/${props?.eventId}`
      : `/articles/${props?.id}`;
  console.log("this is the card", props);

  return (
    <>
      <div
        className={`mx-3 mt-4 relative flex w-[23rem] max-w-[26rem] flex-col bg-white bg-clip-border text-gray-700 shadow-lg transition duration-300 ease-in-out ${
          props.location === "event" ? "hover:bg-white" : "hover:bg-gray-300"
        }`}
      >
        <Link to={linkPath}>
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
              style={{ borderRadius: "0px 20px 20px 20px" }}
              className="h-56 w-full object-cover transition-opacity duration-500 hover:sky-500"
            />

            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(214,100%,60%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
          </div>
          <div className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
                {props?.auther}. {formatDate(props?.date)}
              </p>
              <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  transform="rotate(45)"
                >
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M12 4V20M12 4L8 8M12 4L16 8"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
              </p>
            </div>
            <div className="mb-3 flex items-center justify-between">
              <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
                {props?.title}
              </h5>
            </div>

            <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
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
    </>
  );
}

export default Card;
