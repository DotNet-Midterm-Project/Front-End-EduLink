import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AddEventContentModal = ({ event, onClose, isOpen }) => {
  const [contentName, setContentName] = useState("");
  const [contentType, setContentType] = useState(0);
  const [contentDescription, setContentDescription] = useState("");
  const [contentAddress, setContentAddress] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("EventID", event.eventID);
    formData.append("ContentName", contentName);
    formData.append("ContentType", contentType);
    formData.append("ContentDescription", contentDescription);
    formData.append("ContentAddress", contentAddress);
    if (uploadFile) {
      formData.append("uploadFile", uploadFile);
    }

    setIsSubmitting(true);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Event Content"
      className="bg-white p-6 rounded-lg max-w-lg mx-auto shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 text-center">
          Add Event Content
        </h2>
        <div>
          <label
            htmlFor="contentName"
            className="block text-sm font-medium text-gray-700"
          >
            Content Name
          </label>
          <input
            id="contentName"
            type="text"
            placeholder="Enter content name"
            value={contentName}
            onChange={(e) => setContentName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label
            htmlFor="contentType"
            className="block text-sm font-medium text-gray-700"
          >
            Content Type
          </label>
          <select
            id="contentType"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="" disabled>
              Select content type
            </option>
            <option value="0">Presentation</option>
            <option value="1">Document</option>
            <option value="2">Video</option>
            <option value="3">Book</option>
          </select>

          {/* <input
            id="contentType"
            type="number"
            placeholder="Enter content type (e.g., 1 for video)"
            value={contentType}
            onChange={(e) => setContentType(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
          /> */}
        </div>
        <div>
          <label
            htmlFor="contentDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Content Description
          </label>
          <textarea
            id="contentDescription"
            placeholder="Enter content description"
            value={contentDescription}
            onChange={(e) => setContentDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label
            htmlFor="contentAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Content Address
          </label>
          <input
            id="contentAddress"
            type="text"
            placeholder="Enter content address (e.g., URL)"
            value={contentAddress}
            onChange={(e) => setContentAddress(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label
            htmlFor="uploadFile"
            className="block text-sm font-medium text-gray-700"
          >
            Upload File
          </label>
          <input
            id="uploadFile"
            type="file"
            onChange={(e) => setUploadFile(e.target.files[0])}
            className="w-full p-2"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
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

export default AddEventContentModal;
