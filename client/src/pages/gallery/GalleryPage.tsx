import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Images, Heart } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import MotionWrapper from "@/components/animations/MotionWrapper";
import Reveal from "@/components/animations/Reveal";

export default function Gallery() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const galleryItems = [
    {
      id: 1,
      category: "Campus Visits",
      title: "Oxford University Tour",
      desc: "Our students exploring the historic halls of Oxford",
      image: "🏛️",
      date: "May 2024",
    },
    {
      id: 2,
      category: "Visa Success Meetups",
      title: "Celebration of Success",
      desc: "Students celebrating their visa approvals",
      image: "🎉",
      date: "April 2024",
    },
    {
      id: 3,
      category: "Student Farewell Events",
      title: "Farewell Dinner",
      desc: "NAWINS Edutech team and students sharing memorable moments",
      image: "🍽️",
      date: "March 2024",
    },
    {
      id: 4,
      category: "University Spotlight Series",
      title: "University of Manchester",
      desc: "Inside look at one of UK's top universities",
      image: "🎓",
      date: "February 2024",
    },
    {
      id: 5,
      category: "Campus Visits",
      title: "Cambridge University Tour",
      desc: "Exploring the beautiful Cambridge campus",
      image: "🌳",
      date: "January 2024",
    },
    {
      id: 6,
      category: "Student Achievements",
      title: "Student Awards",
      desc: "Our students receiving recognition at universities",
      image: "🏆",
      date: "December 2023",
    },
    {
      id: 7,
      category: "Visa Success Meetups",
      title: "Success Stories Session",
      desc: "Students sharing their journey and experiences",
      image: "💬",
      date: "November 2023",
    },
    {
      id: 8,
      category: "University Spotlight Series",
      title: "University of Toronto",
      desc: "Exploring Canadian education excellence",
      image: "🍁",
      date: "October 2023",
    },
    {
      id: 9,
      category: "Campus Visits",
      title: "Imperial College London",
      desc: "Engineering and science hub visit",
      image: "🔬",
      date: "September 2023",
    },
    {
      id: 10,
      category: "Student Farewell Events",
      title: "Cultural Evening",
      desc: "Students celebrating diversity and culture",
      image: "🎭",
      date: "August 2023",
    },
    {
      id: 11,
      category: "University Spotlight Series",
      title: "University of Melbourne",
      desc: "Experience Australian education",
      image: "🦘",
      date: "July 2023",
    },
    {
      id: 12,
      category: "Visa Success Meetups",
      title: "Welcome to UK Session",
      desc: "Pre-departure orientation and support",
      image: "✈️",
      date: "June 2023",
    },
  ];

  const categories = ["all", ...Array.from(new Set(galleryItems.map(item => item.category)))];

  const filteredItems = galleryItems.filter(
    item => selectedCategory === "all" || item.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <MotionWrapper initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="container">
            <h1 className="text-5xl font-bold text-white mb-6">Gallery</h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Moments from our community and partner universities
            </p>
          </div>
        </MotionWrapper>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-[#d0d8e8]">
        <div className="container">
          <p className="text-[#355183] font-semibold mb-4">Filter by Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold transition-all capitalize ${
                  selectedCategory === category
                    ? "bg-[#17337d] text-white"
                    : "bg-[#f0f4ff] text-[#355183] hover:bg-[#e0e8ff]"
                }`}
              >
                {category === "all" ? "All Moments" : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, idx) => (
                <Reveal key={item.id} delay={idx * 0.1}>
                  <Card className="overflow-hidden border border-[#d0d8e8] hover:shadow-xl transition-all cursor-pointer group">
                    <div className="relative bg-gradient-to-br from-[#17337d] to-[#213a5b] h-48 flex items-center justify-center overflow-hidden">
                      <span className="text-8xl group-hover:scale-110 transition-transform duration-300">
                        {item.image}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                          {item.category}
                        </span>
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>
                      <h3 className="text-lg font-bold text-[#07173d] mb-2">{item.title}</h3>
                      <p className="text-[#48608f] text-sm mb-4">{item.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#355183]">{item.date}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#17337d] hover:text-[#17337d]"
                          onClick={() => setLocation("/contact")}
                        >
                          View More →
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Images className="w-16 h-16 text-[#d0d8e8] mx-auto mb-4" />
              <p className="text-xl text-[#355183]">No NAWINS Edutech community moments found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-white">
        <div className="container">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#07173d] mb-4">Our Community in Numbers</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "5,000+", label: "Happy Students" },
              { number: "750+", label: "Partner Universities" },
              { number: "50+", label: "Success Stories" },
              { number: "15+", label: "Years Experience" },
            ].map((stat, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <Card className="p-8 border border-[#d0d8e8] text-center hover:shadow-lg transition-all">
                  <p className="text-4xl font-bold text-[#17337d] mb-2">{stat.number}</p>
                  <p className="text-[#355183] font-semibold">{stat.label}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] to-[#163886]">
        <MotionWrapper initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          <div className="container text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Share Your Moment</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Have an amazing story or photo to share? We'd love to feature your journey!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => setLocation("/contact")}
                className="bg-gradient-to-r from-amber-400 to-amber-500 text-[#07173d] hover:from-amber-300 hover:to-amber-400 px-8 py-3"
              >
                Submit Your Story
              </Button>
              <Button
                variant="outline"
                className="border border-white text-white hover:bg-white/10 px-8 py-3"
                onClick={() => setLocation("/success-stories")}
              >
                View Success Stories
              </Button>
            </div>
          </div>
        </MotionWrapper>
      </section>

      <Footer />
    </div>
  );
}
