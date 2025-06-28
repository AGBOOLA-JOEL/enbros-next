import React from "react";
import { ArrowUpRight, Code, Database, Layers, Heart } from "lucide-react";

const BlogCard = () => {
  return (
    <div className="blog__card">
      <div className="blog__card__container">
        <div className="blog__card__header">
          <div className="blog__card__author">
            <div className="blog__card__avatar">AB</div>
            <div className="blog__card__info">
              <h1 className="blog__card__title">Quantum Computing</h1>
              <p className="blog__card__date">October 15, 2023</p>
            </div>
          </div>
          <button className="blog__card__view-btn">
            View Blog
            <ArrowUpRight size={16} />
          </button>
        </div>

        <p className="blog__card__description">
          Explore the revolution in quantum computing, its applications, and its
          potential impact on various industries.
        </p>

        <div className="blog__card__tags">
          <div className="blog__card__tag">
            <Heart size={14} />
            Frontend
          </div>
          <div className="blog__card__tag">
            <Database size={14} />
            Backend
          </div>
          <div className="blog__card__tag">
            <Layers size={14} />
            fullstack
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
