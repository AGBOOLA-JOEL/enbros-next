import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogLogo = () => {
  return (
    <Link href={"/"} className="blog__logo">
      <Image
        width={0}
        height={0}
        src={"/assets/BlogLogo.svg"}
        alt={"logo"}
        priority
      />

      <span>Dev-Blog</span>
    </Link>
  );
};

export default BlogLogo;
