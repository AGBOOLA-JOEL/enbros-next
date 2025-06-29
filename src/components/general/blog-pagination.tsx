"use client";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";

interface BlogPaginationProps {
  data: any[];
  type: "Rows" | "Columns";
  setCurrentItems: (items: any[]) => void;
}
const BlogPagination: React.FC<BlogPaginationProps> = ({
  data,
  type,
  setCurrentItems,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [itemOffset, setItemOffset] = useState(0);

  const pageCount = Math.ceil(data.length / itemsPerPage);
  const endOffset = Math.min(itemOffset + itemsPerPage, data.length);

  useEffect(() => {
    setCurrentItems(data.slice(itemOffset, endOffset));
  }, [itemOffset, itemsPerPage, endOffset]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue > 0) {
      const newItemsPerPage = type === "Rows" ? newValue * 2 : newValue;
      setItemsPerPage(newItemsPerPage);
      setItemOffset(0); // Reset to the first page
    }
  };

  return (
    <div className="blog__paginate">
      <div className="blog__paginate__input">
        <p>{type} per page:</p>
        <div className="blog__paginate__down">
          <input
            type="number"
            min="1"
            value={type === "Rows" ? itemsPerPage / 2 : itemsPerPage}
            onChange={handleItemsPerPageChange}
          />
        </div>
      </div>

      <div className="reactPaginate">
        <p>
          {data.length === 0 ? "0 - 0" : `${itemOffset + 1} - ${endOffset}`} of{" "}
          {data.length}
        </p>
        <ReactPaginate
          previousLabel={<ChevronLeft />}
          nextLabel={<ChevronRight />}
          containerClassName="paginate"
          pageCount={pageCount}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
};

export default BlogPagination;
