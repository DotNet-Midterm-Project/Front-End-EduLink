import { Link } from "react-router-dom";
import { formatDate, splitDescription } from "../../utils/dateUtils";

function ImageShow(props) {
  console.log(props);

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
          <Link to={`/articles/${props?.id}`}>
            <img
              src={`${import.meta.env.VITE_URL_BACKEND}/Resources/${props?.image}`}
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
            <h5 className="text-lg md:text-2xl font-bold mt-1">{props?.title}</h5>

            {/* Description with reduced characters for mobile */}
            <p className="text-xs md:text-sm mt-1">
              {splitDescription(props?.description, window.innerWidth < 768 ? 5 : 10)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageShow;
