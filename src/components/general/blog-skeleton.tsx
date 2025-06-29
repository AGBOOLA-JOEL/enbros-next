import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const BlogSkeleton = () => {
  return (
    <div className="blog__skeleton">
      <Stack spacing={0.5} className="blog__skeleton__stack">
        <div className="blog__skeleton__left">
          <Skeleton
            variant="rounded"
            height={40}
            className="blog__skeleton__cards"
          />
          <Skeleton
            variant="rounded"
            height={20}
            className="blog__skeleton__cards"
          />
          <Skeleton
            variant="rounded"
            height={410}
            className="blog__skeleton__cards"
          />
        </div>
        <div className="blog__skeleton__right">
          <Skeleton
            variant="rounded"
            height={170}
            className="blog__skeleton__cards"
          />
        </div>
      </Stack>
    </div>
  );
};

export default BlogSkeleton;
