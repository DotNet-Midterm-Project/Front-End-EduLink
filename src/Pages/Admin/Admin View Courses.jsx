import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { TrashIcon, PlusCircleIcon, LinkIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllAdminCourses } from "../../Redux/Slices/adminCoursesSlice";
import { fetchAllDepartment } from "../../Redux/Slices/adminDepartmentSlice";
import Loading from "../../Components/Admin/Loading";
import ServerError from "../../Components/Error/ServerError";
import NoData from "../../Components/Error/NoData";

const AdminViewAllCourses = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [linkModalVisible, setLinkModalVisible] = useState(false);
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    courseDescription: "",
  });
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const { adminCourses, loading, error } = useSelector(
    (state) => state.adminCourses
  );
  const { departments } = useSelector((state) => state.departments);

  useEffect(() => {
    dispatch(fetchAllAdminCourses());
    dispatch(fetchAllDepartment());
  }, [dispatch]);

  if (loading) return <Loading />;

  const handleAddCourse = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL_BACKEND}/api/Admin/add-course`,
        newCourse,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          "ngrok-skip-browser-warning": "true",
        }
      );

      dispatch(fetchAllAdminCourses());
      setNewCourse({ courseName: "", courseDescription: "" });
      setModalVisible(false);
      toast.success("Course added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add course.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    // console.log(courseId);

    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_URL_BACKEND
        }/api/Admin/delete-course/${courseId}`,
        {
          "ngrok-skip-browser-warning": "true",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      dispatch(fetchAllAdminCourses());
      toast.success("Course deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete course.");
    }
  };

  const handleLinkCourseToDepartment = async () => {
    // console.log(selectedCourseId, selectedDepartmentId);

    if (!selectedCourseId || !selectedDepartmentId) {
      toast.error("Please select a course and a department.");
      return;
    }

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_URL_BACKEND
        }/api/Admin/add-course-to-department/${selectedDepartmentId}/${selectedCourseId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // إغلاق المودال بعد النجاح
      setLinkModalVisible(false);
      toast.success("Course linked to department successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to link course to department."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              Manage Courses
            </h1>
            <button
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => setModalVisible(true)}
            >
              <PlusCircleIcon className="w-5 h-5 mr-2" />
              Add Course
            </button>
          </div>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-700 uppercase">
                  Course Name
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-700 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {adminCourses ? (
                adminCourses?.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b text-gray-800">
                      {course?.courseName}
                    </td>
                    <td className="px-6 py-4 border-b text-gray-600">
                      {course?.courseDescription}
                    </td>
                    <td className="px-6 py-4 border-b flex space-x-4">
                      <LinkIcon
                        className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-700"
                        onClick={() => {
                          setSelectedCourseId(course?.courseID);
                          setLinkModalVisible(true);
                        }}
                      />
                      <TrashIcon
                        className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => handleDeleteCourse(course?.courseID)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <NoData />
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Course</h2>
            <input
              type="text"
              placeholder="Course Name"
              value={newCourse.courseName}
              onChange={(e) =>
                setNewCourse({ ...newCourse, courseName: e.target.value })
              }
              className="w-full p-3 border rounded-lg mb-4"
            />
            <textarea
              placeholder="Course Description"
              value={newCourse?.courseDescription}
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  courseDescription: e.target.value,
                })
              }
              className="w-full p-3 border rounded-lg mb-4"
            ></textarea>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => setModalVisible(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleAddCourse}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {linkModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Link Course to Department
            </h2>
            <select
              value={selectedDepartmentId}
              onChange={(e) => setSelectedDepartmentId(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            >
              <option value="">Select Department</option>
              {departments?.map((department) => (
                <option key={department?.id} value={department?.id}>
                  {department?.departmentName}
                </option>
              ))}
            </select>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => setLinkModalVisible(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleLinkCourseToDepartment}
              >
                Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminViewAllCourses;
