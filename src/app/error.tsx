"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <div className="blog_notfound">
      <h1>An error occured</h1>
      <Link href="/">return to homepage</Link>
    </div>
  );
}
