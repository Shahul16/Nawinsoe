import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/CTASection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { GraduationCap, CalendarDays, Landmark, ShieldCheck, ExternalLink } from "lucide-react";

type Scholarship = {
  country: "UK" | "Canada" | "Australia";
  name: string;
  amount: string;
  university: string;
  eligibility: string;
  deadline: string;
  applyUrl?: string;
};

const SCHOLARSHIPS: Scholarship[] = [
  {
    country: "UK",
    name: "International Excellence Award (Example)",
    amount: "Up to 50% tuition discount",
    university: "Partner University",
    eligibility: "Strong academics + relevant course fit.",
    deadline: "Varies by intake (typically Jan/Aug)",
    applyUrl: "https://www.nawinsedutech.com",
  },
  {
    country: "UK",
    name: "Undergraduate Merit Scholarship (Example)",
    amount: "£1,000–£3,000",
    university: "Partner University",
    eligibility: "Excellent grade profile + completed application requirements.",
    deadline: "Varies by university",
    applyUrl: "https://www.nawinsedutech.com",
  },
  {
    country: "Canada",
    name: "International Student Scholarship (Example)",
    amount: "CAD 5,000–CAD 15,000",
    university: "Partner University",
    eligibility: "Academic excellence + supporting documents.",
    deadline: "Typically spring/summer intakes",
    applyUrl: "https://www.nawinsedutech.com",
  },
  {
    country: "Australia",
    name: "Global Academic Scholarship (Example)",
    amount: "AUD 2,000–AUD 10,000",
    university: "Partner University",
    eligibility: "Strong grades + course eligibility.",
    deadline: "Depends on intake",
    applyUrl: "https://www.nawinsedutech.com",
  },
];

function SectionTitle({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full bg-[#C59D50]/15 border border-[#C59D50]/25">
        {icon}
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C59D50]">Scholarships</span>
      </div>
      <h1 className="text-5xl font-bold text-[#07173d] mb-4">{title}</h1>
      <p className="text-xl text-[#48608f] max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}

export default function ScholarshipPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-[#030f2d] via-[#06226b] to-[#081b4e]">
        <div className="container max-w-4xl">
          <span className="inline-block rounded-full bg-[#C59D50]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C59D50] mb-5">
            Scholarships & Bursaries
          </span>
          <h1 className="text-5xl font-bold text-white mb-4">Find funding for your study abroad journey</h1>
          <p className="text-blue-100/85 text-lg">
            Nawins Education helps you identify scholarship opportunities and prepare the right application documents.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container max-w-6xl">
          <SectionTitle
            icon={<GraduationCap className="w-5 h-5" />}
            title="Scholarships (UK • Canada • Australia)"
            subtitle="Scholarship availability varies by university and intake. We share options based on your profile during consultation."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SCHOLARSHIPS.map((s) => (
              <Card key={`${s.country}-${s.name}`} className="p-6 border border-blue-100 bg-white">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#C59D50]/15 border border-[#C59D50]/25 px-3 py-1 mb-3">
                      <Landmark className="w-4 h-4 text-[#C59D50]" />
                      <span className="text-xs font-semibold text-[#C59D50]">{s.country}</span>
                    </div>
                    <h2 className="text-xl font-bold text-[#07173d]">{s.name}</h2>
                    <p className="text-sm text-[#48608f] mt-1">University: {s.university}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#48608f]">Amount</p>
                    <p className="text-lg font-bold text-green-700">{s.amount}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
                    <p className="text-sm text-[#48608f]">{s.eligibility}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CalendarDays className="w-5 h-5 text-[#C59D50] mt-0.5" />
                    <p className="text-sm text-[#48608f]">Deadline: {s.deadline}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    onClick={() => setLocation("/free-assessment")}
                    className="bg-[#C59D50] hover:bg-[#B78D42] text-white rounded-full px-6"
                  >
                    Get scholarship match
                  </Button>
                  {s.applyUrl && (
                    <Button
                      onClick={() => window.open(s.applyUrl!, "_blank")}
                      variant="outline"
                      className="border-[#C59D50]/50 text-[#07173d] hover:bg-[#C59D50]/10 rounded-full px-6"
                    >
                      Learn more
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10">
            <Card className="p-6 border border-blue-100 bg-white">
              <h3 className="text-lg font-bold text-[#07173d] mb-2">Want a personalized scholarship shortlist?</h3>
              <p className="text-sm text-[#48608f]">
                Share your academic background, test score (if any), preferred country/intake, and budget. We will identify scholarships that fit your profile.
              </p>
              <div className="mt-4">
                <Button
                  onClick={() => setLocation("/book-consultation")}
                  className="bg-[#040F23] hover:bg-[#06226b] text-white rounded-full px-6"
                >
                  Book consultation
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <CTASection
            title="Scholarship guidance, not generic lists"
            subtitle="We match funding options based on your profile and intake — then guide your application steps."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

