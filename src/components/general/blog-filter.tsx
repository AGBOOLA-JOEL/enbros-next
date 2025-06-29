"use client";

import { Dispatch, SetStateAction } from "react";

type BlogFilterProps = {
  activeFilter: string;
  setActiveFilter: Dispatch<SetStateAction<string>>;
};

const BlogFilter = ({ activeFilter, setActiveFilter }: BlogFilterProps) => {
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
