import image from "../../assets/imagesecation.png";
import ModalCourse from "../../Components/Student/ModalCourse";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CourseCard(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => setIsModalOpen(true);

  const initials = props?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
    //  Gets initials, e.g., "CN" for "Course Name"
    console.log(props);
    
    const handleClick = () => {
      if (props?.location === "ShowVolunteerByCourse") {
        navigate("/volunteer");
      } else {
        handleOpenModal();
      }
    };
  return (
    <>
     <button onClick={handleClick}>

        <div className="my-6 w-full max-w-xs mx-auto" key={props?.id}>
          <div className="flex w-80 rounded-lg shadow-lg overflow-hidden h-[9rem]">
            <div
              className={`flex items-center justify-center w-42 h-full`}
              style={{ borderRadius: "0px 20px 20px 0px" }}
            >
              {image ? (
                <img
                  src={image}
                  alt="Course"
                  className="object-cover h-full w-full"
                  style={{ borderRadius: "0px 0px 0px 20px" }}
                />
              ) : (
                <span className="text-white text-3xl font-bold">
                  {initials}
                </span>
              )}
            </div>

            {/* Right section: text content */}
            <div
              className="text-left bg-[#EFEFEF] w-80 p-4"
              style={{ borderRadius: "0px 20px 20px 20px" }}
            >
              {props?.location === "ShowVolunteerByCourse" ? (
                <>
                <h2 className="text-2xl font-bold text-gray-800 mt-1">
                  {props?.name}
                </h2>
                <h3 className="text-lg font-semibold text-gray-800">
                {props?.department}
              </h3>
              </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mt-1">
                    {props?.name}
                  </h2>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Volunteers: {props?.count}
                  </h3>
                </>
              )}
            </div>
          </div>
        </div>
      </button>
      
      { props?.location === "ShowVolunteerByCourse" ? "" :
      isModalOpen && (
        <ModalCourse
          props={{
            id: props?.id,
            name: props?.course_Name,
            count: props?.count,
            description: props?.description,
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default CourseCard;
