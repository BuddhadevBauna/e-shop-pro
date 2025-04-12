import React from "react";
import "./PaginationControll.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PaginationControll = ({ currentPage, totalPages, fetchFunction }) => {
    return (
        <div className="custom-pagination">
            <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => fetchFunction(currentPage - 1)}
            >
                <FaChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                    key={pageNum}
                    className={`page-number ${currentPage === pageNum ? "active" : ""}`}
                    disabled={currentPage === pageNum}
                    onClick={() => {
                        if (pageNum !== currentPage) fetchFunction(pageNum);
                    }}
                >
                    {pageNum}
                </button>
            ))}
            <button
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => fetchFunction(currentPage + 1)}
            >
                <FaChevronRight />
            </button>
        </div>
    );
}

export default PaginationControll;