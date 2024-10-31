import React, { useState } from 'react';

function Pagination(props) {
    const itemsPerPage = 2;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        const totalPages = Math?.ceil(props.articles?.length / itemsPerPage);
    };
    const totalPages = Math?.ceil(props.articles?.length / itemsPerPage);

    return (
        <>

            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${currentPage === index + 1
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    )
}

export default Pagination;