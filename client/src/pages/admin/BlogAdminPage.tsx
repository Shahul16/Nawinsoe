import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { PlusCircle, Edit, Trash2, Eye, ArrowLeft, LogOut, BookOpen } from "lucide-react";

const ADMIN_PASSWORD = "Nawins@Admin2026";

type Post = { id: number; title: string; excerpt: string; content: string; category: string; author: string; readTime: string; date: string; };

export default function BlogAdmin() {
  const [, setLocation] = useLocation();
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editId, setEditId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, title: "Complete Guide to UK University Applications 2026", excerpt: "Learn the step-by-step process for applying to UK universities, deadlines, required documents, and insider tips for success.", content: "Full article content here...", category: "Application Process", author: "Nawins Education", readTime: "8 min read", date: "2026-05-15" },
    { id: 2, title: "Visa Interview Preparation: Mistakes to Avoid", excerpt: "Don't let your visa interview derail your dreams. Discover common mistakes and how to ace your interview.", content: "Full article content here...", category: "Visa & Immigration", author: "Nawins Education", readTime: "6 min read", date: "2026-05-02" },
  ]);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", category: "", author: "Nawins Education", readTime: "5 min read" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { setAuthed(true); toast.success("Logged in successfully."); }
    else toast.error("Incorrect password. Please try again.");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    if (view === "create") {
      const newPost: Post = { id: Date.now(), ...form, date: today };
      setPosts(p => [newPost, ...p]);
      toast.success("Post published successfully!");
    } else if (view === "edit" && editId) {
      setPosts(p => p.map(post => post.id === editId ? { ...post, ...form, date: today } : post));
      toast.success("Post updated successfully!");
    }
    setView("list");
  };

  const startEdit = (post: Post) => {
    setForm({ title: post.title, excerpt: post.excerpt, content: post.content, category: post.category, author: post.author, readTime: post.readTime });
    setEditId(post.id);
    setView("edit");
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this post?")) {
      setPosts(p => p.filter(post => post.id !== id));
      toast.success("Post deleted.");
    }
  };

  if (!authed) return (
    <div className="min-h-screen bg-[#f7f9ff] flex items-center justify-center p-4">
      <Card className="p-8 w-full max-w-sm border border-blue-100 shadow-lg">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#040F23] flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-7 h-7 text-[#C59D50]" />
          </div>
          <h1 className="text-xl font-bold text-[#07173d]">Nawins Blog Admin</h1>
          <p className="text-sm text-[#48608f] mt-1">Enter your admin password to manage blog posts</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">Admin Password</label>
            <Input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Enter admin password" required className="rounded-xl h-11" />
          </div>
          <Button type="submit" className="w-full h-11 rounded-xl bg-gradient-to-r from-[#17337d] to-[#2854c8] text-white font-semibold">
            Login to Dashboard
          </Button>
        </form>
        <p className="text-xs text-center text-[#94a3b8] mt-4">Contact your administrator for access.</p>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <div className="bg-[#040F23] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#C59D50]/20 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-[#C59D50]" />
          </div>
          <span className="font-semibold text-sm">Nawins Blog Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setLocation("/blogs")} className="text-xs text-blue-200 hover:text-white flex items-center gap-1.5 transition-colors">
            <Eye className="w-3.5 h-3.5" /> View Live Blog
          </button>
          <button onClick={() => { setAuthed(false); setPw(""); }} className="text-xs text-blue-200 hover:text-red-300 flex items-center gap-1.5 transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {view === "list" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#07173d]">Blog Posts</h2>
                <p className="text-sm text-[#48608f]">{posts.length} post{posts.length !== 1 ? "s" : ""} total</p>
              </div>
              <Button
                onClick={() => { setForm({ title: "", excerpt: "", content: "", category: "General", author: "Nawins Education", readTime: "5 min read" }); setView("create"); }}
                className="rounded-xl bg-gradient-to-r from-[#17337d] to-[#2854c8] text-white font-semibold flex items-center gap-2 px-5"
              >
                <PlusCircle className="w-4 h-4" /> New Post
              </Button>
            </div>

            {posts.length === 0 ? (
              <Card className="p-10 text-center border border-blue-100">
                <BookOpen className="w-10 h-10 text-[#94a3b8] mx-auto mb-3" />
                <p className="text-[#48608f] font-medium">No blog posts yet.</p>
                <p className="text-sm text-[#94a3b8]">Click "New Post" to publish your first article.</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {posts.map(post => (
                  <Card key={post.id} className="p-5 border border-blue-100 bg-white hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-[#C59D50] bg-amber-50 px-2 py-0.5 rounded-full">{post.category}</span>
                          <span className="text-xs text-[#94a3b8]">{post.date} · {post.readTime}</span>
                        </div>
                        <h3 className="font-bold text-[#07173d] mb-1 leading-tight">{post.title}</h3>
                        <p className="text-sm text-[#48608f] line-clamp-2">{post.excerpt}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => startEdit(post)} className="rounded-lg border border-blue-100 p-2 hover:bg-blue-50 text-[#294fca] transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(post.id)} className="rounded-lg border border-red-100 p-2 hover:bg-red-50 text-red-500 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {(view === "create" || view === "edit") && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setView("list")} className="text-[#294fca] hover:text-[#07173d] flex items-center gap-1.5 text-sm font-medium transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Posts
              </button>
              <span className="text-[#94a3b8]">/</span>
              <h2 className="text-xl font-bold text-[#07173d]">{view === "create" ? "Create New Post" : "Edit Post"}</h2>
            </div>

            <Card className="p-7 border border-blue-100 bg-white shadow-sm">
              <form onSubmit={handleSave} className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">Article Title *</label>
                  <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Complete Guide to Studying in the UK 2026" required className="rounded-xl h-11" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">Category</label>
                    <Input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} placeholder="e.g. Visa & Immigration" className="rounded-xl h-11" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">Author</label>
                    <Input value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} placeholder="Nawins Education" className="rounded-xl h-11" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">Read Time</label>
                    <Input value={form.readTime} onChange={e => setForm(p => ({ ...p, readTime: e.target.value }))} placeholder="5 min read" className="rounded-xl h-11" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">Excerpt / Summary * <span className="font-normal text-[#94a3b8]">(shown on blog listing page)</span></label>
                  <textarea value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} rows={3} required
                    placeholder="Write a 2-3 sentence summary that will appear on the blog listing page..."
                    className="w-full rounded-xl border border-[#dbe4f0] bg-[#f7f9ff] px-4 py-3 text-sm text-[#07173d] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#294fca]/30 focus:border-[#294fca] transition" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">Full Article Content * <span className="font-normal text-[#94a3b8]">(the complete blog post)</span></label>
                  <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} rows={14} required
                    placeholder="Write your full blog article content here. Use line breaks to separate paragraphs..."
                    className="w-full rounded-xl border border-[#dbe4f0] bg-[#f7f9ff] px-4 py-3 text-sm text-[#07173d] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#294fca]/30 focus:border-[#294fca] transition font-mono" />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Button type="submit" className="rounded-xl bg-gradient-to-r from-[#17337d] to-[#2854c8] text-white font-semibold px-8 h-11">
                    {view === "create" ? "Publish Post" : "Save Changes"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setView("list")} className="rounded-xl h-11">
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
