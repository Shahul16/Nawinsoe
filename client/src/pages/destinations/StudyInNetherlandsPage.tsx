import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { GraduationCap, MapPin, Users, Award, BookOpen, DollarSign, Calendar } from "lucide-react";

export default function StudyInNetherlands() {
  const [, setLocation] = useLocation();

  const benefits = [
    "English-taught programs widely available",
    "Innovative education system",
    "Gateway to EU opportunities",
    "Safe and inclusive society",
    "Excellent work-life balance",
    "Cycling-friendly cities"
  ];

  const topUniversities = [
    "University of Amsterdam",
    "Delft University of Technology",
    "Leiden University",
    "Utrecht University",
    "TU Eindhoven"
  ];

  const popularCourses = [
    "Engineering",
    "Business",
    "Computer Science",
    "Environmental Science",
    "Arts & Culture"
  ];

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-6">Study in Netherlands</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Experience innovative education in the heart of Europe with world-class universities
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center border border-blue-100/70">
              <DollarSign className="w-10 h-10 text-[#17337d] mx-auto mb-3" />
              <p className="text-2xl font-bold text-[#07173d]">€10,000</p>
              <p className="text-sm text-[#48608f]">Annual Fees</p>
            </Card>
            <Card className="p-6 text-center border border-blue-100/70">
              <Calendar className="w-10 h-10 text-[#17337d] mx-auto mb-3" />
              <p className="text-2xl font-bold text-[#07173d]">Sep/Feb</p>
              <p className="text-sm text-[#48608f]">Intake Periods</p>
            </Card>
            <Card className="p-6 text-center border border-blue-100/70">
              <MapPin className="w-10 h-10 text-[#17337d] mx-auto mb-3" />
              <p className="text-2xl font-bold text-[#07173d]">50+</p>
              <p className="text-sm text-[#48608f]">Universities</p>
            </Card>
            <Card className="p-6 text-center border border-blue-100/70">
              <Users className="w-10 h-10 text-[#17337d] mx-auto mb-3" />
              <p className="text-2xl font-bold text-[#07173d]">95%</p>
              <p className="text-sm text-[#48608f]">Success Rate</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Why Study in Netherlands?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <Card key={idx} className="p-6 border border-blue-100/70 bg-white hover:shadow-lg transition-all">
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-[#17337d] flex-shrink-0 mt-1" />
                  <p className="text-[#48608f]">{benefit}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Top Netherlands Universities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topUniversities.map((uni, idx) => (
              <Card key={idx} className="p-6 border border-blue-100/70 bg-white hover:shadow-lg transition-all">
                <GraduationCap className="w-8 h-8 text-[#17337d] mb-3" />
                <h3 className="text-lg font-bold text-[#07173d] mb-2">{uni}</h3>
                <p className="text-sm text-[#48608f] mb-4">Leading Dutch institution</p>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-[#17337d] to-[#213a5b]"
                  onClick={() => setLocation("/contact")}
                >
                  Learn More
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Popular Courses</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {popularCourses.map((course, idx) => (
              <Card key={idx} className="p-4 text-center border border-blue-100/70 bg-white hover:shadow-lg transition-all">
                <BookOpen className="w-6 h-6 text-[#17337d] mx-auto mb-2" />
                <p className="text-sm font-semibold text-[#07173d]">{course}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container">
          <Card className="p-12 text-center bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Study in Netherlands?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get expert guidance for admission to top Dutch universities
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#C59D50] to-[#B78D42] text-[#040F23] font-semibold"
              onClick={() => setLocation("/contact")}
            >
              Book Free Consultation
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}