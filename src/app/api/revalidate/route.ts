import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { secret, path } = body;

    if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!path) {
      return new Response("Path is required", { status: 400 });
    }

    revalidatePath(path);

    return new Response(`Revalidated ${path}`, { status: 200 });
  } catch (error) {
    console.error("Error revalidating", error);
    return new Response("Error revalidating", { status: 500 });
  }
}
