// import BlogViewpage from "@/components/general/blog-viewpage";
// import { BlogPost } from "@/types/posts.type";
// import { notFound } from "next/navigation";

// export const revalidate = false;

// type PageProps = {
//   params: {
//     postId: string;
//   };
// };

// async function getPost(postId: string): Promise<BlogPost | null> {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/posts/${postId}`,
//     {
//       headers: { "Content-Type": "application/json" },
//       next: { revalidate: 0 },
//     }
//   );

//   if (!res.ok) {
//     console.error(`Failed to fetch post ${postId}`);
//     return null;
//   }

//   return res.json();
// }

// export default async function PostPage({ params }: PageProps) {
//   const post = await getPost(params.postId);

//   if (!post) {
//     notFound();
//   }

//   return (
//     <div className="blog__view">
//       <div className="blog__view__display">
//         <BlogViewpage data={post} />
//       </div>
//     </div>
//   );
// }
import BlogViewpage from "@/components/general/blog-viewpage";
import { BlogPost } from "@/types/posts.type";
import { notFound } from "next/navigation";

export const revalidate = false;

type PageProps = {
  params: { postId: string };
};

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

export default async function PostPage({ params }: PageProps) {
  const post = await getPost(params.postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="blog__view">
      <div className="blog__view__display">
        <BlogViewpage data={post} />
      </div>
    </div>
  );
}
