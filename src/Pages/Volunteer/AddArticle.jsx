import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Breadcrumb from "../../Components/Breadcrumb";

const AddArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Title and Content are required!");
      return;
    }

    const formData = new FormData();
    formData.append("Title", title);
    formData.append("ArticleContent", content);
    formData.append("PublicationDate", new Date().toISOString()); // Use current timestamp
    if (image) {
      formData.append("UploadFile", image);
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL_BACKEND}/api/Volunteer/add-article`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Article added successfully!");
        setTitle("");
        setContent("");
        setImage(null);
      } else {
        toast.error("Failed to add article. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting article:", error);
      toast.error("An error occurred while adding the article.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-36">
      <Breadcrumb />
      <div className=" max-w-5xl mx-auto p-6 mt-18 mb-24">
        <ToastContainer />
        <div className="bg-[#F9F9F9] shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium mb-2">Title</label>
              <input
                type="text"
                placeholder="Article title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Content Editor */}
            <div>
              <label className="block font-medium mb-2">Content</label>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Enter article content"
                className="bg-white mb-8"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-medium mb-2">
              Upload article image
              </label>
              <label
                htmlFor="uploadFile1"
                className="bg-white w-full p-2 text-gray-500 font-semibold text-base rounded max-w-md h-50
               flex flex-col items-center justify-center cursor-pointer border-2 border-gray-400 border-dashed font-[sans-serif]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-11 mb-2 fill-gray-500"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000"
                  />
                  <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000"
                  />
                </svg>
                Upload image
                <input
                  type="file"
                  id="uploadFile1"
                  className="hidden w-40 p-2 border rounded"
                  onChange={handleImageChange}
                />
                <p className="text-xs font-medium text-gray-400 mt-2">
                  PNG, JPG, JPEG are Allowed.
                </p>
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-right flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={` px-4 py-2 text-white rounded-md ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-[#F28E33] hover:bg-[#f28f33e3]"
                }`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArticle;
