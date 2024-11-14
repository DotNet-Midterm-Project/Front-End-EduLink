import { Link } from "react-router-dom";
import { formatDate, splitDescription } from "../utils/dateUtils";

function Card(props) {
    console.log(props.location == 'event');
    
    return (
        <>
            <div className="mx-3 mt-4 relative flex w-[23rem] max-w-[26rem] flex-col bg-white bg-clip-border text-gray-700 shadow-lg transition duration-300 ease-in-out hover:bg-gray-300">
              <Link to={`/articles/${props?.id}`}>
                <div className="relative overflow-hidden hover:sky-500">
                    <img
                        src={`${import.meta.env.VITE_URL_BACKEND}/Resources/${props.image}`}
                        alt={props?.title}
                        style={{ borderRadius: "0px 20px 20px 20px" }}
                        className="h-56 w-full object-cover transition-opacity duration-500 hover:sky-500"
                    />
                    <div
                        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(214,100%,60%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>

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
                    <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                        <p className="border-2 border-black rounded-lg px-2">Data</p>
                        <p className="border-2 border-black rounded-lg px-2">Development</p>

                    </div>
                </div>
                </Link>
            </div>
        </>
    )
}

export default Card;
