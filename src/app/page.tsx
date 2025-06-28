"use client";
import BlogCard from "@/components/general/blog-card";
import BlogFilter from "@/components/general/blog-filter";
import BlogPagination from "@/components/general/blog-pagination";
import HomeStat from "@/components/homepage/home-stat";

export default function Homepage() {
  return (
    <div className="homepage">
      <HomeStat />
      <BlogFilter />
      <div className="homepage__blogs">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
      <div className="homepage__pagination">
        <BlogPagination type="Rows" data={["shs"]} setCurrentItems={() => {}} />
      </div>
      home page
    </div>
  );
}
