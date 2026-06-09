import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { GraduationCap, MapPin, Users, Award, BookOpen, DollarSign, Calendar, Briefcase } from "lucide-react";

export default function StudyInGermany() {
  const [, setLocation] = useLocation();

  const benefits = [
    "No tuition fees at public universities",
    "World-class engineering programs",
    "Strong job market after graduation",
    "English-taught programs available",
    "Rich cultural experience",
    "Central European location"
  ];

  const topUniversities = [
    "Technical University of Munich",
    "Ludwig Maximilian University Munich",
    "Heidelberg University",
    "University of Freiburg",
    "RWTH Aachen University"
  ];

  const popularCourses = [
    "Engineering",
    "Computer Science",
    "MBA",
    "Mechanical Engineering",
    "Electrical Engineering"
  ];

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-6">Study in Germany</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Experience world-class education in Europe's largest economy with no tuition fees at public universities
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center border border-blue-100/70">
              <DollarSign className="w-10 h-10 text-[#17337d] mx-auto mb-3" />
              <p className="text-2xl font-bold text-[#07173d]">€0-3000</p>
              <p className="text-sm text-[#48608f]">Annual Fees</p>
            </Card>
            <Card className="p-6 text-center border border-blue-100/70">
              <Calendar className="w-10 h-10 text-[#17337d] mx-auto mb-3" />
              <p className="text-2xl font-bold text-[#07173d]">Oct/Apr</p>
              <p className="text-sm text-[#48608f]">Intake Periods</p>
            </Card>
            <Card className="p-6 text-center border border-blue-100/70">
              <MapPin className="w-10 h-10 text-[#17337d] mx-auto mb-3" />
              <p className="text-2xl font-bold text-[#07173d]">500+</p>
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

      {/* Benefits */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Why Study in Germany?</h2>
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

      {/* Top Universities */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Top German Universities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topUniversities.map((uni, idx) => (
              <Card key={idx} className="p-6 border border-blue-100/70 bg-white hover:shadow-lg transition-all">
                <GraduationCap className="w-8 h-8 text-[#17337d] mb-3" />
                <h3 className="text-lg font-bold text-[#07173d] mb-2">{uni}</h3>
                <p className="text-sm text-[#48608f] mb-4">
                  Germany's premier institution for international students
                </p>
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

      {/* Popular Courses */}
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

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <Card className="p-12 text-center bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your German Education Journey?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get expert guidance from our counselors for admission to top German universities
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#C59D50] to-[#B78D42] text-[#040F23] font-semibold"
                onClick={() => setLocation("/contact")}
              >
                Book Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => setLocation("/careers")}
              >
                View Careers
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}