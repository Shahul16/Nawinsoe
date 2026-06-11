import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { fallbackUniversities } from "@/lib/fallbackData";
import CTASection from "@/components/CTASection";
import { getUniversityAssetByName } from "@/lib/universityAssets";

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
    const withAssets = list
      .map((uni: any) => {
        const asset = getUniversityAssetByName(uni.name);
        if (!asset) return null; // no placeholders
        return {
          ...uni,
          _asset: asset,
        };
      })
      .filter(Boolean) as Array<any>;

    if (!q) return withAssets;

    return withAssets.filter((uni) =>
      `${uni.name} ${uni.location} ${uni.description ?? ""} ${uni._asset.websiteUrl}`.toLowerCase().includes(q)
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
              {filteredList.map((uni: any) => (
                <Card
                  key={uni.id ?? uni.name}
                  className="overflow-hidden rounded-3xl border border-blue-100/70 transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-44 bg-[#0B1E4D]">
                    <img
                      src={uni._asset.campusImageUrl}
                      alt={`${uni.name} campus`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute left-5 bottom-4 flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/15 overflow-hidden">
                        <img
                          src={uni._asset.logoUrl}
                          alt={`${uni.name} logo`}
                          loading="lazy"
                          className="h-10 w-10 object-contain"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold uppercase tracking-widest text-white/90">
                          {uni._asset.country === "UK"
                            ? "United Kingdom"
                            : uni._asset.country === "CA"
                              ? "Canada"
                              : uni._asset.country === "AU"
                                ? "Australia"
                                : uni._asset.country === "IE"
                                  ? "Ireland"
                                  : "Germany"}
                        </span>
                        <span className="text-sm font-bold text-white">{uni.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[#4b6290] mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{uni.location}</span>
                    </div>

                    <p className="text-[#48608f] text-sm mb-4 line-clamp-3">
                      {uni.shortDescription ?? uni.description ?? uni._asset.shortDescription ?? ""}
                    </p>

                    {uni.ranking ? (
                      <p className="text-sm font-semibold text-[#22439f] mb-4">
                        Ranking: #{uni.ranking}
                      </p>
                    ) : null}

                    <Button
                      variant="outline"
                      className="w-full border-[#0B1E4D]/40 text-[#040F23] hover:bg-[#0B1E4D]/5 rounded-full"
                      onClick={() => {
                        window.open(uni._asset.websiteUrl, "_blank", "noopener,noreferrer");
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
