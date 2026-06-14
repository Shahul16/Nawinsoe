import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";

const PRIMARY = [
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    tag: "Primary Market",
    tagColor: "bg-amber-500 text-white",
    programs: ["Business", "CS", "Engineering", "Law", "Medicine"],
    count: 120,
    href: "/study-in-uk",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
  },
];

const SECONDARY = [
  { name: "Australia",     flag: "🇦🇺", programs: ["Nursing", "Engineering"],      count: 65,  href: "/study-in-australia",   image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80" },
  { name: "Canada",        flag: "🇨🇦", programs: ["MBA", "Computer Science"],     count: 80,  href: "/study-in-canada",      image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80" },
  { name: "Cyprus",        flag: "🇨🇾", programs: ["Business", "Hospitality"],     count: 12,  href: "/study-in-cyprus",       image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
  { name: "France",        flag: "🇫🇷", programs: ["Fashion", "Business", "Arts"], count: 45,  href: "/study-in-france",      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80" },
  { name: "Finland",       flag: "🇫🇮", programs: ["Technology", "Education"],     count: 14,  href: "/study-in-finland",      image: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=800&q=80" },
  { name: "Germany",       flag: "🇩🇪", programs: ["Engineering", "Design"],       count: 54,  href: "/study-in-germany",     image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80" },
  { name: "Georgia",       flag: "🇬🇪", programs: ["Medicine", "Business"],        count: 10,  href: "/study-in-georgia",      image: "https://images.unsplash.com/photo-1619425764519-ef4e2f7e0f4f?w=800&q=80" },
  { name: "Ireland",       flag: "🇮🇪", programs: ["Business", "Law"],             count: 28,  href: "/study-in-ireland",     image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=800&q=80" },
  { name: "Italy",         flag: "🇮🇹", programs: ["Design", "Architecture"],      count: 22,  href: "/study-in-italy",        image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800&q=80" },
  { name: "Japan",         flag: "🇯🇵", programs: ["Engineering", "Technology"],   count: 18,  href: "/study-in-japan",        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80" },
  { name: "Malta",         flag: "🇲🇹", programs: ["Business", "Tourism"],         count: 8,   href: "/study-in-malta",        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
  { name: "Netherlands",   flag: "🇳🇱", programs: ["Business", "Technology"],      count: 35,  href: "/study-in-netherlands", image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=800&q=80" },
  { name: "Spain",         flag: "🇪🇸", programs: ["Business", "Tourism"],         count: 30,  href: "/study-in-spain",        image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80" },
  { name: "South Korea",   flag: "🇰🇷", programs: ["Technology", "Business"],      count: 20,  href: "/study-in-south-korea",  image: "https://images.unsplash.com/photo-1538669715315-155098f0fb1d?w=800&q=80" },
  { name: "Switzerland",   flag: "🇨🇭", programs: ["Hospitality", "Finance"],      count: 16,  href: "/study-in-switzerland",  image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80" },
  { name: "United States", flag: "🇺🇸", programs: ["Business", "Technology"],      count: 200, href: "/study-in-usa",          image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80" },
  { name: "UAE",           flag: "🇦🇪", programs: ["Business", "Hospitality"],     count: 25,  href: "/study-in-uae",          image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80" },
  { name: "New Zealand",   flag: "🇳🇿", programs: ["Agriculture", "Engineering"],  count: 18,  href: "/study-in-new-zealand", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80" },
];

export default function Destinations() {
  const [, setLocation] = useLocation();

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-14">
          <span className="inline-block rounded-full bg-[#C59D50]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C59D50] mb-4">
            Study Abroad
          </span>
          <h2 className="text-4xl font-bold text-[#07173d] mb-2">Study Destinations</h2>
          <p className="text-lg text-[#48608f]">
            1 primary market · 18 secondary markets — all supported by Nawins Education
          </p>
        </div>

        {/* PRIMARY — UK full-width hero card */}
        <div className="mb-8">
          {PRIMARY.map(d => (
            <Card
              key={d.name}
              onClick={() => setLocation(d.href)}
              className="relative rounded-3xl overflow-hidden border-0 cursor-pointer group h-64 md:h-72"
            >
              <img src={d.image} alt="Study in UK" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#040F23]/90 via-[#040F23]/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{d.flag}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${d.tagColor} flex items-center gap-1`}>
                    <Star className="w-3 h-3" /> {d.tag}
                  </span>
                </div>
                <h3 className="text-3xl font-extrabold text-white mb-1">{d.name}</h3>
                <p className="text-blue-200 text-sm mb-2">{d.count}+ universities · {d.programs.join(", ")}</p>
                <span className="inline-flex items-center gap-1 text-[#C59D50] text-sm font-semibold">
                  Explore UK universities <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* SECONDARY — compact grid */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#94a3b8] mb-4">Secondary Markets</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SECONDARY.map(d => (
              <Card
                key={d.name}
                onClick={() => setLocation(d.href)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group h-28 border-0"
              >
                <img src={d.image} alt={d.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040F23]/85 via-[#040F23]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">{d.flag}</span>
                    <span className="text-white font-semibold text-xs leading-tight">{d.name}</span>
                  </div>
                  <p className="text-[10px] text-blue-200/80 mt-0.5">{d.count}+ universities</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => setLocation("/destinations")}
            className="inline-flex items-center gap-2 rounded-full border border-[#C59D50] px-8 py-3 text-sm font-semibold text-[#C59D50] hover:bg-[#C59D50] hover:text-white transition-all"
          >
            View All Destinations <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
