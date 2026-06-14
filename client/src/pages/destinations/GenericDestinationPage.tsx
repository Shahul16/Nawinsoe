import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/shared/CTASection";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { GraduationCap, CheckCircle, ArrowRight } from "lucide-react";

interface DestinationConfig {
  name: string;
  flag: string;
  image: string;
  tagline: string;
  why: string[];
  requirements: string[];
  popular: string[];
  intakes: string[];
}

const configs: Record<string, DestinationConfig> = {
  cyprus: {
    name: "Cyprus", flag: "🇨🇾",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    tagline: "Study in the Mediterranean's Academic Hub",
    why: ["EU-recognised degrees","Low tuition fees","English-medium universities","Safe and welcoming environment","Post-study work opportunities in EU"],
    requirements: ["Bachelor's degree or 12th for undergraduate","IELTS 6.0 or equivalent","Strong academic transcripts","Statement of Purpose","Valid passport"],
    popular: ["Business Administration","Hospitality Management","Computer Science","Law","Architecture"],
    intakes: ["September","February"],
  },
  finland: {
    name: "Finland", flag: "🇫🇮",
    image: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=1200&q=80",
    tagline: "World's Best Education System",
    why: ["Ranked #1 education system globally","Many English-taught programmes","Low or no tuition fees at some universities","High quality of life","Strong tech industry"],
    requirements: ["Bachelor's degree","IELTS 6.0 / TOEFL 90","Academic transcripts","Motivation letter","Portfolio (for design/arts)"],
    popular: ["Computer Science & AI","Engineering","Education","Business","Sustainable Technology"],
    intakes: ["September","January"],
  },
  georgia: {
    name: "Georgia", flag: "🇬🇪",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    tagline: "Affordable Medical & Business Education",
    why: ["Very affordable tuition fees","WHO-recognised medical universities","English-medium programmes","Fast visa processing","Growing economy"],
    requirements: ["12th Standard (for MBBS)","Bachelor's for postgraduate","English proficiency letter or IELTS 5.5","Medical fitness certificate (MBBS)","Valid passport"],
    popular: ["MBBS / Medicine","Business Administration","Engineering","Dentistry","Pharmacy"],
    intakes: ["September","February"],
  },
  italy: {
    name: "Italy", flag: "🇮🇹",
    image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=1200&q=80",
    tagline: "Study in the Heart of Art & Innovation",
    why: ["World-class art and design schools","EU-recognised degrees","Rich cultural experience","Affordable living costs","Growing English-taught programmes"],
    requirements: ["12th / Bachelor's degree","IELTS 6.0 or Italian B2","Academic transcripts","Portfolio (design/arts)","Statement of Purpose"],
    popular: ["Fashion Design","Architecture","Fine Arts","Business","Food Science"],
    intakes: ["September","January"],
  },
  japan: {
    name: "Japan", flag: "🇯🇵",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80",
    tagline: "Technology & Innovation Hub of Asia",
    why: ["World-leading technology universities","Scholarships available (MEXT)","Safe country with high quality of life","Strong industry connections","Post-study work pathways"],
    requirements: ["Bachelor's degree","JLPT N2 or IELTS 6.0","Academic transcripts","Research proposal (for PG)","Financial proof"],
    popular: ["Engineering & Robotics","Computer Science","Business","Medicine","Architecture"],
    intakes: ["April","September"],
  },
  malta: {
    name: "Malta", flag: "🇲🇹",
    image: "https://images.unsplash.com/photo-1530531206-6534eb568a68?w=1200&q=80",
    tagline: "Study in Europe's Sunny Island",
    why: ["English is an official language","EU-recognised degrees","Affordable tuition and living","Excellent climate and lifestyle","Growing higher education sector"],
    requirements: ["12th Standard / Bachelor's","IELTS 6.0","Academic transcripts","Statement of Purpose","Financial evidence"],
    popular: ["Business Management","Tourism & Hospitality","IT & Computing","Healthcare","Maritime Studies"],
    intakes: ["October","February"],
  },
  spain: {
    name: "Spain", flag: "🇪🇸",
    image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1200&q=80",
    tagline: "Europe's Vibrant Study Destination",
    why: ["World-class universities","Affordable tuition compared to UK","English & Spanish-medium programmes","Rich culture and lifestyle","Gateway to European job market"],
    requirements: ["12th / Bachelor's degree","IELTS 6.0 or Spanish B2","Academic transcripts","Apostille documents","Statement of Purpose"],
    popular: ["Business & MBA","Tourism","Architecture","Fine Arts","Engineering"],
    intakes: ["September","February"],
  },
  "south-korea": {
    name: "South Korea", flag: "🇰🇷",
    image: "https://images.unsplash.com/photo-1538669715315-155098f0fb1d?w=1200&q=80",
    tagline: "Asia's Tech & Culture Powerhouse",
    why: ["Strong STEM universities","Government scholarships (GKS)","Cutting-edge technology ecosystem","K-culture and vibrant student life","Post-study work options"],
    requirements: ["Bachelor's degree","TOPIK Level 3 or IELTS 5.5","Academic transcripts","Motivation letter","Financial proof"],
    popular: ["Computer Science","Engineering","Business","Korean Language & Culture","Medicine"],
    intakes: ["March","September"],
  },
  switzerland: {
    name: "Switzerland", flag: "🇨🇭",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80",
    tagline: "Excellence in Hospitality & Finance",
    why: ["Home to world's best hospitality schools","Top-ranked research universities","Multilingual environment","Highest graduate salaries in Europe","Switzerland Scholarships available"],
    requirements: ["Bachelor's degree","IELTS 6.5 / TOEFL 100","Academic transcripts","Statement of Purpose","Portfolio (hospitality/arts)"],
    popular: ["Hospitality Management","Finance & Banking","Engineering (ETH Zurich)","Life Sciences","International Relations"],
    intakes: ["September","February"],
  },
  usa: {
    name: "United States", flag: "🇺🇸",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1200&q=80",
    tagline: "World's Most Diverse Higher Education System",
    why: ["Home to world's top-ranked universities","OPT and CPT work opportunities","Diverse campus life","Cutting-edge research facilities","Strong alumni networks globally"],
    requirements: ["Bachelor's degree (for Masters)","GRE/GMAT for most programmes","IELTS 6.5 / TOEFL 90","Statement of Purpose","Letters of Recommendation"],
    popular: ["Computer Science & AI","Business / MBA","Engineering","Data Science","Medicine (MD)"],
    intakes: ["August/September","January"],
  },
  uae: {
    name: "UAE", flag: "🇦🇪",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
    tagline: "Study in the Heart of the Middle East",
    why: ["Tax-free income after graduation","Branches of world-class universities","English-medium education","Growing economy and job market","Strategic location connecting East and West"],
    requirements: ["12th / Bachelor's degree","IELTS 5.5 – 6.5","Academic transcripts","Medical insurance","Valid passport and photographs"],
    popular: ["Business & Finance","Engineering","Architecture","Hospitality","IT & Cybersecurity"],
    intakes: ["September","January"],
  },
};

export default function GenericDestinationPage({ country }: { country: string }) {
  const [, setLocation] = useLocation();
  const cfg = configs[country];

  if (!cfg) {
    return (
      <div className="min-h-screen bg-[#f7f9ff]">
        <Navigation />
        <div className="container py-32 text-center">
          <h1 className="text-3xl font-bold text-[#07173d] mb-4">Coming Soon</h1>
          <p className="text-[#48608f] mb-6">We're adding detailed information for this destination. Contact us to learn more.</p>
          <Button onClick={() => setLocation("/contact")} className="rounded-full bg-gradient-to-r from-[#17337d] to-[#2854c8] text-white font-semibold px-8">
            Contact Us
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero */}
      <section className="relative h-80 overflow-hidden">
        <img src={cfg.image} alt={cfg.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040F23]/90 via-[#040F23]/60 to-transparent" />
        <div className="relative container h-full flex flex-col justify-end pb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-5xl">{cfg.flag}</span>
            <span className="inline-block rounded-full bg-[#C59D50]/20 px-3 py-1 text-xs font-semibold text-[#C59D50]">Study Destination</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-1">Study in {cfg.name}</h1>
          <p className="text-blue-100/90 text-lg">{cfg.tagline}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-14">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Why study here */}
              <div className="bg-white rounded-2xl border border-blue-100/70 p-7">
                <h2 className="text-xl font-bold text-[#07173d] mb-5">Why Study in {cfg.name}?</h2>
                <div className="space-y-3">
                  {cfg.why.map(w => (
                    <div key={w} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#C59D50] flex-shrink-0 mt-0.5" />
                      <p className="text-[#48608f] text-sm">{w}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Entry requirements */}
              <div className="bg-white rounded-2xl border border-blue-100/70 p-7">
                <h2 className="text-xl font-bold text-[#07173d] mb-5">Entry Requirements</h2>
                <div className="space-y-3">
                  {cfg.requirements.map(r => (
                    <div key={r} className="flex items-start gap-3">
                      <ArrowRight className="w-4 h-4 text-[#294fca] flex-shrink-0 mt-0.5" />
                      <p className="text-[#48608f] text-sm">{r}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular courses */}
              <div className="bg-white rounded-2xl border border-blue-100/70 p-7">
                <h2 className="text-xl font-bold text-[#07173d] mb-5">Popular Courses</h2>
                <div className="flex flex-wrap gap-2">
                  {cfg.popular.map(p => (
                    <span key={p} className="rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-sm text-[#294fca] font-medium">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-[#040F23] to-[#06226b] rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5 text-[#C59D50]" />
                  <span className="font-semibold">Quick Facts</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-blue-200">Intakes</span>
                    <span className="text-white font-medium">{cfg.intakes.join(" · ")}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-blue-200">Language</span>
                    <span className="text-white font-medium">English</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Support</span>
                    <span className="text-white font-medium">End-to-end</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-blue-100 p-6">
                <h3 className="font-bold text-[#07173d] mb-3">Get Expert Guidance</h3>
                <p className="text-sm text-[#48608f] mb-4">Our counselors specialise in {cfg.name} admissions. Book a free session today.</p>
                <Button onClick={() => setLocation("/contact")}
                  className="w-full rounded-xl bg-gradient-to-r from-[#17337d] to-[#2854c8] text-white font-semibold mb-2">
                  Book Free Consultation
                </Button>
                <a href="https://wa.me/919943738177" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] py-2.5 text-sm font-semibold text-white hover:bg-[#20c25c] transition">
                  <svg className="w-4 h-4" viewBox="0 0 32 32" fill="white"><path d="M16.002 3C9.375 3 4 8.373 4 15c0 2.385.68 4.61 1.86 6.5L4 29l7.74-1.832A12.93 12.93 0 0016.002 28C22.628 28 28 22.627 28 16S22.628 3 16.002 3z"/></svg>
                  WhatsApp Us
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
