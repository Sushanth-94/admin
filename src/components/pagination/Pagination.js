import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

function Pagination({ pages, onPageChange }) {
  const totPages = pages && pages > 0 ? Math.ceil(pages / 10) : 0;

  return (
    // <div>
    <ReactPaginate
      pageCount={totPages}
      onPageChange={({ selected }) => onPageChange(selected)}
      forcePage={0}
      disabledClassName="disabled"
      initialPage={0}
      previousLabel="Previous"
      nextLabel="Next"
      breakLabel="..."
      breakClassName="break-me"
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      subContainerClassName="pages pagination"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      activeClassName="active"
    />
    // </div>
  );
}

export default Pagination;
