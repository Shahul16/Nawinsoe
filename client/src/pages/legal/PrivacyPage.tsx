import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Shield, Cookie, User, Mail, Database, Lock } from "lucide-react";

export default function Privacy() {
  const lastUpdated = "Jun 2, 2026";

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <Shield className="w-12 h-12 text-white" />
            <h1 className="text-5xl font-bold text-white">Privacy Policy</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container max-w-4xl">
          <div className="prose prose-lg prose-blue mx-auto">
            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">1. Introduction</h2>
              <p className="text-[#48608f] mb-4">
                Nawins Edutech Private Limited ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p className="text-[#48608f]">
                By accessing our website or providing your information to us, you agree to the collection and use of your information in accordance with this policy.
              </p>
            </Card>

            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-[#07173d] mb-3 flex items-center gap-2">
                <User className="w-5 h-5 text-[#17337d]" />
                Personal Information
              </h3>
              <p className="text-[#48608f] mb-4">
                We may collect personal information that you voluntarily provide to us, including:
              </p>
              <ul className="list-disc list-inside text-[#48608f] space-y-2 mb-6">
                <li>Name and contact information (email, phone number, address)</li>
                <li>Educational background and academic records</li>
                <li>Passport and identification details</li>
                <li>Financial information for payment processing</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#07173d] mb-3 flex items-center gap-2">
                <Database className="w-5 h-5 text-[#17337d]" />
                Automatically Collected Information
              </h3>
              <p className="text-[#48608f] mb-4">
                When you visit our website, we automatically collect:
              </p>
              <ul className="list-disc list-inside text-[#48608f] space-y-2">
                <li>Device information (browser type, operating system)</li>
                <li>IP address and location data</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </Card>

            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">3. How We Use Your Information</h2>
              <p className="text-[#48608f] mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-[#48608f] space-y-2">
                <li>Providing educational consulting services</li>
                <li>Processing university applications</li>
                <li>Sending application updates and communications</li>
                <li>Improving our website and services</li>
                <li>Marketing and promotional communications (with your consent)</li>
                <li>Complying with legal obligations</li>
              </ul>
            </Card>

            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">4. Information Sharing</h2>
              <p className="text-[#48608f] mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-[#48608f] space-y-2">
                <li>Universities and educational institutions for application purposes</li>
                <li>Service providers who assist our operations</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your explicit consent</li>
              </ul>
            </Card>

            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">5. Data Security</h2>
              <div className="flex items-start gap-4 mb-4">
                <Lock className="w-6 h-6 text-[#17337d] flex-shrink-0 mt-1" />
                <p className="text-[#48608f]">
                  We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">6. Your Rights</h2>
              <p className="text-[#48608f] mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-[#48608f] space-y-2">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Withdraw consent at any time</li>
                <li>Data portability</li>
              </ul>
            </Card>

            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">7. Contact Us</h2>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#17337d] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-[#48608f] mb-2">
                    For privacy-related questions, please contact:
                  </p>
                  <p className="text-[#48608f]">
                    Email: privacy@nawinsedutech.com<br />
                    Address: No 59/3 - 13/4, 3rd Floor, HDFC Bank Upstairs, Marappa Gounder Plaza, West Car Street, Tiruchengode, Namakkal – 637211
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}