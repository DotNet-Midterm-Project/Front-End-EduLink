import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddSessionModal = ({ event, onClose, onSessionAdded }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [details, setDetails] = useState("");
  const [sessionCapacity, setSessionCapacity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sessionData = {
      eventID: event.eventID,
      startDate,
      endDate,
      details,
      sessionCapacity: parseInt(sessionCapacity),
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_URL_BACKEND}/api/Volunteer/add-session`,
        sessionData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Session added successfully!");
      onSessionAdded();
      onClose();
    } catch (error) {
      console.error("Error adding session:", error);
      toast.error("Failed to add session.");
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <textarea
          placeholder="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <input
          type="number"
          placeholder="Session Capacity"
          value={sessionCapacity}
          onChange={(e) => setSessionCapacity(e.target.value)}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
};

export default AddSessionModal;
