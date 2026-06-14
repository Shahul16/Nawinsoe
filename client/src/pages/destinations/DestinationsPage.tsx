import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/shared/CTASection";
import { useLocation } from "wouter";
import { ArrowRight, Star } from "lucide-react";

const PRIMARY = {
  name: "United Kingdom", flag: "🇬🇧", tag: "Primary Market",
  image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80",
  desc: "The most popular destination for Indian students. World-class universities, post-study work visa, and direct routes through our ConnectedHE partner network.",
  stats: ["120+ partner universities","95% visa success rate","January & September intakes","Post-Study Work Visa available"],
  href: "/study-in-uk",
};

const SECONDARY = [
  { name:"Australia",   flag:"🇦🇺", count:"65+",  href:"/study-in-australia",   img:"https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",  tag:"Post-study work", popular:["Nursing","Engineering","Business"] },
  { name:"Canada",      flag:"🇨🇦", count:"80+",  href:"/study-in-canada",      img:"https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80", tag:"PR pathway",      popular:["MBA","CS","Finance"] },
  { name:"Ireland",     flag:"🇮🇪", count:"28+",  href:"/study-in-ireland",     img:"https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=800&q=80", tag:"EU gateway",      popular:["Business","Law","IT"] },
  { name:"Germany",     flag:"🇩🇪", count:"54+",  href:"/study-in-germany",     img:"https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80", tag:"Low/no fees",     popular:["Engineering","Design","MBA"] },
  { name:"Netherlands", flag:"🇳🇱", count:"35+",  href:"/study-in-netherlands", img:"https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=800&q=80", tag:"English-taught",  popular:["Business","Tech","Design"] },
  { name:"New Zealand", flag:"🇳🇿", count:"18+",  href:"/study-in-new-zealand", img:"https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80", tag:"Work rights",     popular:["Agriculture","Engineering","CS"] },
  { name:"France",      flag:"🇫🇷", count:"45+",  href:"/study-in-france",      img:"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80", tag:"Grandes Écoles",  popular:["Fashion","Business","Arts"] },
  { name:"Switzerland", flag:"🇨🇭", count:"16+",  href:"/study-in-switzerland", img:"https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80", tag:"Top salaries",    popular:["Hospitality","Finance","Science"] },
  { name:"USA",         flag:"🇺🇸", count:"200+", href:"/study-in-usa",         img:"https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80", tag:"OPT/CPT",         popular:["CS","MBA","Engineering"] },
  { name:"UAE",         flag:"🇦🇪", count:"25+",  href:"/study-in-uae",         img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", tag:"Tax-free income", popular:["Business","Hospitality","IT"] },
  { name:"Italy",       flag:"🇮🇹", count:"22+",  href:"/study-in-italy",       img:"https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800&q=80", tag:"Art & Design",    popular:["Fashion","Architecture","Arts"] },
  { name:"Spain",       flag:"🇪🇸", count:"30+",  href:"/study-in-spain",       img:"https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80", tag:"EU lifestyle",    popular:["Business","Tourism","Architecture"] },
  { name:"Japan",       flag:"🇯🇵", count:"18+",  href:"/study-in-japan",       img:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80", tag:"Tech & robotics", popular:["Engineering","CS","Medicine"] },
  { name:"South Korea", flag:"🇰🇷", count:"20+",  href:"/study-in-south-korea", img:"https://images.unsplash.com/photo-1538669715315-155098f0fb1d?w=800&q=80", tag:"GKS Scholarship", popular:["Tech","Business","Culture"] },
  { name:"Finland",     flag:"🇫🇮", count:"14+",  href:"/study-in-finland",     img:"https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=800&q=80", tag:"#1 Education",    popular:["Tech","Education","Science"] },
  { name:"Cyprus",      flag:"🇨🇾", count:"12+",  href:"/study-in-cyprus",      img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", tag:"EU-recognised",   popular:["Business","Hospitality","Law"] },
  { name:"Georgia",     flag:"🇬🇪", count:"10+",  href:"/study-in-georgia",     img:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80", tag:"Affordable MBBS", popular:["Medicine","Business","Pharmacy"] },
  { name:"Malta",       flag:"🇲🇹", count:"8+",   href:"/study-in-malta",       img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", tag:"English island",  popular:["Business","Tourism","IT"] },
];

export default function DestinationsPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#030f2d] via-[#06226b] to-[#081b4e]">
        <div className="container text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-[#C59D50]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C59D50] mb-5">
            1 Primary · 18 Secondary Markets
          </span>
          <h1 className="text-5xl font-extrabold text-white mb-4">Study Destinations</h1>
          <p className="text-blue-100/85 text-lg">
            From the UK to Japan, we guide students to 19 countries across the globe. Click any destination to explore universities, requirements, and scholarships.
          </p>
        </div>
      </section>

      {/* UK Primary Hero Card */}
      <section className="py-12 bg-white">
        <div className="container">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C59D50] mb-4">
            <Star className="w-3.5 h-3.5 inline mr-1" /> Primary Market
          </p>
          <div
            className="relative rounded-3xl overflow-hidden cursor-pointer group h-72 md:h-80"
            onClick={() => setLocation(PRIMARY.href)}
          >
            <img src={PRIMARY.image} alt="UK" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040F23]/92 via-[#040F23]/60 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-5xl">{PRIMARY.flag}</span>
                <span className="rounded-full bg-[#C59D50] px-3 py-1 text-xs font-bold text-[#040F23]">{PRIMARY.tag}</span>
              </div>
              <h2 className="text-4xl font-extrabold text-white mb-2">{PRIMARY.name}</h2>
              <p className="text-blue-200/90 text-sm max-w-lg mb-4">{PRIMARY.desc}</p>
              <div className="flex flex-wrap gap-3 mb-4">
                {PRIMARY.stats.map(s => (
                  <span key={s} className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs text-blue-100">{s}</span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 text-[#C59D50] font-semibold text-sm">
                Explore UK universities <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Grid */}
      <section className="py-12 bg-[#f7f9ff]">
        <div className="container">
          <h2 className="text-2xl font-bold text-[#07173d] mb-2">Secondary Markets</h2>
          <p className="text-[#48608f] text-sm mb-8">18 additional destinations — click any to explore universities, requirements and scholarships</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SECONDARY.map(dest => (
              <div
                key={dest.name}
                onClick={() => setLocation(dest.href)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer h-44"
              >
                <img src={dest.img} alt={dest.name} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040F23]/90 via-[#040F23]/30 to-transparent" />
                {/* Tag */}
                <span className="absolute top-2 left-2 rounded-full bg-[#C59D50] px-2 py-0.5 text-[9px] font-bold text-[#040F23]">
                  {dest.tag}
                </span>
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xl">{dest.flag}</span>
                    <span className="text-white font-bold text-xs leading-tight">{dest.name}</span>
                  </div>
                  <p className="text-[10px] text-blue-200/80">{dest.count} universities</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {dest.popular.slice(0,2).map(p => (
                      <span key={p} className="rounded bg-white/15 px-1.5 py-0.5 text-[9px] text-white">{p}</span>
                    ))}
                  </div>
                </div>
                {/* Arrow on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="rounded-full bg-[#C59D50] p-2">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
