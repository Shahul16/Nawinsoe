import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Cookie, Mail } from "lucide-react";

export default function Cookies() {
  const lastUpdated = "June 2, 2026";

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <Cookie className="w-12 h-12 text-white" />
            <h1 className="text-5xl font-bold text-white">Cookie Policy</h1>
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
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">1. What Are Cookies</h2>
              <p className="text-[#48608f]">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
              </p>
            </Card>

            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">2. Types of Cookies We Use</h2>
              <h3 className="text-xl font-semibold text-[#07173d] mb-3">Essential Cookies</h3>
              <p className="text-[#48608f] mb-4">
                These cookies are necessary for the website to function properly. They enable basic functions like page navigation and secure access.
              </p>
              <h3 className="text-xl font-semibold text-[#07173d] mb-3">Analytics Cookies</h3>
              <p className="text-[#48608f] mb-4">
                These cookies help us understand how visitors interact with our website by collecting anonymous information.
              </p>
              <h3 className="text-xl font-semibold text-[#07173d] mb-3">Marketing Cookies</h3>
              <p className="text-[#48608f]">
                These cookies are used to track visitors across websites to display relevant advertisements.
              </p>
            </Card>

            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">3. Managing Cookies</h2>
              <p className="text-[#48608f] mb-4">
                You can control and delete cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc list-inside text-[#48608f] space-y-2">
                <li>View cookies stored on your device</li>
                <li>Delete all or specific cookies</li>
                <li>Block cookies from specific websites</li>
                <li>Set preferences for cookie acceptance</li>
              </ul>
            </Card>

            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">4. Third-Party Cookies</h2>
              <p className="text-[#48608f]">
                Our website may use services from third parties that set their own cookies, including Google Analytics, social media platforms, and advertising networks.
              </p>
            </Card>

            <Card className="p-8 mb-8 border-0 shadow-md">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">5. Contact Us</h2>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#17337d] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-[#48608f] mb-2">
                    For cookie-related questions:
                  </p>
                  <p className="text-[#48608f]">
                    Email: info@nawinsedutech.com
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