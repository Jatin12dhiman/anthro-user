"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import api from "@/lib/api";
import { useAuth } from "@/context/auth-context";

const CATEGORIES = ["Research", "Opinion", "Tutorial", "Review", "Case Study"];
const CITATION_STYLES = ["APA 7th", "MLA 9th", "IEEE", "Chicago", "Harvard"];

import TiptapImage from "@tiptap/extension-image";

/* ─── Toolbar ────────────────────────────────────────────────────────────────── */

const MenuBar = ({ editor }) => {
  if (!editor) return null;
  const btn = (label, action, active) => (
    <button
      type="button"
      onClick={action}
      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
        active
          ? "bg-lagoon-900 text-frost-50"
          : "text-lagoon/60 hover:bg-lagoon/8 hover:text-lagoon-900"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap gap-1 border-b border-[#eee] bg-[#fafaf9] p-2">
      {btn("Bold", () => editor.chain().focus().toggleBold().run(), editor.isActive("bold"))}
      {btn("Italic", () => editor.chain().focus().toggleItalic().run(), editor.isActive("italic"))}
      {btn("H2", () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive("heading", { level: 2 }))}
      {btn("H3", () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive("heading", { level: 3 }))}
      {btn("Bullet List", () => editor.chain().focus().toggleBulletList().run(), editor.isActive("bulletList"))}
      {btn("Numbered List", () => editor.chain().focus().toggleOrderedList().run(), editor.isActive("orderedList"))}
      {btn("Quote", () => editor.chain().focus().toggleBlockquote().run(), editor.isActive("blockquote"))}
      <div className="h-5 w-px bg-[#e5e5e5] self-center mx-1" />
      {btn("Undo", () => editor.chain().focus().undo().run(), false)}
      {btn("Redo", () => editor.chain().focus().redo().run(), false)}
    </div>
  );
};

/* ─── Left sidebar icons ─────────────────────────────────────────────────────── */

const IcoDashboard = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const IcoFile = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>
);
const IcoTag = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.6 11.4 12.4 3.2A1.5 1.5 0 0 0 11.3 3H5a2 2 0 0 0-2 2v6.3a1.5 1.5 0 0 0 .4 1L11.6 20.6a2 2 0 0 0 2.8 0l6.2-6.2a2 2 0 0 0 0-2.8z" />
    <circle cx="7.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const IcoLayers = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);
const IcoBookmark = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);
const IcoChevron = ({ open }) => (
  <svg className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-90" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/* ─── Main Component ─────────────────────────────────────────────────────────── */

export default function BlogEditor({ initialBlog = null }) {
  const router = useRouter();
  const { user } = useAuth();

  const [blogId, setBlogId] = useState(initialBlog?._id || initialBlog?.id || null);
  const [form, setForm] = useState({
    title: initialBlog?.title || "",
    excerpt: initialBlog?.excerpt || "",
    category: initialBlog?.category || "Research",
    tags: initialBlog?.tags ? initialBlog.tags.join(", ") : "",
    featured_image: initialBlog?.featured_image || initialBlog?.image || "",
    slug: initialBlog?.slug || "",
    citation_style: initialBlog?.citation_style || "APA 7th",
    meta_title: initialBlog?.seo?.meta_title || "",
    meta_description: initialBlog?.seo?.meta_description || "",
  });

  const [activeTab, setActiveTab] = useState("details");
  const [postsOpen, setPostsOpen] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState("");
  const [saveStatus, setSaveStatus] = useState("idle");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [slashMenu, setSlashMenu] = useState({
    isOpen: false,
    x: 0,
    y: 0,
    query: "",
    triggerPos: null,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slashMenuRef = useRef(slashMenu);
  const selectedIndexRef = useRef(selectedIndex);
  useEffect(() => { slashMenuRef.current = slashMenu; }, [slashMenu]);
  useEffect(() => { selectedIndexRef.current = selectedIndex; }, [selectedIndex]);

  const formRef = useRef(form);
  const blogIdRef = useRef(blogId);
  useEffect(() => { formRef.current = form; }, [form]);
  useEffect(() => { blogIdRef.current = blogId; }, [blogId]);

  const uploadAndInsertImage = async (file) => {
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("kind", "image");
      fd.append("folder", "blogs");
      fd.append("visibility", "public");

      const res = await api.post("/upload", fd);
      if (res?.url) {
        editorRef.current?.chain().focus().setImage({ src: res.url, alt: file.name }).run();
      }
    } catch (err) {
      console.error("Inline image upload failed:", err);
      alert("Image upload failed: " + (err.message || "Unknown error"));
    }
  };

  const handleEditorStateChange = (editorInstance) => {
    const { selection } = editorInstance.state;
    const $pos = editorInstance.state.doc.resolve(selection.from);
    const text = $pos.parent.textContent;
    
    const parentOffset = $pos.parentOffset;
    const textBeforeCursor = text.slice(0, parentOffset);
    
    const lastSlashIndex = textBeforeCursor.lastIndexOf("/");
    if (lastSlashIndex !== -1) {
      const query = textBeforeCursor.slice(lastSlashIndex + 1);
      const charBeforeSlash = lastSlashIndex > 0 ? textBeforeCursor[lastSlashIndex - 1] : " ";
      
      if ((charBeforeSlash === " " || charBeforeSlash === "\n") && !query.includes(" ")) {
        try {
          const coords = editorInstance.view.coordsAtPos(selection.from - query.length - 1);
          setSlashMenu({
            isOpen: true,
            x: coords.left,
            y: coords.bottom,
            query: query.toLowerCase(),
            triggerPos: selection.from - query.length - 1,
          });
          return;
        } catch (e) {}
      }
    }
    setSlashMenu({ isOpen: false, x: 0, y: 0, query: "", triggerPos: null });
  };

  const SLASH_ITEMS = [
    {
      title: "Heading 2",
      description: "Medium section heading",
      icon: "H2",
      action: (ed, triggerPos) => {
        ed.chain().focus().deleteRange({ from: triggerPos, to: ed.state.selection.from }).toggleHeading({ level: 2 }).run();
      }
    },
    {
      title: "Heading 3",
      description: "Small section heading",
      icon: "H3",
      action: (ed, triggerPos) => {
        ed.chain().focus().deleteRange({ from: triggerPos, to: ed.state.selection.from }).toggleHeading({ level: 3 }).run();
      }
    },
    {
      title: "Bullet List",
      description: "Create a simple bulleted list",
      icon: "•",
      action: (ed, triggerPos) => {
        ed.chain().focus().deleteRange({ from: triggerPos, to: ed.state.selection.from }).toggleBulletList().run();
      }
    },
    {
      title: "Numbered List",
      description: "Create a list with numbering",
      icon: "1.",
      action: (ed, triggerPos) => {
        ed.chain().focus().deleteRange({ from: triggerPos, to: ed.state.selection.from }).toggleOrderedList().run();
      }
    },
    {
      title: "Quote block",
      description: "Capture a quote",
      icon: "“",
      action: (ed, triggerPos) => {
        ed.chain().focus().deleteRange({ from: triggerPos, to: ed.state.selection.from }).toggleBlockquote().run();
      }
    },
    {
      title: "Code block",
      description: "Write code snippets",
      icon: "</>",
      action: (ed, triggerPos) => {
        ed.chain().focus().deleteRange({ from: triggerPos, to: ed.state.selection.from }).toggleCodeBlock().run();
      }
    },
    {
      title: "Divider",
      description: "Insert a horizontal rule divider",
      icon: "―",
      action: (ed, triggerPos) => {
        ed.chain().focus().deleteRange({ from: triggerPos, to: ed.state.selection.from }).setHorizontalRule().run();
      }
    },
    {
      title: "Inline Image",
      description: "Insert image via device upload",
      icon: "🖼",
      action: (ed, triggerPos) => {
        ed.chain().focus().deleteRange({ from: triggerPos, to: ed.state.selection.from }).run();
        const fileInput = document.getElementById("editor-inline-image-upload");
        if (fileInput) fileInput.click();
      }
    }
  ];

  const handleItemClick = (item) => {
    const menu = slashMenuRef.current;
    if (menu.isOpen && menu.triggerPos !== null) {
      item.action(editorRef.current, menu.triggerPos);
      setSlashMenu({ isOpen: false, x: 0, y: 0, query: "", triggerPos: null });
    }
  };

  const editor = useEditor({
    extensions: [StarterKit, TiptapImage],
    content: initialBlog?.content || "<p>Write your content here</p>",
    onUpdate: ({ editor: ed }) => {
      handleEditorStateChange(ed);
    },
    onSelectionUpdate: ({ editor: ed }) => {
      handleEditorStateChange(ed);
    },
    editorProps: {
      attributes: {
        class: "prose-custom focus:outline-none min-h-[420px] px-6 py-5 bg-white w-full",
      },
      handleKeyDown: (view, event) => {
        const menu = slashMenuRef.current;
        if (!menu.isOpen) return false;

        const filtered = SLASH_ITEMS.filter((item) =>
          item.title.toLowerCase().includes(menu.query) ||
          item.description.toLowerCase().includes(menu.query)
        );

        if (event.key === "ArrowDown") {
          event.preventDefault();
          setSelectedIndex((idx) => (idx + 1) % Math.max(1, filtered.length));
          return true;
        }
        if (event.key === "ArrowUp") {
          event.preventDefault();
          setSelectedIndex((idx) => (idx - 1 + filtered.length) % Math.max(1, filtered.length));
          return true;
        }
        if (event.key === "Enter") {
          event.preventDefault();
          const selected = filtered[selectedIndexRef.current];
          if (selected) {
            selected.action(editorRef.current, menu.triggerPos);
          }
          setSlashMenu({ isOpen: false, x: 0, y: 0, query: "", triggerPos: null });
          return true;
        }
        if (event.key === "Escape") {
          event.preventDefault();
          setSlashMenu({ isOpen: false, x: 0, y: 0, query: "", triggerPos: null });
          return true;
        }
        return false;
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith("image/")) {
            event.preventDefault();
            uploadAndInsertImage(file);
            return true;
          }
        }
        return false;
      },
      handlePaste: (view, event, slice) => {
        if (event.clipboardData && event.clipboardData.files && event.clipboardData.files[0]) {
          const file = event.clipboardData.files[0];
          if (file.type.startsWith("image/")) {
            event.preventDefault();
            uploadAndInsertImage(file);
            return true;
          }
        }
        return false;
      }
    },
  });

  const editorRef = useRef(editor);
  useEffect(() => { editorRef.current = editor; }, [editor]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [slashMenu.query]);


  const profileHref = user?.profile_username ? `/profile/${user.profile_username}` : "/";
  const dashboardHref = user?.profile_username ? `/profile/${user.profile_username}/blogs` : "/profile/me/blogs";

  /* ── Image upload ──────────────────────────────────────────────────────────── */
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    setImageError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("kind", "image");
      fd.append("folder", "blogs");
      fd.append("visibility", "public");
      const res = await api.post("/upload", fd);
      setForm((f) => ({ ...f, featured_image: res.url }));
    } catch (err) {
      setImageError(err.message || "Upload failed.");
    } finally {
      setUploadingImage(false);
    }
  };

  /* ── Draft save ────────────────────────────────────────────────────────────── */
  const saveDraft = async (silent = true) => {
    const f = formRef.current;
    const ed = editorRef.current;
    if (!f.title || f.title.trim().length < 3) {
      if (!silent) setError("Title must be at least 3 characters.");
      return;
    }
    if (!silent) { setError(""); setSaveStatus("saving"); }
    try {
      const payload = {
        title: f.title,
        category: f.category,
        tags: f.tags ? f.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        featured_image: f.featured_image,
        content: ed ? ed.getHTML() : "",
        slug: f.slug || f.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        seo: { meta_title: f.meta_title, meta_description: f.meta_description },
        // Only send excerpt if user actually typed something; otherwise backend derives it from content
        ...(f.excerpt && f.excerpt.trim() ? { excerpt: f.excerpt.trim() } : {}),
      };
      if (blogIdRef.current) {
        await api.patch(`/blogs/${blogIdRef.current}`, payload);
      } else {
        const res = await api.post("/blogs", payload);
        const newId = res.blog?._id || res.blog?.id;
        setBlogId(newId);
        const un = user?.profile_username || "me";
        window.history.replaceState(null, "", `/profile/${un}/edit/${newId}`);
      }
      setSaveStatus("saved");
      if (!silent) {
        router.push(dashboardHref);
        router.refresh();
      }
    } catch (err) {
      console.error("Save failed:", err);
      setSaveStatus("error");
      if (!silent) setError(err.message || "Save failed.");
    }
  };

  useEffect(() => {
    const id = setInterval(() => saveDraft(true), 30000);
    return () => clearInterval(id);
  }, []);

  /* ── Submit ────────────────────────────────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSubmitting(true);
    try {
      await saveDraft(false);
      if (!blogIdRef.current) throw new Error("Draft must be saved first.");
      await api.post(`/blogs/${blogIdRef.current}/submit`);
      const un = user?.profile_username || "me";
      router.push(`/profile/${un}/blogs`);
      router.refresh();
    } catch (err) {
      setError(err.message || "Submit failed.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ════════════════════════════════════════════════════════════════════════════ */

  return (
    <div className="flex min-h-screen bg-[#f7f7f5]">

      {/* ──────────────── LEFT SIDEBAR ──────────────── */}
      <aside className="hidden lg:flex w-[220px] shrink-0 flex-col border-r border-[#e8e5de] bg-white">
        {/* Brand */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-[#e8e5de]">
          <div className="h-7 w-7 rounded-full bg-marigold flex items-center justify-center">
            <span className="text-[9px] font-bold text-lagoon-900">A</span>
          </div>
          <span className="font-display text-sm font-semibold tracking-tight text-lagoon-900">Anthroplanet</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5 text-[13px]">
          {/* Dashboard */}
          <Link href={dashboardHref} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-lagoon/70 hover:bg-lagoon/5 hover:text-lagoon-900 transition-colors">
            <IcoDashboard /> Dashboard
          </Link>

          {/* Content Section */}
          <p className="px-3 pt-4 pb-1 text-[10px] font-bold uppercase tracking-widest text-lagoon/35">Content</p>

          {/* Posts (expandable) */}
          <button type="button" onClick={() => setPostsOpen((v) => !v)} className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-lagoon/70 hover:bg-lagoon/5 hover:text-lagoon-900 transition-colors cursor-pointer">
            <span className="flex items-center gap-2.5"><IcoFile /> Posts</span>
            <IcoChevron open={postsOpen} />
          </button>
          {postsOpen && (
            <div className="ml-7 space-y-0.5 border-l border-[#e8e5de] pl-3">
              {[
                ["Published", null],
                ["Drafts", null],
                ["Under Review", null],
                ["Pending", null],
                ["Changes Required", null],
                ["Featured", null],
              ].map(([label, count]) => (
                <Link key={label} href={dashboardHref} className="flex items-center justify-between rounded-md px-2 py-1.5 text-xs text-lagoon/55 hover:bg-lagoon/5 hover:text-lagoon-900 transition-colors">
                  {label}
                  {count && <span className="text-[10px] font-semibold text-moss">{count}</span>}
                </Link>
              ))}
            </div>
          )}

          {/* Categories */}
          <Link href={dashboardHref} className="flex items-center justify-between gap-2.5 rounded-lg px-3 py-2 text-lagoon/70 hover:bg-lagoon/5 hover:text-lagoon-900 transition-colors">
            <span className="flex items-center gap-2.5"><IcoLayers /> Categories</span>
          </Link>

          {/* Tags */}
          <Link href={dashboardHref} className="flex items-center justify-between gap-2.5 rounded-lg px-3 py-2 text-lagoon/70 hover:bg-lagoon/5 hover:text-lagoon-900 transition-colors">
            <span className="flex items-center gap-2.5"><IcoTag /> Tags</span>
          </Link>

          {/* Bookmarks */}
          <Link href={dashboardHref} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-lagoon/70 hover:bg-lagoon/5 hover:text-lagoon-900 transition-colors">
            <IcoBookmark /> Saved Drafts
          </Link>

          <div className="border-t border-[#e8e5de] mx-1 my-3" />

          <Link href="/about" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-lagoon/70 hover:bg-lagoon/5 hover:text-lagoon-900 transition-colors">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
            About Us
          </Link>

          <Link href="/blog" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-lagoon/70 hover:bg-lagoon/5 hover:text-lagoon-900 transition-colors">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z" /><path d="M12 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z" /></svg>
            Browse Blogs
          </Link>
        </nav>
      </aside>

      {/* ──────────────── MIDDLE EDITOR CANVAS ──────────────── */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-6 sm:px-10 py-8">

          {/* Title */}
          <input
            type="text"
            value={form.title}
            onChange={(e) => {
              const val = e.target.value;
              setForm((f) => {
                const oldSlug = f.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                const newSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                return { ...f, title: val, slug: f.slug === oldSlug ? newSlug : f.slug };
              });
            }}
            placeholder="Title"
            className="w-full font-display text-4xl font-semibold text-[#1a1a2e] border-none outline-none focus:ring-0 p-0 placeholder:text-[#d4d4d4] tracking-tight bg-transparent border-b border-[#eee] pb-3"
            required
          />

          {/* Description */}
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            placeholder="Description"
            rows={2}
            maxLength={400}
            className="w-full text-base text-[#888] font-light border-none outline-none focus:ring-0 p-0 placeholder:text-[#d4d4d4] resize-none leading-relaxed mt-4 bg-transparent"
          />

          {/* Author row */}
          <div className="flex items-center gap-3 mt-5 pb-5 border-b border-[#f0ede6]">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-moss to-lagoon flex items-center justify-center text-xs font-bold text-white shrink-0 ring-2 ring-white shadow-sm">
              {user?.name ? user.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() : "JD"}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1a1a2e] leading-none">{user?.name || "Author"}</p>
              <p className="text-[11px] text-[#999] mt-1">
                {initialBlog ? "Published" : "Draft"} · {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
            {/* Status pill */}
            <div className="ml-auto">
              {saveStatus === "saving" && <span className="text-[11px] font-semibold text-amber-500 animate-pulse">Saving…</span>}
              {saveStatus === "saved" && <span className="text-[11px] font-semibold text-emerald-500">✓ Saved</span>}
              {saveStatus === "error" && <span className="text-[11px] font-semibold text-rose-500">⚠ Error</span>}
            </div>
          </div>

          {/* Cover image upload */}
          <div className="mt-6">
            {form.featured_image ? (
              <div className="relative aspect-[2/1] w-full rounded-xl overflow-hidden border border-[#e8e5de] bg-[#fafaf9] group">
                <img src={form.featured_image} alt="Cover" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setForm((f) => ({ ...f, featured_image: "" }))} className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-white text-xs font-semibold backdrop-blur-sm hover:bg-black/80 cursor-pointer">
                  Remove
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-[2/1] w-full rounded-xl border border-dashed border-[#d5d0c5] cursor-pointer bg-white hover:bg-[#fafaf9] transition-colors group">
                {uploadingImage ? (
                  <span className="flex items-center gap-2 text-xs text-[#999]">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-moss border-t-transparent" />
                    Uploading…
                  </span>
                ) : (
                  <>
                    <svg className="h-8 w-8 text-[#ccc] mb-2 group-hover:text-moss transition-colors" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="text-xs font-medium text-[#888]">Upload a High Resolution Image</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} className="hidden" />
              </label>
            )}
            {imageError && <p className="text-xs text-rose-500 mt-1.5">{imageError}</p>}
          </div>

          {/* TipTap editor */}
          <div className="mt-6 rounded-xl border border-[#e8e5de] bg-white overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.02)] relative">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />

            {/* Hidden input for inline image uploading */}
            <input
              id="editor-inline-image-upload"
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  await uploadAndInsertImage(file);
                }
                e.target.value = ""; // Reset
              }}
              className="hidden"
            />
          </div>

          {/* Notion-style Slash Command Menu */}
          {slashMenu.isOpen && (
            <div
              className="fixed bg-white/95 backdrop-blur-md border border-[#e8e5de] rounded-xl shadow-xl w-64 overflow-y-auto max-h-80 flex flex-col p-1.5 transition-all duration-100 ease-out"
              style={{
                left: `${slashMenu.x}px`,
                top: `${slashMenu.y + 24}px`,
                zIndex: 9999,
              }}
            >
              {SLASH_ITEMS.filter((item) =>
                item.title.toLowerCase().includes(slashMenu.query) ||
                item.description.toLowerCase().includes(slashMenu.query)
              ).map((item, idx) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    idx === selectedIndex
                      ? "bg-lagoon/5 text-lagoon-900"
                      : "text-lagoon/75 hover:bg-lagoon/5"
                  }`}
                >
                  <div className="h-7 w-7 rounded-md bg-[#fafaf9] border border-[#e8e5de] flex items-center justify-center text-xs font-bold text-lagoon-700 shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold truncate leading-none mb-0.5">{item.title}</p>
                    <p className="text-[10px] text-[#888] truncate leading-none">{item.description}</p>
                  </div>
                </button>
              ))}
              {SLASH_ITEMS.filter((item) =>
                item.title.toLowerCase().includes(slashMenu.query) ||
                item.description.toLowerCase().includes(slashMenu.query)
              ).length === 0 && (
                <div className="px-3 py-4 text-center text-xs text-[#999]">
                  No matching commands
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ──────────────── RIGHT SIDEBAR ──────────────── */}
      <aside className="hidden xl:flex w-[280px] shrink-0 flex-col border-l border-[#e8e5de] bg-white overflow-y-auto">
        {/* Tabs */}
        <div className="flex border-b border-[#e8e5de]">
          {["details", "seo"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3.5 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === tab
                  ? "text-lagoon-900 border-b-2 border-lagoon-900 bg-white"
                  : "text-[#aaa] hover:text-lagoon-900 bg-[#fafaf9]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-5 space-y-5 text-[13px]">
          {activeTab === "details" && (
            <>
              {/* Slug */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888] mb-1.5">Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") }))}
                  placeholder="Permalink"
                  className="w-full rounded-md border border-[#e0dcd4] bg-white px-3 py-2 text-sm text-[#333] placeholder:text-[#ccc] outline-none focus:border-moss transition-colors"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888] mb-1.5">Author</label>
                <div className="w-full rounded-md border border-[#e0dcd4] bg-[#f9f9f7] px-3 py-2 text-sm text-[#555]">
                  {user?.name || "Loading…"}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888] mb-1.5">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full rounded-md border border-[#e0dcd4] bg-white px-3 py-2 text-sm text-[#333] outline-none focus:border-moss cursor-pointer"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Tags */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#888]">Tags</label>
                  <span className="text-[10px] font-bold text-moss cursor-pointer hover:underline">+ ADD TAG</span>
                </div>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                  placeholder="Search and Select Tags…"
                  className="w-full rounded-md border border-[#e0dcd4] bg-white px-3 py-2 text-sm text-[#333] placeholder:text-[#ccc] outline-none focus:border-moss transition-colors"
                />
              </div>

              {/* Citation Style */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888] mb-1.5">Citation Style</label>
                <select
                  value={form.citation_style}
                  onChange={(e) => setForm((f) => ({ ...f, citation_style: e.target.value }))}
                  className="w-full rounded-md border border-[#e0dcd4] bg-white px-3 py-2 text-sm text-[#333] outline-none focus:border-moss cursor-pointer"
                >
                  {CITATION_STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Research Field */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888] mb-1.5">Research Field</label>
                <input
                  type="text"
                  placeholder="e.g. Public Health, Climate Science…"
                  className="w-full rounded-md border border-[#e0dcd4] bg-white px-3 py-2 text-sm text-[#333] placeholder:text-[#ccc] outline-none focus:border-moss transition-colors"
                />
              </div>

              {/* Collaboration */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888] mb-1.5">Collaboration</label>
                <input
                  type="text"
                  disabled
                  placeholder="Search and invite co-authors…"
                  className="w-full rounded-md border border-[#e0dcd4] bg-[#f9f9f7] px-3 py-2 text-sm text-[#aaa] outline-none cursor-not-allowed"
                />
              </div>

              {/* Reviewer */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888] mb-1.5">Assign Reviewer</label>
                <select disabled className="w-full rounded-md border border-[#e0dcd4] bg-[#f9f9f7] px-3 py-2 text-sm text-[#aaa] outline-none cursor-not-allowed">
                  <option>Select Reviewer…</option>
                </select>
              </div>
            </>
          )}

          {activeTab === "seo" && (
            <>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888] mb-1.5">Meta Title</label>
                <input
                  type="text"
                  value={form.meta_title}
                  onChange={(e) => setForm((f) => ({ ...f, meta_title: e.target.value }))}
                  placeholder="Override page title…"
                  className="w-full rounded-md border border-[#e0dcd4] bg-white px-3 py-2 text-sm text-[#333] placeholder:text-[#ccc] outline-none focus:border-moss transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888] mb-1.5">Meta Description</label>
                <textarea
                  value={form.meta_description}
                  onChange={(e) => setForm((f) => ({ ...f, meta_description: e.target.value }))}
                  placeholder="Summary for search engines…"
                  rows={4}
                  className="w-full rounded-md border border-[#e0dcd4] bg-white px-3 py-2 text-sm text-[#333] placeholder:text-[#ccc] outline-none focus:border-moss resize-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888] mb-1.5">OG Image URL</label>
                <input
                  type="text"
                  placeholder="https://…"
                  className="w-full rounded-md border border-[#e0dcd4] bg-white px-3 py-2 text-sm text-[#333] placeholder:text-[#ccc] outline-none focus:border-moss transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888] mb-1.5">Canonical URL</label>
                <input
                  type="text"
                  placeholder="https://…"
                  className="w-full rounded-md border border-[#e0dcd4] bg-white px-3 py-2 text-sm text-[#333] placeholder:text-[#ccc] outline-none focus:border-moss transition-colors"
                />
              </div>
            </>
          )}

          {/* Action buttons */}
          {error && <p className="rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-600">{error}</p>}

          <div className="grid gap-2 border-t border-[#e8e5de] pt-5">
            <button type="button" disabled={submitting} onClick={() => saveDraft(false)} className="w-full rounded-full border border-[#e0dcd4] py-3 text-sm font-semibold text-[#333] hover:bg-[#f5f3f0] transition-colors disabled:opacity-50 cursor-pointer">
              Save Draft
            </button>
            <button type="button" disabled={submitting} onClick={handleSubmit} className="w-full rounded-full bg-marigold py-3 text-sm font-semibold text-lagoon-900 hover:bg-marigold-600 shadow-sm transition-transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer">
              {submitting ? "Submitting…" : "Submit for Review"}
            </button>
          </div>
        </div>
      </aside>

    </div>
  );
}
