import React from "react";

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={i === currentPage ? "active" : ""}>
          <button
            onClick={() => handlePageClick(i)}
            style={{
              backgroundColor: i === currentPage ? "green" : "",
              width: "30px",
              color: i === currentPage ? "#fff" : "",
            }}
          >
            {i}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination-bx m-t30">
      <ul className="pagination">
        <li className="previous">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <i className="ti-arrow-left"></i> Prev
          </button>
        </li>
        {renderPageNumbers()}
        <li className="next">
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next <i className="ti-arrow-right"></i>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
