import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { MapPin, GraduationCap, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { fallbackUniversities } from "@/lib/fallbackData";
import { toast } from "sonner";
import CTASection from "@/components/CTASection";

export default function Universities() {
  const [location, setLocation] = useLocation();
  const { data: universities = [] } = trpc.universities.list.useQuery();
  const [localQuery, setLocalQuery] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("q") ?? "";
  });

  const list = universities.length > 0 ? universities : fallbackUniversities;

  const filteredList = useMemo(() => {
    const q = localQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter(uni =>
      `${uni.name} ${uni.location} ${uni.description ?? ""}`.toLowerCase().includes(q)
    );
  }, [list, localQuery]);

  const handleSearch = () => {
    const q = localQuery.trim();
    const path = q ? `/universities?q=${encodeURIComponent(q)}` : "/universities";
    setLocation(path);
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-6">UK Universities</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Explore world-renowned institutions and find your perfect match
          </p>
          <div className="mt-8 flex max-w-3xl gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-200" />
              <Input
                value={localQuery}
                onChange={e => setLocalQuery(e.target.value)}
                placeholder="Search by university, city, or program keywords"
                className="h-12 rounded-full border border-blue-200/40 bg-white/10 pl-10 text-white placeholder:text-blue-100/70"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="h-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-6 text-[#0b1a44] hover:from-amber-300 hover:to-amber-400"
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Universities Grid */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-[#355183]">
              Showing {filteredList.length} universities
            </p>
            {universities.length === 0 && (
              <p className="text-xs rounded-full bg-blue-100 px-3 py-1 text-[#17337d]">
                Curated catalogue mode
              </p>
            )}
          </div>

          {filteredList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-[#355183]">No matching universities found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredList.map((uni) => (
                <Card key={uni.id} className="overflow-hidden rounded-3xl border border-blue-100/70 transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="bg-gradient-to-r from-[#1e3ea2] via-[#274fc6] to-[#396de3] h-40 flex items-center justify-center">
                    <GraduationCap className="w-20 h-20 text-white opacity-80" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#07173d] mb-2">{uni.name}</h3>
                    <div className="flex items-center gap-2 text-[#4b6290] mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{uni.location}</span>
                    </div>
                    <p className="text-[#48608f] text-sm mb-4 line-clamp-3">
                      {uni.description || "Explore world-class programs and opportunities at this prestigious institution."}
                    </p>
                    {uni.ranking && (
                      <p className="text-sm font-semibold text-[#22439f] mb-4">
                        Ranking: #{uni.ranking}
                      </p>
                    )}
                    <Button
                      variant="outline"
                      className="w-full border-blue-200 text-[#17337d] hover:bg-blue-50"
onClick={() => {
                        if ((uni as any).website) {
                          window.open((uni as any).website, "_blank", "noopener,noreferrer");
                        } else {
                          toast.info("Counseling team will help shortlist this university.");
                          setLocation("/contact");
                        }
                      }}
                    >
                      Learn More
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <CTASection
            title="Find Your Perfect University"
            subtitle="Our counselors will help you shortlist universities that match your profile and aspirations"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
