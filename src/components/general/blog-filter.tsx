"use client";

import { useState } from "react";

const BlogFilter = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Frontend",
    "Backend",
    "Full stack",
    "Career",
    "OpenSource",
  ];

  return (
    <div className="blog__filter">
      <div className="blog__filter__container">
        {filters.map((filter, index) => (
          <button
            key={`${filter}-${index}`}
            onClick={() => setActiveFilter(filter)}
            className={`blog__filter__button ${
              activeFilter === filter ? "blog__filter__button--active" : ""
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogFilter;
