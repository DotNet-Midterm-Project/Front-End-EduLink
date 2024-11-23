import image from "../../assets/imagesecation.png";

function ImageShow(props) {
  return (
    <>
      <div className="relative" data-te-carousel-init data-te-ride="carousel">
        <div className="relative mx-auto w-full h-60 md:h-96 opacity-90">
          <img
            src={`${import.meta.env.VITE_URL_BACKEND}/Resources/${
              props.image || image
            }`}
            className="block w-full h-full"
            alt="image"
          />

          <div
            className="ml-8 mt-42 absolute shadow-lg shadow-blue-500/50 bottom-[-40px] p-2 md:p-5 h-32 md:h-36 flex items-center text-left text-black bg-[#E0D9D9CC] bg-opacity-90"
            style={{ borderRadius: "0px 20px 20px 20px" }}
          >
            <div
              className="flex items-center space-x-4 "
              style={{ borderRadius: "0px 20px 20px 20px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="84"
                height="84"
              >
                <path
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                  fill="white"
                />
              </svg>
              <div>
                <h5 className="text-lg md:text-2xl font-bold mt-1">
                  {props.user}
                </h5>
                <p className="text-sm md:text-base">{props.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageShow;
