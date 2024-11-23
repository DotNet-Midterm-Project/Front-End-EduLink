import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddEventContentModal = ({ event, onClose }) => {
  const [contentName, setContentName] = useState("");
  const [contentType, setContentType] = useState(0);
  const [contentDescription, setContentDescription] = useState("");
  const [contentAddress, setContentAddress] = useState("");
  const [uploadFile, setUploadFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("eventID", event.eventID);
    formData.append("contentName", contentName);
    formData.append("contentType", contentType);
    formData.append("contentDescription", contentDescription);
    formData.append("contentAddress", contentAddress);
    if (uploadFile) {
      formData.append("uploadFile", uploadFile);
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_URL_BACKEND}/api/Volunteer/add-event-content`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Event Content added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding event content:", error);
      toast.error("Failed to add event content.");
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Content Name"
          value={contentName}
          onChange={(e) => setContentName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Content Type"
          value={contentType}
          onChange={(e) => setContentType(Number(e.target.value))}
        />
        <textarea
          placeholder="Content Description"
          value={contentDescription}
          onChange={(e) => setContentDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Content Address"
          value={contentAddress}
          onChange={(e) => setContentAddress(e.target.value)}
        />
        <input type="file" onChange={(e) => setUploadFile(e.target.files[0])} />
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
};

export default AddEventContentModal;
