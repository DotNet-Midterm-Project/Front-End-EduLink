import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllVolunteerByCourseId } from "../../Redux/Slices/CourseSlice";
import CourseCard from "./CourseCard";
import Loading from "../Loading";
import ServerError from "../Error/ServerError";

function ShowVolunteerByCourse() {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const volunteers = useSelector((state) => state.courses.volunteers);
    const loading = useSelector((state) => state.courses.loading);
    const error = useSelector((state) => state.courses.error);

    useEffect(() => {
        if (courseId) {
          dispatch(fetchAllVolunteerByCourseId({ CourseID: courseId }));
        }
      }, [courseId, dispatch]);

  if (loading) return <Loading />;
  if (error) return <ServerError message={error} />;
  console.log("Course ID from params:", courseId);
  console.log("Volunteers from state:", volunteers);

//   const volunteers = volunteers?.filter(
//     (volunteer) => volunteer?.courseId?.toString() === courseId?.toString()
//   );

  return (
    <div className="flex flex-wrap justify-start gap-8 mx-8 my-12">
      {volunteers?.length > 0 ? (
        volunteers?.map((volunteer) => (
          <CourseCard
            key={volunteer?.volunteerID}
            id={volunteer?.volunteerID}
            name={volunteer?.volunteerName}
            department={volunteer?.departmentName}
            location="ShowVolunteerByCourse"
          />
        ))
      ) : (
        <p>No volunteers found for this course.</p>
      )}
    </div>
  );
}

export default ShowVolunteerByCourse;
