export async function getSinglePost(postId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/posts/${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

        next: { revalidate: 0 }, // disables built-in cache
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch post ${postId}`, res.status);
      return null;
    }

    const post = await res.json();
    return post;
  } catch (err) {
    console.error(`Error fetching post ${postId}`, err);
    return null;
  }
}
