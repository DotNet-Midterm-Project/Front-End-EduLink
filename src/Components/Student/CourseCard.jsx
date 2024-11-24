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
  // console.log(props);

  const handleClick = () => {
    if (props?.location === "ShowVolunteerByCourse") {
      navigate("/volunteer");
    } else if (props?.location === "ShowProfileVolunteer") {
      navigate("/volunteerProfile", { state: { volunteer: props.volunteer } });

    } else {
      handleOpenModal();
    }
  };
  
  return (
    <>
      <button onClick={handleClick}>
        <div className="my-6 w-full max-w-xs mx-auto" key={props?.id}>
          <div
            className="flex w-80 rounded-lg overflow-hidden h-[9rem]"
            style={{
              borderRadius: "0px 20px 20px 20px", // Top corners 0px, bottom corners 20px
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Adding shadow
            }}
          >
            <div
              className="flex items-center justify-center w-42 h-full"
              style={{
                borderRadius: "0px 0px 0px 20px", // Adjust for left side image area
              }}
            >
              {!props?.volunteer?.profile  ? (
                <img
                  src={image}
                  alt="Course"
                  className="object-cover h-full w-full"
                  style={{
                    borderRadius: "0px 0px 0px 20px", // Matches container's radius
                  }}
                />
              ) :   <img
              src={import.meta.env.VITE_URL_BACKEND + props.profile}
              alt="Course"
              className="object-cover h-full w-full"
              style={{
                borderRadius: "0px 0px 0px 20px", // Matches container's radius
              }}
            />}
            </div>

            {/* Right section: text content */}
            <div
              className="text-left bg-[#EFEFEF] w-80 p-4"
              style={{
                borderRadius: "0px 0px 20px 20px", // Right side radius
              }}
            >
              {props?.location === "ShowProfileVolunteer" ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mt-1">
                    {props?.name}
                  </h2>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {props.volunteer.departmentName}
                  </h3>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mt-1">
                    {props?.name}
                  </h2>
                  <h3
                    className="text-lg font-semibold text-gray-800"
                    style={{
                      fontSize: "14px", // Adjust font size for "Volunteers"
                    }}
                  >
                    Volunteers: {props?.count}
                  </h3>
                </>
              )}
            </div>
          </div>
        </div>
      </button>

      {props?.location === "ShowVolunteerByCourse" ? (
        ""
      ) : (
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
        )
      )}
    </>
  );
}

export default CourseCard;
