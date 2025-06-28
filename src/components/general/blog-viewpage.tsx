"use client";
import React from "react";
import { Heart, Eye, ArrowUpRight, Edit, Trash2 } from "lucide-react";
import useModalStore from "@/lib/store/modal-store";

const BlogViewpage = () => {
  const { openModal, closeModal } = useModalStore();
  return (
    <div className="blog__view__page">
      <div className="blog__container">
        {/* Main Content */}
        <div className="blog__content">
          {/* Post Title and Actions */}
          <div className="blog__header">
            <h1 className="blog__title">
              The Transformative Impact of Artificial Intelligence in Healthcare
            </h1>
            <div className="blog__actions">
              <button className="action__btn edit">
                <Edit size={16} />
              </button>
              <button
                className="action__btn delete"
                onClick={() => {
                  openModal("delete");
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Post Description */}
          <div className="blog__description">
            <p>
              Explore how artificial intelligence is revolutionizing healthcare
              through advanced diagnostics, personalized treatment plans, and
              improved patient outcomes. This comprehensive guide covers the
              latest AI applications in medical imaging, telemedicine, and
              predictive analytics.
            </p>
          </div>

          {/* Tags */}
          <div className="blog__tags">
            <div className="tag">
              <Heart size={16} />
              react
            </div>
            <div className="tag">
              <Eye size={16} />
              frontend
            </div>
            <div className="tag">
              <ArrowUpRight size={16} />
              Backend
            </div>
          </div>

          {/* Blog Text */}
          <div className="blog__text">
            <p>
              Artificial Intelligence (AI) has emerged as a transformative force
              in the healthcare industry, reshaping patient care, diagnostics,
              and research. In this blog post, we explore the profound impact of
              AI in healthcare, from revolutionizing diagnostic accuracy to
              enhancing patient outcomes.
            </p>

            <p>
              Artificial Intelligence (AI) has permeated virtually every aspect
              of our lives, and healthcare is no exception. The integration of
              AI in healthcare is ushering in a new era of medical practice,
              where machines complement the capabilities of healthcare
              professionals, ultimately improving patient outcomes and the
              efficiency of the healthcare system. In this blog post, we will
              delve into the diverse applications of AI in healthcare, from
              diagnostic imaging to personalized treatment plans, and address
              the ethical considerations surrounding this revolutionary
              technology.
            </p>

            <p>
              Artificial Intelligence (AI) has permeated virtually every aspect
              of our lives, and healthcare is no exception. The integration of
              AI in healthcare is ushering in a new era of medical practice,
              where machines complement the capabilities of healthcare
              professionals, ultimately improving patient outcomes and the
              efficiency of the healthcare system. In this blog post, we will
              delve into the diverse applications of AI in healthcare, from
              diagnostic imaging to personalized treatment plans, and address
              the ethical considerations surrounding this revolutionary
              technology.
            </p>

            <p>
              One of the most prominent applications of AI in healthcare is in
              diagnostic imaging. AI algorithms have demonstrated remarkable
              proficiency in interpreting medical images such as X-rays, MRIs,
              and CT scans. They can identify anomalies and deviations that
              might be overlooked by the human eye. This is particularly
              valuable in early disease detection. For instance, AI can aid
              radiologists in detecting minute irregularities in mammograms or
              identifying critical findings in chest X-rays, potentially
              indicative of life-threatening conditions.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="blog__sidebar">
          {/* Metadata */}
          <div className="metadata">
            <div className="metadata__row">
              <div className="metadata__item">Publication Date</div>
              <div className="metadata__item">Category</div>
            </div>
            <div className="metadata__row">
              <div className="metadata__item">Reading Time</div>
              <div className="metadata__item">Author Name</div>
            </div>
          </div>

          {/* Read More Section */}
          <div className="read__more">
            <h3 className="read__more__title">Read more like this</h3>
            <div className="read__more__list">
              <ul>
                <li>Introduction to ai</li>
                <li>AI in Diagnostic Imaging</li>
                <li>Predictive Analytics and Disease Prevention</li>
                <li>AI in Telemedicine</li>
                <li>Ethical Considerations</li>
                <li>Conclusion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogViewpage;
