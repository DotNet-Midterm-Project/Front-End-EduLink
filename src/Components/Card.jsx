import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { fetchArticleById } from "../Redux/Slices/articlesSlice";
import { formatDate, splitDescription } from "../utils/dateUtils";

function Card(props) {
    // const dispatch = useDispatch();
    
    

    // const handleCardClick = () => {
    //     dispatch(fetchArticleById(props.id));
    // };

    return (
        <>
            <div className="mx-8 my-28 relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg transition duration-300 ease-in-out hover:bg-gray-300">
              <Link to={`/articles/${props?.id}`}>
                <div className="relative overflow-hidden rounded-t-lg hover:sky-500">
                    <img
                        src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        alt={props?.title}
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
                {/* <div className="p-6 pt-3"> 
                    <button
                        className="block w-full select-none rounded-lg bg-pink-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        data-ripple-light="true"
                    >
                        Reserve
                    </button>
                </div> */}
                </Link>
            </div>
        </>
    )
}

export default Card;
