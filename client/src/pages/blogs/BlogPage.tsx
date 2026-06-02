import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, User, ArrowRight, Search, Filter } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import MotionWrapper from "@/components/animations/MotionWrapper";
import Reveal from "@/components/animations/Reveal";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Blogs() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      toast.success("Subscribed successfully!", {
        description: "You will now receive our latest study abroad updates.",
      });
      setEmail("");
    },
    onError: (error) => {
      toast.error("Subscription failed", {
        description: error.message || "Please try again later.",
      });
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Invalid email", { description: "Please enter a valid email address." });
      return;
    }
    subscribeMutation.mutate({ email });
  };

  const blogPosts = [
    {
      id: 1,
      title: "Complete Guide to UK University Applications in 2024",
      excerpt: "Learn the step-by-step process for applying to UK universities, deadlines, required documents, and insider tips for success.",
      content: "A comprehensive guide covering everything you need to know about UK university applications...",
      category: "Application Process",
      author: "Priya Sharma",
      date: "2024-05-15",
      readTime: "8 min read",
      image: "🎓",
      featured: true,
    },
    {
      id: 2,
      title: "Visa Interview Preparation: Mistakes to Avoid",
      excerpt: "Don't let your visa interview derail your dreams. Discover common mistakes and how to ace your interview.",
      content: "Visa interviews can be stressful, but preparation is key. Here are the most common mistakes...",
      category: "Visa & Immigration",
      author: "Rahul Patel",
      date: "2024-05-10",
      readTime: "6 min read",
      image: "✈️",
      featured: true,
    },
    {
      id: 3,
      title: "Cost of Living in UK Cities: Budget Breakdown",
      excerpt: "Complete breakdown of living expenses in London, Manchester, Edinburgh, and other UK cities.",
      content: "Understanding your budget is crucial when planning to study abroad. Here's a detailed breakdown...",
      category: "Student Life",
      author: "Emma Wilson",
      date: "2024-05-05",
      readTime: "7 min read",
      image: "💷",
      featured: true,
    },
    {
      id: 4,
      title: "Scholarship Opportunities for Indian Students",
      excerpt: "Explore various scholarship programs available for Indian students in UK, Canada, and Australia.",
      content: "Scholarships can significantly reduce your study abroad costs. Here are the top programs...",
      category: "Scholarships",
      author: "Anjali Singh",
      date: "2024-04-28",
      readTime: "9 min read",
      image: "🏆",
      featured: false,
    },
    {
      id: 5,
      title: "IELTS vs TOEFL: Which One Should You Take?",
      excerpt: "Comparing IELTS and TOEFL: scores, formats, preparation strategies, and which universities accept each.",
      content: "Both tests are widely accepted, but there are key differences. Let's compare them...",
      category: "Test Preparation",
      author: "Michael Chen",
      date: "2024-04-20",
      readTime: "6 min read",
      image: "📝",
      featured: false,
    },
    {
      id: 6,
      title: "Student Life in Canada: What to Expect",
      excerpt: "Experience Canadian campus culture, student community, outdoor activities, and what makes studying there special.",
      content: "Canada is known for its welcoming culture and vibrant campuses. Here's what to expect...",
      category: "Student Life",
      author: "Jessica Kumar",
      date: "2024-04-15",
      readTime: "7 min read",
      image: "🍁",
      featured: false,
    },
    {
      id: 7,
      title: "Post-Study Work Permits Explained",
      excerpt: "Understanding PSW in UK, PGWP in Canada, and work visa options after graduation.",
      content: "Work permits are a crucial part of the study abroad journey. Here's everything you need to know...",
      category: "Application Process",
      author: "David Kumar",
      date: "2024-04-10",
      readTime: "8 min read",
      image: "💼",
      featured: false,
    },
    {
      id: 8,
      title: "Interview Tips from Successful NAWINS Edutech Students",
      excerpt: "Real interview experiences and tips from students who got accepted to top universities.",
      content: "We spoke to our successful students about their interview experiences. Here's what they shared...",
      category: "Student Stories",
      author: "Sarah Williams",
      date: "2024-04-05",
      readTime: "10 min read",
      image: "🎤",
      featured: false,
    },
  ];

  const categories = ["all", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <MotionWrapper initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="container">
            <h1 className="text-5xl font-bold text-white mb-6">Study Abroad Blog</h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Insights, tips, and stories from students and experts about studying abroad
            </p>
          </div>
        </MotionWrapper>
      </section>

      {/* Search & Filter */}
      <section className="py-12 bg-white border-b border-[#d0d8e8]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#48608f]" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-[#d0d8e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17337d]"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-[#48608f]" />
              <select className="flex-1 px-4 py-3 border border-[#d0d8e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17337d] text-[#07173d]">
                <option>Newest First</option>
                <option>Most Popular</option>
                <option>Oldest First</option>
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold transition-all capitalize ${
                  selectedCategory === cat
                    ? "bg-[#17337d] text-white"
                    : "bg-[#f0f4ff] text-[#355183] hover:bg-[#e0e8ff]"
                }`}
              >
                {cat === "all" ? "All Articles" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {filteredPosts.length > 0 && (
        <section className="py-12 bg-[#f7f9ff]">
          <div className="container">
            {featuredPosts.length > 0 && (
              <>
                <h2 className="text-3xl font-bold text-[#07173d] mb-8">Featured Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {featuredPosts.map((post, idx) => (
                    <Reveal key={post.id} delay={idx * 0.1}>
                      <Card className="overflow-hidden border border-[#d0d8e8] hover:shadow-lg transition-all cursor-pointer h-full">
                        <div className="bg-gradient-to-br from-[#17337d] to-[#213a5b] h-40 flex items-center justify-center">
                          <span className="text-6xl">{post.image}</span>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
                              {post.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-[#07173d] mb-3 line-clamp-2">{post.title}</h3>
                          <p className="text-[#48608f] text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                          <div className="flex items-center gap-4 text-xs text-[#48608f] mb-4">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[#355183]">{formatDate(post.date)}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#17337d] hover:text-[#17337d]"
                              onClick={() => setLocation("/contact")}
                            >
                              Read <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Reveal>
                  ))}
                </div>
              </>
            )}

            {/* Regular Posts */}
            {regularPosts.length > 0 && (
              <>
                <h2 className="text-3xl font-bold text-[#07173d] mb-8">All Articles</h2>
                <div className="space-y-4">
                  {regularPosts.map((post, idx) => (
                    <Reveal key={post.id} delay={idx * 0.05}>
                      <Card className="p-6 border border-[#d0d8e8] hover:shadow-md transition-all cursor-pointer">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                          <div className="text-4xl">{post.image}</div>
                          <div className="md:col-span-2">
                            <div className="mb-2">
                              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                                {post.category}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-[#07173d] mb-2">{post.title}</h3>
                            <p className="text-[#48608f] text-sm line-clamp-1">{post.excerpt}</p>
                            <div className="flex items-center gap-4 text-xs text-[#48608f] mt-3">
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {post.author}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.readTime}
                              </div>
                              <span>{formatDate(post.date)}</span>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button
                              variant="outline"
                              className="border-[#17337d] text-[#17337d] hover:bg-[#f0f4ff]"
                              onClick={() => setLocation("/contact")}
                            >
                              Read <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Reveal>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <section className="py-20 bg-[#f7f9ff]">
          <div className="container text-center">
            <BookOpen className="w-16 h-16 text-[#d0d8e8] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#07173d] mb-2">No Articles Found</h2>
            <p className="text-[#48608f] mb-6">Try adjusting your filters or search terms.</p>
            <Button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="bg-[#17337d] hover:bg-[#213a5b]"
            >
              View All Articles
            </Button>
          </div>
        </section>
      )}

      {/* Subscribe Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] to-[#163886]">
        <MotionWrapper initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          <div className="container text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get the latest study abroad tips, visa updates, and success stories delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none"
                required
              />
              <Button 
                type="submit"
                disabled={subscribeMutation.isPending}
                className="bg-amber-400 text-[#07173d] hover:bg-amber-300 px-6"
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </MotionWrapper>
      </section>

      <Footer />
    </div>
  );
}
