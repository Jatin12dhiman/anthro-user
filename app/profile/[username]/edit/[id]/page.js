import { cookies } from "next/headers";
import BlogEditor from "@/components/blog-editor";
import { notFound } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

async function fetchBlogDraft(id, cookieHeader) {
  try {
    const res = await fetch(`${API}/blogs/${encodeURIComponent(id)}`, {
      cache: "no-store",
      headers: { cookie: cookieHeader },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.blog || null;
  } catch {
    return null;
  }
}

export const metadata = {
  title: "Edit Blog — Anthroplanet",
};

export default async function EditBlogPage({ params }) {
  const { id } = await params;
  const cookieHeader = (await cookies()).toString();
  const blog = await fetchBlogDraft(id, cookieHeader);

  if (!blog) {
    notFound();
  }

  return <BlogEditor initialBlog={blog} />;
}
