import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../Components/Admin/Loading";
import ServerError from "../../Components/Error/ServerError";
import {
  CheckCircleIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllVolunteers } from "../../Redux/Slices/VolunteerSlice";

const AdminViewAllVolunteers = () => {
  const [filterRequest, setFilterRequest] = useState("all");
  const [modalVolunteer, setModalVolunteer] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatch = useDispatch();
  const { volunteers, loading, error } = useSelector(
    (state) => state.volunteer
  );
  console.log(volunteers);
  useEffect(() => {
    dispatch(fetchAllVolunteers());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ServerError error={error} />;
  }

  if (!volunteers || volunteers.length === 0) {
    return <p className="text-center mt-10">No volunteers available.</p>;
  }

  const filteredVolunteers =
    filterRequest === "all"
      ? volunteers
      : volunteers.filter(
          (volunteer) => String(volunteer.approve) === filterRequest
        );

  const handleApprove = async (id) => {
    // console.log(`Approving volunteer with ID: ${id}`);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL_BACKEND}/api/Admin/approve-volunteer/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // console.log("API Response:", response.data);

      dispatch(fetchAllVolunteers());

      toast.success("Volunteer approved successfully!");

      setModalVolunteer(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to approve volunteer."
      );
    }
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_URL_BACKEND}/api/Admin/delete-volunteer/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("API Response:", response.data);

      dispatch(fetchAllVolunteers());

      toast.success("Volunteer deleted successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete volunteer."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const headers = [
    "Profile",
    "Name",
    "Email",
    "Skills",
    "Availability",
    "Rating",
    "Actions",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-700">
              Manage Volunteers
            </h1>
            <div className="relative">
              <select
                value={filterRequest}
                onChange={(e) => setFilterRequest(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Volunteers</option>
                <option value="true">Approved</option>
                <option value="false">Pending</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  {headers?.map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200 text-left"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredVolunteers?.map((volunteer, index) => (
                  <tr
                    key={volunteer?.volunteerID || index}
                    className={`border-b transition duration-200 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4 text-center">
                      {volunteer?.profile ? (
                        <img
                          src={volunteer?.profile}
                          alt="Profile"
                          className="w-10 h-10 rounded-full border"
                        />
                      ) : (
                        <div className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-200">
                          <UserCircleIcon className="w-6 h-6 text-gray-500" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {volunteer?.volunteerName}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {volunteer?.email}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {volunteer?.skillDescription}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {volunteer?.availability}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {volunteer?.rating || "N/A"} (
                      {volunteer?.ratingCount || 0} reviews)
                    </td>
                    <td className="px-6 py-4 flex items-center space-x-3 text-gray-600">
                      {!volunteer?.approve ? (
                        <CheckCircleIcon
                          className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-700"
                          onClick={() => setModalVolunteer(volunteer)}
                        />
                      ) : (
                        <span className="text-green-600 font-semibold">
                          Approved
                        </span>
                      )}
                      <TrashIcon
                        className={`w-6 h-6 ${
                          isDeleting
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-red-500 cursor-pointer hover:text-red-700"
                        }`}
                        onClick={() =>
                          !isDeleting && handleDelete(volunteer?.volunteerID)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalVolunteer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to approve {modalVolunteer?.volunteerName}?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => setModalVolunteer(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleApprove(modalVolunteer?.volunteerID)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminViewAllVolunteers;
