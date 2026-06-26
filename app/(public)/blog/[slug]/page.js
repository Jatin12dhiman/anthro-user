import { notFound } from "next/navigation";
import BlogReader from "@/components/blog-reader";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

async function fetchBlog(slug) {
  try {
    const res = await fetch(`${API}/blogs/${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.blog || null;
  } catch {
    return null;
  }
}

async function fetchRelated(category, slug) {
  try {
    const res = await fetch(
      `${API}/blogs?category=${encodeURIComponent(category)}&limit=4`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.blogs || []).filter((b) => b.slug !== slug).slice(0, 3);
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await fetchBlog(slug);
  if (!blog) return { title: "Blog not found — Anthroplanet" };
  return {
    title: `${blog.title} — Anthroplanet Blog`,
    description: blog.seo?.meta_description || blog.excerpt || blog.title,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || "",
      images: blog.seo?.og_image || blog.image ? [blog.seo?.og_image || blog.image] : [],
    },
  };
}

export default async function BlogSlugPage({ params }) {
  const { slug } = await params;
  const blog = await fetchBlog(slug);
  if (!blog) notFound();

  const related = await fetchRelated(blog.category, blog.slug);
  return <BlogReader post={blog} related={related} />;
}
