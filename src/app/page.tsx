import HomepageStatic from "@/components/static/static-homepage";
import { BlogPost } from "@/types/posts.type";

export const revalidate = false; // control revalidation manually

async function getPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/posts`, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    console.error("Failed to fetch posts");
    return [];
  }

  return res.json();
}

export default async function Homepage() {
  const posts = await getPosts();
  return <HomepageStatic posts={posts} />;
}
