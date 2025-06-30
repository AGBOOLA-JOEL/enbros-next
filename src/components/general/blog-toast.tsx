"use client";
import { useGenselectors } from "@/lib/store/general-store";
import { X } from "lucide-react";
import { Info } from "lucide-react";

const BlogToast = () => {
  const closeToast = useGenselectors.use.closeToast();
  const toast = useGenselectors.use.toast();

  return (
    <>
      {toast && (
        <div className="blog__toast">
          <Info />

          <p>{toast}</p>

          <X
            onClick={() => {
              closeToast();
            }}
          />
        </div>
      )}
    </>
  );
};

export default BlogToast;
