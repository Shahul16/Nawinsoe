import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Award, Users, Globe, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-6">About NAWINS Edutech</h1>
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
                NAWINS EDUTECH PRIVATE LIMITED started with a simple belief: that every student deserves access to world-class education and expert guidance. What began as a small team of two in a tiny office in Namakkal, Tamil Nadu, has grown into a dedicated organization with offices across Tamil Nadu.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Our journey has been nothing less than epic. We've built a strong student network worldwide through sheer hard work and dedication, helping hundreds of students achieve their dreams of studying in the United Kingdom and beyond.
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

      {/* Mission & Values */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 border-0 bg-white hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700">
                We strongly believe that you get only one chance to make that first impression. We work towards your applications with this thought process, striving to deliver quality and honesty. For us, success is measured by the number of positive responses we get, not by the bottom line.
              </p>
            </Card>

            <Card className="p-8 border-0 bg-white hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#17337d] font-bold">•</span>
                  <span><strong>Quality:</strong> Excellence in every service we provide</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#17337d] font-bold">•</span>
                  <span><strong>Honesty:</strong> Transparent and truthful guidance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#17337d] font-bold">•</span>
                  <span><strong>Dedication:</strong> Committed to your success</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#17337d] font-bold">•</span>
                  <span><strong>Innovation:</strong> Constantly improving our services</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose NAWINS Edutech</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Expert Team", desc: "Experienced counselors with proven track record" },
              { icon: Users, title: "Student Network", desc: "Strong community of successful alumni worldwide" },
              { icon: Globe, title: "Global Reach", desc: "Partnerships with top universities worldwide" },
              { icon: Zap, title: "Fast Process", desc: "Streamlined application and visa procedures" },
            ].map((item, idx) => (
              <Card key={idx} className="p-8 border-0 bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-lg transition-shadow">
                <item.icon className="w-12 h-12 text-[#17337d] mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
