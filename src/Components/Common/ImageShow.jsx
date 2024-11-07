import { Link } from "react-router-dom";
import { formatDate, splitDescription } from "../../utils/dateUtils";

function ImageShow(props) {
    return (
        <>
            <div
                id={props?.id}
                key={props?.id}
                className="relative"
                data-te-carousel-init
                data-te-ride="carousel"
            >
                <div className="relative rounded-gl h-96 mx-auto w-11/12 after:clear-both after:block after:content-[''] opacity-90">
                  <Link to={`/articles/${props?.id}`}>
                    <img
                        src={image1}
                        className="block w-full h-full object-fill rounded-2xl"
                        alt="Motorbike Smoke"
                    />
                    </Link>
                    <div className="absolute inset-x-[2%] bottom-5 hidden text-left md:block text-white">
                        <p className="flex">{props?.auther} <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-2 ml-2"><span className="flex w-2 h-2 bg-white rounded-full me-1.5 flex-shrink-0"></span>{formatDate(props?.date)}</span> </p>
                        <h5 className="text-2xl font-bold">{props?.title}</h5>
                        <p className="">{splitDescription(props?.description, 10)}</p>
                    </div>
                </div>
            </div>


        </>
    );
}

export default ImageShow;
