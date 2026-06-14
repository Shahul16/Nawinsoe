import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Scale, FileText, Mail } from "lucide-react";

export default function Terms() {
  const lastUpdated = "February 6, 2026";

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <Scale className="w-12 h-12 text-white" />
            <h1 className="text-5xl font-bold text-white">Terms of Service</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#f7f9ff]">
        <div className="container max-w-4xl">
          <div className="prose prose-lg prose-blue mx-auto">
            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">1. Acceptance of Terms</h2>
              <p className="text-[#48608f] mb-4">
                By accessing and using the Nawins Edutech website and services provided by Nawins Edutech Private Limited, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </Card>

            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">2. Description of Services</h2>
              <p className="text-[#48608f] mb-4">
                Nawins Edutech provides educational consulting services including:
              </p>
              <ul className="list-disc list-inside text-[#48608f] space-y-2">
                <li>University admission counseling</li>
                <li>Course selection guidance</li>
                <li>Application assistance</li>
                <li>Visa consultation</li>
                <li>Test preparation guidance</li>
                <li>Pre-departure orientation</li>
              </ul>
            </Card>

            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">3. User Responsibilities</h2>
              <p className="text-[#48608f] mb-4">
                As a user of our services, you agree to:
              </p>
              <ul className="list-disc list-inside text-[#48608f] space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Submit authentic academic documents</li>
                <li>Meet application deadlines</li>
                <li>Comply with university requirements</li>
                <li>Use our services for lawful purposes only</li>
              </ul>
            </Card>

            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">4. Fees and Payments</h2>
              <p className="text-[#48608f] mb-4">
                Our service fees are outlined in the service agreement provided during consultation. Payment terms:
              </p>
              <ul className="list-disc list-inside text-[#48608f] space-y-2">
                <li>Fees are non-refundable once services are rendered</li>
                <li>University application fees are separate</li>
                <li>Payment schedules are outlined in individual agreements</li>
                <li>All fees are in INR unless otherwise specified</li>
              </ul>
            </Card>

            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">5. Limitation of Liability</h2>
              <p className="text-[#48608f] mb-4">
                Nawins Education:
              </p>
              <ul className="list-disc list-inside text-[#48608f] space-y-2">
                <li>Does not guarantee university admission</li>
                <li>Does not guarantee visa approval</li>
                <li>Is not responsible for university decisions</li>
                <li>Is not liable for delays caused by third parties</li>
                <li>Provides guidance but final decisions rest with the student</li>
              </ul>
            </Card>

            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">6. Intellectual Property</h2>
              <p className="text-[#48608f]">
                All content on this website, including text, graphics, logos, and software, is the property of NAWINS EDUTECH PRIVATE LIMITED and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without our written consent.
              </p>
            </Card>

            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">7. Termination</h2>
              <p className="text-[#48608f]">
                We reserve the right to terminate or suspend your access to our services if you violate these terms. Upon termination, you will no longer have access to our consulting services.
              </p>
            </Card>

            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">8. Contact Information</h2>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#17337d] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-[#48608f] mb-2">
                    For questions about these terms:
                  </p>
                  <p className="text-[#48608f]">
                    Email: info@nawinsedutech.com<br />
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