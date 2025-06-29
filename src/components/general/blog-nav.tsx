"use client";
import React from "react";
import BlogLogo from "./blog-logo";
import BlogBtn from "./blog-btn";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import useModalStore from "@/lib/store/modal-store";
import { useGenselectors } from "@/lib/store/general-store";

const BlogNav = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { openModal } = useModalStore();
  const toggle = useGenselectors.use.toggle();
  const toggleState = useGenselectors.use.toggleState();

  const handleLogout = () => {
    openModal("logout");
  };

  const handleHamburgerClick = () => {
    toggleState();
  };

  return (
    <div className="blog__nav">
      <BlogLogo />
      <div className="blog__nav__desktop">
        {isAuthenticated ? (
          <>
            <BlogBtn
              variant="primary"
              type="button"
              onClick={() => {
                router.push("/create-post");
              }}
              name="Create Post"
            />
            <BlogBtn
              variant="outline"
              type="button"
              onClick={handleLogout}
              name="Sign Out"
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

      {isAuthenticated && toggle && (
        <div className="blog__nav__dropdown">
          <button onClick={handleLogout}>Sign out</button>
          <button
            onClick={() => {
              router.push("/create-post");
              toggleState();
            }}
          >
            Create Post
          </button>
        </div>
      )}

      {isAuthenticated ? (
        <span className="blog__nav__ham" onClick={handleHamburgerClick}>
          <AlignJustify />
        </span>
      ) : (
        <div className="blog__nav__mobile">
          <Link href="/login">SIGN IN</Link>
          <Link href="/register">JOIN</Link>
        </div>
      )}
    </div>
  );
};

export default BlogNav;
