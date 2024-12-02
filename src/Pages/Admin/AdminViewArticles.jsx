import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllArticles } from "../../Redux/Slices/articlesSlice";
import Loading from "../../Components/Admin/Loading";
import { toast } from "react-toastify";
import axios from "axios";

export default function AdminArticles() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const itemsPerPage = 5;

  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchAllArticles());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error loading data: {error}
      </div>
    );
  }

  if (!articles || articles?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">
          No Articles Found
        </h1>
        <p className="text-gray-500">There are no articles available to display.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(articles?.length / itemsPerPage);

  const currentItems = articles?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRejectArticle = async (articleID) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_URL_BACKEND}/api/Admin/delete-article/${articleID}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,
          "ngrok-skip-browser-warning": "true",
        },
        }
      );

      dispatch(fetchAllArticles());
      toast.success("Article rejected successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject the article.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Manage Articles</h1>

        <div className="space-y-6">
          {currentItems?.map((article) => (
            <div
              key={article?.articleID}
              className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {article?.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    By: {article?.volunteerName} | Published:{" "}
                    {new Date(article?.publicationDate).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded-md font-semibold transition-colors duration-300 ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedArticle.title}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              By: {selectedArticle.volunteerName}
            </p>
            <p className="text-gray-700 mb-4">{selectedArticle.articleContent}</p>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
                onClick={() => setSelectedArticle(null)}
              >
                Close
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                onClick={() => {
                  handleRejectArticle(selectedArticle.articleID);
                  setSelectedArticle(null);
                }}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
