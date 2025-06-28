"use client";
import React from "react";
import BlogLogo from "./blog-logo";
import BlogBtn from "./blog-btn";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BlogNav = () => {
  const router = useRouter();
  return (
    <div className="blog__nav">
      <BlogLogo />
      <div className="blog__nav__desktop">
        <BlogBtn
          variant="light"
          type="button"
          onClick={() => {
            router.push("/login");
          }}
          name="Login"
        />
        <BlogBtn
          variant="primary"
          type="button"
          onClick={() => {
            router.push("/register");
          }}
          name="Sign Up"
        />

        <BlogBtn
          variant="outline"
          type="button"
          onClick={() => {}}
          name="Sign Out"
        />
      </div>
      <span className="blog__nav__ham">
        <AlignJustify />
      </span>

      <div className="blog__nav__dropdown">
        <button>Sign out</button>
      </div>

      <div className="blog__nav__mobile">
        <Link href="/login">SIGN IN</Link>
        <Link href="/register">JOIN</Link>
      </div>
    </div>
  );
};

export default BlogNav;
