import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import Loading from "../../Components/Admin/Loading";
import ServerError from "../../Components/Error/ServerError";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllDepartment } from "../../Redux/Slices/adminDepartmentSlice";

const AdminViewAllDepartments = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    departmentName: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const { departments, loading, error } = useSelector(
    (state) => state.departments
  );
  console.log("Departments:", departments);

  useEffect(() => {
    dispatch(fetchAllDepartment());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ServerError error={error} />;
  }

  if (!departments || departments.length === 0) {
    return <p className="text-center mt-10">No departments available.</p>;
  }

  const handleDelete = async (departmentName) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_URL_BACKEND
        }/api/Admin/delete-department/${departmentName}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
             

          },
        }
      );
      // console.log("API Response:", response.data);

      dispatch(fetchAllDepartment());

      toast.success("Department deleted successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete department."
      );
    }
  };

  const handleAddDepartment = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL_BACKEND}/api/Admin/add-new-department`,
        newDepartment,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("API Response:", response.data);

      dispatch(fetchAllDepartment());

      setNewDepartment({ departmentName: "", address: "" });

      setModalVisible(false);

      toast.success("Department added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add department.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const headers = ["Department Name", "Address", "Actions"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              Manage Departments
            </h1>
            <button
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setModalVisible(true)}
            >
              <PlusCircleIcon className="w-5 h-5 mr-2" />
              Add Department
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  {headers?.map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-xs font-medium text-left text-gray-700 uppercase tracking-wider border-b border-gray-200"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {departments?.map((department, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-800">
                      {department?.departmentName}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap text-gray-600">
                      {department?.address}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap flex space-x-4">
                      <TrashIcon
                        className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-700 transition duration-150"
                        onClick={() => handleDelete(department?.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Add New Department
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Department Name"
                value={newDepartment?.departmentName}
                onChange={(e) =>
                  setNewDepartment({
                    ...newDepartment,
                    departmentName: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Address"
                value={newDepartment?.address}
                onChange={(e) =>
                  setNewDepartment({
                    ...newDepartment,
                    address: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600 transition duration-150"
                onClick={() => setModalVisible(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-150"
                onClick={handleAddDepartment}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminViewAllDepartments;
