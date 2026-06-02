import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Users, Globe, Zap, Target, BookOpen, Shield, MapPin, User, Calendar, GraduationCap } from "lucide-react";
import { useLocation } from "wouter";

export default function About() {
  const [, setLocation] = useLocation();

  const stats = [
    { icon: Users, value: "500+", label: "Students Counseled" },
    { icon: Globe, value: "15+", label: "Countries Covered" },
    { icon: GraduationCap, value: "50+", label: "Partner Universities" },
    { icon: Calendar, value: "3+", label: "Years Experience" }
  ];

  const teamMembers = [
    {
      name: "Dr. Chandrakumar",
      role: "Founder & Managing Director",
      description: "Over 10 years in international education, passionate about helping students achieve their UK dreams"
    },
    {
      name: "Ms. Kavya",
      role: "Head Counselor",
      description: "Specialized in UK admissions with expertise in course selection and visa guidance"
    },
    {
      name: "Ms. Faizuu",
      role: "Senior Counselor",
      description: "Expert in Canadian and Australian education pathways with 2+ years experience"
    }
  ];

  const journeySteps = [
    { icon: BookOpen, title: "Initial Consultation", desc: "Understanding your academic goals and preferences" },
    { icon: Globe, title: "Country Selection", desc: "Choosing the right destination for your studies" },
    { icon: GraduationCap, title: "University Application", desc: "Guiding through the complete application process" },
    { icon: Shield, title: "Visa Support", desc: "Comprehensive visa documentation and interview prep" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-6">About Nawins Education</h1>
          <p className="text-xl text-purple-100 max-w-2xl">
            Your trusted partner in pursuing world-class education in the United Kingdom
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">
                Nawins Edutech Private Limited started with a simple belief: that every student deserves access to world-class education and expert guidance.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Based in Tamil Nadu, we've helped students pursue education in the United Kingdom and beyond with dedicated counseling services.
              </p>
              <p className="text-lg text-gray-700">
                We don't just advise—we make sure we chase your dreams with you, every step of the way.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-200 to-blue-200 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center">
                <Users className="w-24 h-24 text-[#17337d] mx-auto mb-4" />
                <p className="text-purple-900 font-semibold text-lg">Building Dreams Together</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-[#f7f9ff]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#07173d] mb-4">Our Impact</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <Card key={idx} className="p-6 text-center border border-blue-100/70 bg-white">
                <stat.icon className="w-10 h-10 text-[#17337d] mx-auto mb-3" />
                <p className="text-3xl font-bold text-[#07173d] mb-1">{stat.value}</p>
                <p className="text-sm text-[#48608f]">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder & Managing Director Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Founder & Managing Director</h2>
          </div>
          <Card className="p-8 border border-blue-100/70 bg-gradient-to-r from-blue-50 to-purple-50 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 bg-gradient-to-r from-[#17337d] to-[#213a5b] rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-16 h-16 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#07173d] mb-2">Dr. Chandrakumar</h3>
                <p className="text-[#17337d] font-semibold mb-3">Founder & Managing Director</p>
                <p className="text-gray-700">
                  With over a decade of experience in international education, Dr. Chandrakumar founded Nawins Education with the vision of making quality overseas education accessible to students from Tamil Nadu and across India.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Student Journey Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive 4-step process ensures you're supported from initial consultation to arrival
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {journeySteps.map((step, idx) => (
              <Card key={idx} className="p-6 border-0 bg-white hover:shadow-lg transition-shadow">
                <step.icon className="w-12 h-12 text-[#17337d] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet our experienced counselors dedicated to your success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <Card key={idx} className="p-6 border border-blue-100/70 bg-white text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-[#17337d] to-[#213a5b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#07173d] mb-1">{member.name}</h3>
                <p className="text-[#17337d] text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Compliance Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trust & Compliance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 border border-blue-100/70 bg-white">
              <Shield className="w-12 h-12 text-[#17337d] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Legal Entity</h3>
              <p className="text-gray-700">NAWINS EDUTECH PRIVATE LIMITED - Registered Indian company</p>
            </Card>
            <Card className="p-6 border border-blue-100/70 bg-white">
              <Award className="w-12 h-12 text-[#17337d] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ethical Practices</h3>
              <p className="text-gray-700">Transparent guidance with no hidden fees or misleading claims</p>
            </Card>
            <Card className="p-6 border border-blue-100/70 bg-white">
              <Target className="w-12 h-12 text-[#17337d] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality First</h3>
              <p className="text-gray-700">Prioritizing student success over profits</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Office Location Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Office Location</h2>
          </div>
          <Card className="p-8 border border-blue-100/70 bg-gradient-to-r from-blue-50 to-purple-50 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <MapPin className="w-12 h-12 text-[#17337d] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-[#07173d] mb-3">Tiruchengode, Tamil Nadu</h3>
                <p className="text-gray-700 mb-2">
                  12A - 3rd Floor, HDFC Bank Upstairs<br />
                  Marappa Gounder Plaza, West Car Street<br />
                  Tiruchengode, Tamil Nadu - 637211
                </p>
                <p className="text-[#48608f]">Monday - Saturday: 9:00 AM - 6:00 PM (IST)</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] to-[#163886]">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get personalized counseling from our expert team and take the first step toward your dream education
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
              onClick={() => setLocation("/services")}
            >
              View Our Services
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
