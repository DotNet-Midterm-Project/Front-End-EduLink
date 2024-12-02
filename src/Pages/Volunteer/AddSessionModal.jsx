import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AddSessionModal = ({ event, onClose, isOpen, onSessionAdded }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [details, setDetails] = useState("");
  const [sessionCapacity, setSessionCapacity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sessionData = new FormData();

    // Append form data
    sessionData.append("EventID", event.eventID);
    sessionData.append("StartDate", startDate || "");
    sessionData.append("EndDate", endDate || "");
    sessionData.append("Details", details || "");
    sessionData.append("SessionCapacity", parseInt(sessionCapacity) || 0);

    try {
      await axios.post(
        `${import.meta.env.VITE_URL_BACKEND}/api/Volunteer/add-session`,
        sessionData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      toast.success("Session added successfully!");
      onSessionAdded(); // استدعاء تحديث الجلسات
      onClose();
    } catch (error) {
      console.error("Error adding session:", error);
      toast.error("Failed to add session.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Session"
      className="bg-white p-6 rounded-lg max-w-lg mx-auto shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Add Session</h2>
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date and Time:
          </label>
          <input
            id="startDate"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date and Time:
          </label>
          <input
            id="endDate"
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700">
            Session Details:
          </label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter session details"
            required
          />
        </div>
        <div>
          <label htmlFor="sessionCapacity" className="block text-sm font-medium text-gray-700">
            Session Capacity:
          </label>
          <input
            id="sessionCapacity"
            type="number"
            value={sessionCapacity}
            onChange={(e) => setSessionCapacity(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter session capacity"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddSessionModal;
