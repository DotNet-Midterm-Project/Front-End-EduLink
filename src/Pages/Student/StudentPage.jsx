import CourseCard from "../../Components/Student/CourseCard";
import ImageShow from "../../Components/Student/ImageShow";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../../Redux/Slices/CourseSlice";
import Loading from "../../Components/Loading";
import ServerError from "../../Components/Error/ServerError";
import NoData from "../../Components/Error/NoData";

function StudentPage() {
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  const user = localStorage.getItem("userName") || "";
  const email = localStorage.getItem("email") || "";
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ServerError error={error} />;
  }
console.log("this is the courses",courses);


  return (
    <>
      <ImageShow user={user} email={email} />
      <h1 className="text-2xl font-bold m-8 mt-24 text-[#0B102F]">
        Courses in your department
      </h1>

      <div className="flex flex-wrap justify-start gap-8 mx-8 my-12">
        {
        courses?.length > 0 ? (
          courses?.map((course) => (
            <CourseCard
            location="volinteer"
              key={course?.courseId}
              id={course?.courseId}
              name={course?.course_Name}
              description={course?.courseDescription}
              count={course?.volunteerCount}
            />
          ))
        ) : (
          <div className="flex justify-center mx-auto my-12 w-full">
            <NoData />
          </div>
        )}
      </div>
    </>
  );
}

export default StudentPage;
