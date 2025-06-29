"use client";
import React from "react";
import { Edit, Trash2 } from "lucide-react";
import useModalStore from "@/lib/store/modal-store";
import { BlogPost } from "@/types/posts.type";
import { Layers } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { usePost } from "@/hooks/usePost";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/actions/format-date";
const BlogViewpage = ({ data }: { data: BlogPost }) => {
  const router = useRouter();
  const { openModal } = useModalStore();
  const { user } = useAuth();
  const blogdata = data;
  const showOption = user?.id === blogdata.authorId;
  const { posts } = usePost();
  const handleEdit = () => {
    router.push(`/posts/edit/${blogdata.id}`);
  };
  return (
    <div className="blog__view__page">
      <div className="blog__container">
        {/* Main Content */}
        <div className="blog__content">
          {/* Post Title and Actions */}
          <div className="blog__header">
            <h1 className="blog__title">{blogdata.title}</h1>

            <div className="blog__actions">
              {showOption && (
                <>
                  <button className="action__btn edit" onClick={handleEdit}>
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
                </>
              )}
            </div>
          </div>

          {/* Post Description */}
          <div className="blog__description">
            <p>{blogdata.desc}</p>
          </div>

          {/* Tags */}
          <div className="blog__tags">
            {blogdata.tags.map((data) => {
              return (
                <div className="tag" key={data}>
                  <Layers size={16} />
                  {data}
                </div>
              );
            })}
          </div>

          {/* Blog Text */}
          <div className="blog__text">
            <p>{blogdata.content}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="blog__sidebar">
          {/* Metadata */}
          <div className="metadata">
            <div className="metadata__row">
              <div className="metadata__item">
                Posted : {formatDate(blogdata.createdAt)}
              </div>
              <div className="metadata__item">
                Updated :{formatDate(blogdata.updatedAt)}
              </div>
            </div>
            <div className="metadata__row">
              <div className="metadata__item">Reading Time : 10min</div>
              <div className="metadata__item">
                Author :{blogdata.author.username}
              </div>
            </div>
          </div>

          {/* Read More Section */}
          <div className="read__more">
            <h3 className="read__more__title">Read more like this</h3>
            <div className="read__more__list">
              <ul>
                {posts.slice(0, 4).map((data: BlogPost) => {
                  return (
                    <li key={data.id}>
                      <Link href={`/posts/${data.id}`}>{data.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogViewpage;
