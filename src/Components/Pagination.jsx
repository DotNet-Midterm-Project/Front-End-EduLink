import React from 'react';

function Pagination({ articles, itemsPerPage, currentPage, onPageChange }) {
    const totalPages = Math.ceil(articles?.length / itemsPerPage);

    return (
        <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, pageIndex) => (
                <button
                    key={pageIndex}
                    onClick={() => onPageChange(pageIndex + 1)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        currentPage === pageIndex + 1
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-900"
                    } font-semibold`}
                >
                    {pageIndex + 1}
                </button>
            ))}
        </div>
    );
}

export default Pagination;
