import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Images } from "lucide-react";
import { useLocation } from "wouter";

export default function Gallery() {
  const [, setLocation] = useLocation();

  const galleryStreams = [
    "Campus Visits",
    "Visa Success Meetups",
    "Student Farewell Events",
    "University Spotlight Series",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-6">Gallery</h1>
          <p className="text-xl text-purple-100 max-w-2xl">
            Moments from our community and partner universities
          </p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-12 border-0 bg-gradient-to-br from-purple-50 to-blue-50 text-center lg:col-span-2">
              <Images className="w-20 h-20 text-purple-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Visual Stories Landing Soon</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                We are curating campus moments, event highlights, and student milestones from the Nawins journey.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => setLocation("/contact")}
                >
                  Share Your Story
                </Button>
                <Button variant="outline" onClick={() => setLocation("/universities")}>
                  View UK Universities
                </Button>
              </div>
            </Card>

            <Card className="p-6 border-0 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Gallery Streams</h3>
              <ul className="space-y-3 text-gray-700">
                {galleryStreams.map(stream => (
                  <li key={stream} className="rounded-md bg-white px-3 py-2 border border-gray-200">
                    {stream}
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
