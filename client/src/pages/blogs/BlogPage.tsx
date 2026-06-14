import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, ChevronRight, Tag } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import CTASection from "@/components/shared/CTASection";

const CATEGORIES = [
  { id: "all",          label: "All Articles" },
  { id: "visa",         label: "Visa & Immigration" },
  { id: "university",   label: "University Guides" },
  { id: "scholarship",  label: "Scholarships" },
  { id: "ielts",        label: "IELTS & Language" },
  { id: "student-life", label: "Student Life" },
  { id: "application",  label: "Application Tips" },
];

const ARTICLES = [
  {
    id: 1, featured: true,
    title: "Complete Guide to UK Student Visa 2026 — Everything You Need to Know",
    excerpt: "The UK Student Visa (formerly Tier 4) process can be overwhelming. This comprehensive guide breaks down every step — from CAS to biometrics — so you know exactly what to expect.",
    category: "visa", tag: "Visa & Immigration",
    readTime: "8 min", date: "June 12, 2026", author: "Nawins Education",
    img: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80",
  },
  {
    id: 2, featured: false,
    title: "Top 10 UK Universities for Indian Students in 2026",
    excerpt: "From University of Greenwich to Ulster University London — here are the UK universities with the highest acceptance rates and best support for Indian students.",
    category: "university", tag: "University Guides",
    readTime: "6 min", date: "June 10, 2026", author: "Nawins Education",
    img: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
  },
  {
    id: 3, featured: false,
    title: "IELTS Score Requirements for UK Universities in 2026",
    excerpt: "Different courses require different IELTS scores. We break down minimum band requirements for Business, Engineering, Nursing, and Law across our partner universities.",
    category: "ielts", tag: "IELTS & Language",
    readTime: "5 min", date: "June 8, 2026", author: "Nawins Education",
    img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
  },
  {
    id: 4, featured: false,
    title: "How to Write a Strong Statement of Purpose (SOP) for UK Universities",
    excerpt: "Your SOP is your first impression. Discover the structure, tone, and content that UK admissions teams look for — with tips from our counselors who've reviewed hundreds.",
    category: "application", tag: "Application Tips",
    readTime: "7 min", date: "June 6, 2026", author: "Nawins Education",
    img: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&q=80",
  },
  {
    id: 5, featured: false,
    title: "Scholarships for Indian Students Studying in the UK — 2026 Guide",
    excerpt: "From Chevening to university-specific awards, here's a curated list of scholarships available to Indian students applying to UK universities in the 2026 intake.",
    category: "scholarship", tag: "Scholarships",
    readTime: "6 min", date: "June 4, 2026", author: "Nawins Education",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
  },
  {
    id: 6, featured: false,
    title: "What Is CAS and Why Does It Matter for Your UK Student Visa?",
    excerpt: "CAS (Confirmation of Acceptance for Studies) is the document that unlocks your UK visa application. Here's everything you need to know about it and how Nawins helps you get it.",
    category: "visa", tag: "Visa & Immigration",
    readTime: "4 min", date: "June 2, 2026", author: "Nawins Education",
    img: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80",
  },
  {
    id: 7, featured: false,
    title: "Student Life in London — A Guide for Indian Students in 2026",
    excerpt: "Accommodation costs, transport, part-time work, food, social life — everything you need to know about living in London as an international student from India.",
    category: "student-life", tag: "Student Life",
    readTime: "9 min", date: "May 30, 2026", author: "Nawins Education",
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
  },
  {
    id: 8, featured: false,
    title: "How to Prepare for Your UK Visa Interview in 2026",
    excerpt: "Many students fear the UK visa interview. Our counselors share the most common questions, what officers look for, and how to answer with confidence.",
    category: "visa", tag: "Visa & Immigration",
    readTime: "5 min", date: "May 28, 2026", author: "Nawins Education",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  },
  {
    id: 9, featured: false,
    title: "MBA in the UK — Top Universities, Costs & Career Outcomes",
    excerpt: "An MBA from a UK university can transform your career. We compare the top programmes, tuition fees, ROI, and GMAT/IELTS requirements for 2026 intake.",
    category: "university", tag: "University Guides",
    readTime: "8 min", date: "May 26, 2026", author: "Nawins Education",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
  },
];

const TAG_COLORS: Record<string, string> = {
  "Visa & Immigration": "bg-blue-100 text-blue-700",
  "University Guides":  "bg-purple-100 text-purple-700",
  "Scholarships":       "bg-amber-100 text-amber-700",
  "IELTS & Language":   "bg-green-100 text-green-700",
  "Student Life":       "bg-rose-100 text-rose-700",
  "Application Tips":   "bg-teal-100 text-teal-700",
};

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => { toast.success("Subscribed!"); setEmail(""); },
    onError: () => toast.error("Please try again."),
  });

  const featured = ARTICLES[0];
  const filtered = ARTICLES.slice(1).filter(a => {
    const matchCat = activeCategory === "all" || a.category === activeCategory;
    const matchSearch = !search.trim() || a.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-[#030f2d] via-[#06226b] to-[#081b4e]">
        <div className="container">
          <span className="inline-block rounded-full bg-[#C59D50]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C59D50] mb-5">
            News & Articles
          </span>
          <h1 className="text-5xl font-bold text-white mb-4">Study Abroad Insights</h1>
          <p className="text-blue-100/85 text-lg max-w-2xl mb-8">
            Expert guides, visa updates, scholarship alerts, and student success stories — all in one place.
          </p>
          <div className="max-w-lg relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200" />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="h-12 rounded-full border-blue-200/40 bg-white/10 pl-10 text-white placeholder:text-blue-100/60" />
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <section className="py-3 bg-white border-b border-blue-100 sticky top-[68px] z-40">
        <div className="container flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-[#040F23] text-white"
                  : "bg-[#f7f9ff] text-[#48608f] border border-blue-100 hover:border-[#C59D50]"
              }`}>
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Featured article */}
              {activeCategory === "all" && !search && (
                <div className="rounded-2xl overflow-hidden bg-white border border-blue-100 shadow-sm group">
                  <div className="relative h-56 overflow-hidden">
                    <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 rounded-full bg-[#C59D50] px-3 py-1 text-xs font-bold text-[#040F23]">Featured</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${TAG_COLORS[featured.tag] || "bg-gray-100 text-gray-700"}`}>
                        {featured.tag}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#94a3b8]">
                        <Clock className="w-3 h-3" />{featured.readTime} read
                      </span>
                      <span className="text-xs text-[#94a3b8]">{featured.date}</span>
                    </div>
                    <h2 className="text-xl font-bold text-[#07173d] mb-2 group-hover:text-[#294fca] transition-colors leading-tight">{featured.title}</h2>
                    <p className="text-[#48608f] text-sm leading-relaxed mb-4">{featured.excerpt}</p>
                    <button className="inline-flex items-center gap-1.5 text-[#294fca] text-sm font-semibold hover:gap-2.5 transition-all">
                      Read full article <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Article list */}
              {filtered.map(article => (
                <div key={article.id} className="flex gap-4 rounded-2xl bg-white border border-blue-100 p-4 group hover:shadow-md transition-all cursor-pointer">
                  <div className="relative w-28 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${TAG_COLORS[article.tag] || "bg-gray-100 text-gray-700"}`}>
                        {article.tag}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-[#94a3b8]">
                        <Clock className="w-3 h-3" />{article.readTime}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#07173d] mb-1.5 group-hover:text-[#294fca] transition-colors leading-snug line-clamp-2">{article.title}</h3>
                    <p className="text-xs text-[#48608f] line-clamp-2">{article.excerpt}</p>
                    <p className="text-[10px] text-[#94a3b8] mt-1.5">{article.date} · {article.author}</p>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && !featured && (
                <div className="py-16 text-center text-[#48608f] bg-white rounded-2xl border border-blue-100">
                  <Search className="w-10 h-10 mx-auto mb-3 text-[#94a3b8]" />
                  <p>No articles found. Try a different search or category.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Newsletter */}
              <div className="rounded-2xl bg-gradient-to-br from-[#040F23] to-[#06226b] p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
                <p className="text-blue-200 text-sm mb-4">Get weekly study abroad insights, visa alerts, and scholarship notices directly in your inbox.</p>
                <form onSubmit={e => { e.preventDefault(); subscribeMutation.mutate({ email }); }} className="space-y-3">
                  <Input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com" required
                    className="rounded-xl h-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200/60 text-sm" />
                  <Button type="submit" disabled={subscribeMutation.isPending}
                    className="w-full rounded-xl bg-gradient-to-r from-[#C59D50] to-[#B78D42] text-[#040F23] font-semibold text-sm h-10">
                    {subscribeMutation.isPending ? "Subscribing..." : "Subscribe Free"}
                  </Button>
                </form>
              </div>

              {/* Popular tags */}
              <div className="rounded-2xl bg-white border border-blue-100 p-6">
                <h3 className="font-bold text-[#07173d] mb-4 flex items-center gap-2"><Tag className="w-4 h-4 text-[#C59D50]" /> Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {["UK Student Visa","IELTS Tips","Scholarships 2026","Study in London","CAS Process","MBA UK","SOP Writing","Pre-departure","HDFC Credila"].map(t => (
                    <span key={t} className="rounded-full border border-blue-100 px-3 py-1 text-xs text-[#48608f] hover:border-[#C59D50] hover:text-[#C59D50] cursor-pointer transition-all">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div className="rounded-2xl bg-[#f7f9ff] border border-blue-100 p-6">
                <h3 className="font-bold text-[#07173d] mb-4">Quick Links</h3>
                <div className="space-y-2">
                  {[
                    { label: "Book Free Consultation", href: "/contact" },
                    { label: "Check Eligibility", href: "/eligibility-checker" },
                    { label: "Free Assessment Form", href: "/free-assessment" },
                    { label: "Student Essentials", href: "/student-essentials" },
                    { label: "University Partners", href: "/universities" },
                  ].map(link => (
                    <a key={link.label} href={link.href}
                      className="flex items-center justify-between rounded-xl border border-blue-100 bg-white px-3 py-2.5 text-xs font-semibold text-[#07173d] hover:border-[#C59D50] hover:text-[#C59D50] transition-all group">
                      {link.label}
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
