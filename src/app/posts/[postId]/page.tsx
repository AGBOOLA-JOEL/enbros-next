import BlogViewpage from "@/components/general/blog-viewpage";
import { BlogPost } from "@/types/posts.type";
import { notFound } from "next/navigation";

export const revalidate = false;

async function getPost(postId: string): Promise<BlogPost | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/posts/${postId}`,
    {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    console.error(`Failed to fetch post ${postId}`);
    return null;
  }

  return res.json();
}

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = await getPost(params.postId);

  if (!post) {
    notFound(); // Show 404 page if no post found
  }

  return (
    <div className="blog__view">
      <div className="blog__view__display">
        <BlogViewpage data={post} />
      </div>
    </div>
  );
}
