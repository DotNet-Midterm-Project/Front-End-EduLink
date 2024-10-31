import image1 from "../assets/image1.png";

function ImageShow() {
    return (
        <>
            <div id="controls-carousel" className="relative w-11/12 mx-auto" data-carousel="static">
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                    <img
                        src={image1}
                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="carousel image"
                    />
                </div>
            </div>
        </>
    );
}

export default ImageShow;
