import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { useLocation } from "wouter";

export default function Blogs() {
  const [, setLocation] = useLocation();

  const upcomingTopics = [
    "UK University Application Timelines",
    "Scholarship Strategy for Indian Students",
    "Visa Interview Mistakes to Avoid",
    "Cost of Living Guide by UK City",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-6">Study Abroad Blogs</h1>
          <p className="text-xl text-purple-100 max-w-2xl">
            Insights, tips, and stories from our community
          </p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-12 border-0 bg-gradient-to-br from-purple-50 to-blue-50 text-center lg:col-span-2">
              <BookOpen className="w-20 h-20 text-purple-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Editorial Desk Launching Soon</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                We are preparing practical guides, visa updates, and student stories to help you make better UK study decisions.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => setLocation("/contact")}
                >
                  Request Topic Alerts
                </Button>
                <Button variant="outline" onClick={() => setLocation("/services")}>
                  Explore Counseling Services
                </Button>
              </div>
            </Card>

            <Card className="p-6 border-0 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 mb-3">First Topics</h3>
              <ul className="space-y-3 text-gray-700">
                {upcomingTopics.map(topic => (
                  <li key={topic} className="rounded-md bg-white px-3 py-2 border border-gray-200">
                    {topic}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
