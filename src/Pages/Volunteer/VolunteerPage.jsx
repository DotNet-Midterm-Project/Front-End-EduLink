import CourseCard from "../../Components/Student/CourseCard";
import ImageShow from "../../Components/Student/ImageShow";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../../Redux/Slices/CourseSlice";
import Loading from "../../Components/Loading";
import ServerError from "../../Components/Error/ServerError";
import NoData from "../../Components/Error/NoData";

function VolunteerPage() {
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

  return (
    <>
      <ImageShow user={user} email={email} />
      <h1 className="text-2xl font-bold m-8 mt-24 text-[#0B102F]">
        All Courses
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {
        courses?.length > 0 ? (
          courses?.map((course) => (
            <CourseCard
              key={course?.courseId}
              name={course?.course_Name}
              id={course?.courseId}
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

export default VolunteerPage;
