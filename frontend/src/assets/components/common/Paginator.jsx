import React from "react";

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex">
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`mx-1 mb-5 flex h-9 w-9 items-center justify-center rounded-full ${
              currentPage === pageNumber
                ? "bg-brand p-0 text-sm text-white shadow-md shadow-brand/20"
                : "border border-gray-200 bg-transparent p-0 text-sm text-gray-600 hover:bg-gray-100"
            } transition duration-150 ease-in-out`}
          >
            <button onClick={() => onPageChange(pageNumber)} className="w-full h-full">
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginator;
