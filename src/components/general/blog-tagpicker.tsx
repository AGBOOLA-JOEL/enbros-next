"use client";
import { useState } from "react";
import type { BlogTagProp } from "@/types/general.type";
import { X } from "lucide-react";
import { useGenselectors } from "@/lib/store/general-store";

const BlogTagpicker = ({ title, tag, setTag }: BlogTagProp) => {
  const openToast = useGenselectors.use.openToast();
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    if (tag.includes(trimmed)) {
      openToast("Tag already exists.", 3000);
      return;
    }

    if (tag.length >= 5) {
      openToast("You can only add up to 3 tags.", 3000);
      return;
    }

    setTag([...tag, trimmed]);
    setInputValue("");
  };

  const handleRemoveTag = (removeTag: string) => {
    setTag(tag.filter((t) => t !== removeTag));
  };

  return (
    <div className="blog_tags">
      <h1 className="blog_tags__title">*{title}</h1>

      <div className="blog_tags__list">
        {tag.map((t) => (
          <div key={t} className="blog_tags__item">
            <span className="blog_tags__text">{t}</span>
            <button
              onClick={() => handleRemoveTag(t)}
              type="button"
              className="blog_tags__remove"
            >
              <X />
            </button>
          </div>
        ))}
      </div>

      <div className="blog_tags__input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a tag"
          className="blog_tags__input"
        />
        <button onClick={handleAddTag} type="button" className="blog_tags__add">
          Add
        </button>
      </div>
    </div>
  );
};

export default BlogTagpicker;
