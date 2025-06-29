"use client";
import { useState } from "react";
import BlogCard from "@/components/general/blog-card";
import BlogFilter from "@/components/general/blog-filter";
import HomeStat from "@/components/homepage/home-stat";
import { BlogPost } from "@/types/posts.type";

type Props = {
  posts: BlogPost[];
};

export default function HomepageStatic({ posts }: Props) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredPosts =
    activeFilter === "All"
      ? posts
      : posts.filter((post) => post.tags.includes(activeFilter));

  return (
    <div className="homepage">
      <HomeStat />
      <BlogFilter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <div className="homepage__blogs">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <BlogCard key={post.id} data={post} />)
        ) : (
          <p>No posts found for "{activeFilter}"</p>
        )}
      </div>
    </div>
  );
}
