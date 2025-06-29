"use client";
import React from "react";
import { ArrowUpRight, Layers } from "lucide-react";
import { BlogPost } from "@/types/posts.type";
import Link from "next/link";
import { formatDate } from "@/lib/actions/format-date";

const BlogCard = ({ data }: { data: BlogPost }) => {
  const blogdata = data;
  const blogLetter = (str: string) => str.charAt(0).toUpperCase();
  return (
    <div className="blog__card">
      <div className="blog__card__container">
        <div className="blog__card__header">
          <div className="blog__card__author">
            <div className="blog__card__avatar">
              {blogLetter(blogdata.author.username)}
            </div>
            <div className="blog__card__info">
              <h1 className="blog__card__title">{blogdata.title}</h1>
              <p className="blog__card__date">
                {formatDate(blogdata.createdAt)}
              </p>
            </div>
          </div>
          <Link className="blog__card__view-btn" href={`/posts/${blogdata.id}`}>
            View Blog
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <p className="blog__card__description">{blogdata.desc}</p>

        <div className="blog__card__tags">
          {blogdata.tags.map((data) => {
            return (
              <div className="blog__card__tag" key={data}>
                <Layers size={14} />
                {data}
              </div>
            );
          })}

          {/* <div className="blog__card__tag">
            <Database size={14} />
            Backend
          </div>
          <div className="blog__card__tag">
            <Layers size={14} />
            fullstack
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
