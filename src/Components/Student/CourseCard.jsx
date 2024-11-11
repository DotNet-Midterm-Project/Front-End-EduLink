import image from "../../assets/imagesecation.png";

function CourseCard(props) {  
  const initials = props.course_Name?.split(" ").map(word => word[0]).join("").toUpperCase(); // Gets initials, e.g., "CN" for "Course Name"

  return (
    <div className="my-6 w-full max-w-xs mx-auto" key={props?.id}>
      <div className="flex rounded-lg shadow-lg overflow-hidden h-36">
        
        {/* Left section: either image or initials with background color */}
        <div 
          className={`flex items-center justify-center w-1/3 h-full`}
          style={{ borderRadius: "0px 20px 20px 0px" }}
        >
          {image ? (
            <img src={image} alt="Course" className="object-cover h-full w-full" style={{ borderRadius: "0px 0px 0px 20px" }} />
          ) : (
            <span className="text-white text-3xl font-bold">{initials}</span>
          )}
        </div>

        {/* Right section: text content */}
        <div className="bg-[#EFEFEF] w-2/3 p-4" style={{ borderRadius: "0px 20px 20px 20px" }}>
          <h3 className="text-lg font-semibold text-gray-800">Volunteer Name</h3>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">{props.course_Name}</h2>
        </div>

      </div>
    </div>
  );
}

export default CourseCard;
