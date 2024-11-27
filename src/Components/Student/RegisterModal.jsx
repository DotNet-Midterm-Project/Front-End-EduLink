import { close } from "../../assets";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../../Redux/Slices/CourseSlice";
import { registerAsVolunteer } from "../../Redux/Slices/registerAsVolunteerSlice";
import Loading from "../Loading";
import ServerError from "../Error/ServerError";
import Swal from "sweetalert2";

function RegisterModal({ onClose }) {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);
  const registerAsAVolunteer = useSelector((state) => state.register);
  const [selectedSkills, setSelectedSkills] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  console.log(registerAsAVolunteer);
  console.log(courses);
  

  const skills = ["HTML","CSS",
    "JavaScript","React","Node.js","MongoDB","Python","Java","C++","C#","SQL","PHP","Swift","Kotlin","Rust","TypeScript","Dart",];

  const handleCheckboxChange = (skill) => {
    setSelectedSkills((prev) => ({
      ...prev,
      [skill]: !prev[skill],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillsDescription = Object.keys(selectedSkills)
      .filter((skill) => selectedSkills[skill])
      .join(", ");
    const data = {
      coursesID: [selectedCourse],
      skillsDescription,
    };
  
    try {
      await dispatch(registerAsVolunteer(data)).unwrap();
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have been successfully registered as a volunteer!",
        confirmButtonText: "OK",
      });

      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "An error occurred. Please try again later.",
        confirmButtonText: "OK",
      });
    }
  };
  

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ServerError error={error} />;
  }

  return (
    <>
      <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
        <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
          <div style={{boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"}} className="w-full bg-[#f9f9f9] shadow shadow-zinc-950 cursor-default pointer-events-auto relative rounded-xl mx-auto max-w-xl">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 rtl:right-auto rtl:left-2"
            >
              <img src={close} className="m-2" />
              <span className="sr-only">Close</span>
            </button>
            <div className="">
              <div className="p-2 space-y-2 text-center bg-[#F28E33] rounded-lg" style={{ borderRadius: "10px 10px 0 0" }}>
                <h2
                  className="text-xl font-bold tracking-tight text-[#f9f9f9]"
                  id="page-action.heading"
                >
                  Register as a Volunteer
                </h2>
                <p className="text-[#f9f9f9]">
                  Are you sure you would like to become a volunteer?
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-1 place-items-center px-4 py-2">
                <form
                  noValidate=""
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="course" className="mb-2 text-[#4C4B4B] text-lg">
                      Choose a course
                      <span className="text-red-600 inline-block p-1 text-sm">
                        *
                      </span>
                    </label>
                    <select
                      value={selectedCourse}
                      onChange={(e) =>
                        setSelectedCourse(Number(e.target.value))
                      }
                      className="border p-3 shadow-md border-gray-700 placeholder:text-base focus:outline-none ease-in-out duration-300 rounded-lg w-full"
                    >
                      <option value="">Select a course</option>
                      {courses?.map((course) => (
                        <option
                          key={course?.courseId}
                          value={course?.courseId}
                          className="text-black"
                        >
                          {course?.course_Name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="skills" className="mb-2 text-[#4C4B4B] text-lg">
                      Choose Your Skills
                      <span className="text-red-600 inline-block p-1 text-sm">
                        *
                      </span>
                    </label>
                    <div className="grid grid-cols-4 gap-2 text-[#4C4B4B]">
                      {skills.map((skill, index) => (
                        <label
                          key={index}
                          className="flex items-center border rounded-lg p-2"
                        >
                          <input
                            type="checkbox"
                            value={skill}
                            className="mr-2"
                            checked={!!selectedSkills[skill]}
                            onChange={() => handleCheckboxChange(skill)}
                          />
                          {skill}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex items-center justify-center py-3 gap-1 font-medium rounded-lg border transition-colors
                       outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset min-h-[2.25rem] px-4
                        text-sm text-white bg-[#6B6868] hover:bg-[#6b6868d9] border-white focus:ring-primary-600 focus:text-primary-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center py-3 gap-1 font-medium rounded-lg border transition-colors outline-none
                       focus:ring-offset-2 focus:ring-2 focus:ring-inset min-h-[2.25rem] px-4 text-sm text-white shadow
                        focus:ring-white border-white bg-[#F28E33] hover:bg-[#f27f33] focus:bg-[#11071F] focus:ring-offset-[#11071F]"
                    >
                      <span className="flex items-center gap-1">
                        <span>Request Approval</span>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterModal;
