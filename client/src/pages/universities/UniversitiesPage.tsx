import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink } from "lucide-react";
import { useState } from "react";
import CTASection from "@/components/shared/CTASection";

const COURSE_CATEGORIES = [
  { id: "all",         label: "All Fields",             icon: "🎓" },
  { id: "business",    label: "Business & MBA",          icon: "💼" },
  { id: "engineering", label: "Engineering & Tech",      icon: "⚙️" },
  { id: "medicine",    label: "Medicine & Health",       icon: "🏥" },
  { id: "law",         label: "Law & Humanities",        icon: "⚖️" },
  { id: "sciences",    label: "Natural Sciences",        icon: "🔬" },
  { id: "arts",        label: "Arts & Design",           icon: "🎨" },
];

type Uni = {
  rank: number; name: string; country: string; flag: string;
  category: string; website: string; img: string; field: string;
};

const QS_TOP_50: Uni[] = [
  { rank:1,  name:"Massachusetts Institute of Technology", country:"USA",         flag:"🇺🇸", category:"Engineering & Technology", field:"engineering", website:"https://www.mit.edu",         img:"https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&q=80" },
  { rank:2,  name:"Imperial College London",               country:"UK",          flag:"🇬🇧", category:"Engineering & Technology", field:"engineering", website:"https://www.imperial.ac.uk",   img:"https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80" },
  { rank:3,  name:"University of Oxford",                  country:"UK",          flag:"🇬🇧", category:"Research & Humanities",    field:"law",         website:"https://www.ox.ac.uk",         img:"https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=400&q=80" },
  { rank:4,  name:"Harvard University",                    country:"USA",         flag:"🇺🇸", category:"Business & Law",           field:"business",    website:"https://www.harvard.edu",      img:"https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80" },
  { rank:5,  name:"University of Cambridge",               country:"UK",          flag:"🇬🇧", category:"Research & Humanities",    field:"sciences",    website:"https://www.cam.ac.uk",        img:"https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=400&q=80" },
  { rank:6,  name:"ETH Zurich",                            country:"Switzerland", flag:"🇨🇭", category:"Engineering & Technology", field:"engineering", website:"https://www.ethz.ch",          img:"https://images.unsplash.com/photo-1549921296-3b0f9a35af35?w=400&q=80" },
  { rank:7,  name:"National Univ. of Singapore (NUS)",    country:"Singapore",   flag:"🇸🇬", category:"Business & Law",           field:"business",    website:"https://www.nus.edu.sg",       img:"https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80" },
  { rank:8,  name:"UCL (University College London)",       country:"UK",          flag:"🇬🇧", category:"Medicine & Health",        field:"medicine",    website:"https://www.ucl.ac.uk",        img:"https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&q=80" },
  { rank:9,  name:"Stanford University",                   country:"USA",         flag:"🇺🇸", category:"Engineering & Technology", field:"engineering", website:"https://www.stanford.edu",     img:"https://images.unsplash.com/photo-1502581827181-9cf3c3ee0106?w=400&q=80" },
  { rank:10, name:"University of Edinburgh",               country:"UK",          flag:"🇬🇧", category:"Research & Humanities",    field:"arts",        website:"https://www.ed.ac.uk",         img:"https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=400&q=80" },
  { rank:11, name:"King's College London",                 country:"UK",          flag:"🇬🇧", category:"Medicine & Health",        field:"medicine",    website:"https://www.kcl.ac.uk",        img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80" },
  { rank:12, name:"University of Manchester",              country:"UK",          flag:"🇬🇧", category:"Engineering & Technology", field:"engineering", website:"https://www.manchester.ac.uk", img:"https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&q=80" },
  { rank:13, name:"London School of Economics (LSE)",      country:"UK",          flag:"🇬🇧", category:"Business & Law",           field:"business",    website:"https://www.lse.ac.uk",        img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80" },
  { rank:14, name:"University of Toronto",                 country:"Canada",      flag:"🇨🇦", category:"Research & Humanities",    field:"sciences",    website:"https://www.utoronto.ca",      img:"https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&q=80" },
  { rank:15, name:"University of Melbourne",               country:"Australia",   flag:"🇦🇺", category:"Research & Humanities",    field:"sciences",    website:"https://www.unimelb.edu.au",   img:"https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&q=80" },
  { rank:16, name:"Yale University",                       country:"USA",         flag:"🇺🇸", category:"Business & Law",           field:"law",         website:"https://www.yale.edu",         img:"https://images.unsplash.com/photo-1502581827181-9cf3c3ee0106?w=400&q=80" },
  { rank:17, name:"Cornell University",                    country:"USA",         flag:"🇺🇸", category:"Engineering & Technology", field:"engineering", website:"https://www.cornell.edu",      img:"https://images.unsplash.com/photo-1502581827181-9cf3c3ee0106?w=400&q=80" },
  { rank:18, name:"Columbia University",                   country:"USA",         flag:"🇺🇸", category:"Business & Law",           field:"business",    website:"https://www.columbia.edu",     img:"https://images.unsplash.com/photo-1502581827181-9cf3c3ee0106?w=400&q=80" },
  { rank:19, name:"University of Sydney",                  country:"Australia",   flag:"🇦🇺", category:"Medicine & Health",        field:"medicine",    website:"https://www.sydney.edu.au",    img:"https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&q=80" },
  { rank:20, name:"University of Warwick",                 country:"UK",          flag:"🇬🇧", category:"Business & Law",           field:"business",    website:"https://www.warwick.ac.uk",    img:"https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&q=80" },
  { rank:21, name:"New York University (NYU)",             country:"USA",         flag:"🇺🇸", category:"Business & Law",           field:"business",    website:"https://www.nyu.edu",          img:"https://images.unsplash.com/photo-1502581827181-9cf3c3ee0106?w=400&q=80" },
  { rank:22, name:"Johns Hopkins University",              country:"USA",         flag:"🇺🇸", category:"Medicine & Health",        field:"medicine",    website:"https://www.jhu.edu",          img:"https://images.unsplash.com/photo-1502581827181-9cf3c3ee0106?w=400&q=80" },
  { rank:23, name:"University of Leeds",                   country:"UK",          flag:"🇬🇧", category:"Engineering & Technology", field:"engineering", website:"https://www.leeds.ac.uk",      img:"https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&q=80" },
  { rank:24, name:"Nanyang Technological Univ. (NTU)",    country:"Singapore",   flag:"🇸🇬", category:"Engineering & Technology", field:"engineering", website:"https://www.ntu.edu.sg",       img:"https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80" },
  { rank:25, name:"University of Glasgow",                 country:"UK",          flag:"🇬🇧", category:"Medicine & Health",        field:"medicine",    website:"https://www.gla.ac.uk",        img:"https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=400&q=80" },
  { rank:26, name:"Durham University",                     country:"UK",          flag:"🇬🇧", category:"Research & Humanities",    field:"law",         website:"https://www.durham.ac.uk",     img:"https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&q=80" },
  { rank:27, name:"University of Birmingham",              country:"UK",          flag:"🇬🇧", category:"Medicine & Health",        field:"medicine",    website:"https://www.birmingham.ac.uk", img:"https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&q=80" },
  { rank:28, name:"University of Amsterdam",               country:"Netherlands", flag:"🇳🇱", category:"Business & Law",           field:"business",    website:"https://www.uva.nl",           img:"https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=400&q=80" },
  { rank:29, name:"University of Bristol",                 country:"UK",          flag:"🇬🇧", category:"Engineering & Technology", field:"engineering", website:"https://www.bristol.ac.uk",    img:"https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&q=80" },
  { rank:30, name:"University of Nottingham",              country:"UK",          flag:"🇬🇧", category:"Engineering & Technology", field:"engineering", website:"https://www.nottingham.ac.uk", img:"https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&q=80" },
  { rank:31, name:"University of Sheffield",               country:"UK",          flag:"🇬🇧", category:"Engineering & Technology", field:"engineering", website:"https://www.sheffield.ac.uk",  img:"https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&q=80" },
  { rank:32, name:"University of Southampton",             country:"UK",          flag:"🇬🇧", category:"Engineering & Technology", field:"engineering", website:"https://www.soton.ac.uk",      img:"https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&q=80" },
  { rank:33, name:"University of Auckland",                country:"New Zealand", flag:"🇳🇿", category:"Research & Humanities",    field:"sciences",    website:"https://www.auckland.ac.nz",   img:"https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&q=80" },
  { rank:34, name:"Seoul National University",             country:"South Korea", flag:"🇰🇷", category:"Engineering & Technology", field:"engineering", website:"https://www.snu.ac.kr",        img:"https://images.unsplash.com/photo-1538669715315-155098f0fb1d?w=400&q=80" },
  { rank:35, name:"University of Hong Kong",               country:"Hong Kong",   flag:"🇭🇰", category:"Business & Law",           field:"business",    website:"https://www.hku.hk",           img:"https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&q=80" },
  { rank:36, name:"Karolinska Institute",                  country:"Sweden",      flag:"🇸🇪", category:"Medicine & Health",        field:"medicine",    website:"https://www.ki.se",            img:"https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=400&q=80" },
  { rank:37, name:"McGill University",                     country:"Canada",      flag:"🇨🇦", category:"Medicine & Health",        field:"medicine",    website:"https://www.mcgill.ca",        img:"https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&q=80" },
  { rank:38, name:"Fudan University",                      country:"China",       flag:"🇨🇳", category:"Research & Humanities",    field:"sciences",    website:"https://www.fudan.edu.cn",     img:"https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400&q=80" },
  { rank:39, name:"University of British Columbia",        country:"Canada",      flag:"🇨🇦", category:"Research & Humanities",    field:"sciences",    website:"https://www.ubc.ca",           img:"https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&q=80" },
  { rank:40, name:"Monash University",                     country:"Australia",   flag:"🇦🇺", category:"Medicine & Health",        field:"medicine",    website:"https://www.monash.edu",       img:"https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&q=80" },
  { rank:41, name:"Technical Univ. of Munich (TUM)",      country:"Germany",     flag:"🇩🇪", category:"Engineering & Technology", field:"engineering", website:"https://www.tum.de",           img:"https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&q=80" },
  { rank:42, name:"Sorbonne University",                   country:"France",      flag:"🇫🇷", category:"Research & Humanities",    field:"arts",        website:"https://www.sorbonne-universite.fr", img:"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80" },
  { rank:43, name:"University of Queensland (UQ)",         country:"Australia",   flag:"🇦🇺", category:"Medicine & Health",        field:"medicine",    website:"https://www.uq.edu.au",        img:"https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&q=80" },
  { rank:44, name:"Delft Univ. of Technology (TU Delft)", country:"Netherlands", flag:"🇳🇱", category:"Engineering & Technology", field:"engineering", website:"https://www.tudelft.nl",       img:"https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=400&q=80" },
  { rank:45, name:"University of New South Wales (UNSW)", country:"Australia",   flag:"🇦🇺", category:"Engineering & Technology", field:"engineering", website:"https://www.unsw.edu.au",      img:"https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&q=80" },
  { rank:46, name:"Lund University",                       country:"Sweden",      flag:"🇸🇪", category:"Research & Humanities",    field:"sciences",    website:"https://www.lu.se",            img:"https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=400&q=80" },
  { rank:47, name:"Pennsylvania State University",         country:"USA",         flag:"🇺🇸", category:"Engineering & Technology", field:"engineering", website:"https://www.psu.edu",          img:"https://images.unsplash.com/photo-1502581827181-9cf3c3ee0106?w=400&q=80" },
  { rank:48, name:"University of Zurich",                  country:"Switzerland", flag:"🇨🇭", category:"Medicine & Health",        field:"medicine",    website:"https://www.uzh.ch",           img:"https://images.unsplash.com/photo-1549921296-3b0f9a35af35?w=400&q=80" },
  { rank:49, name:"University of Exeter",                  country:"UK",          flag:"🇬🇧", category:"Business & Law",           field:"business",    website:"https://www.exeter.ac.uk",     img:"https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&q=80" },
  { rank:50, name:"Queen Mary Univ. of London (QMUL)",    country:"UK",          flag:"🇬🇧", category:"Medicine & Health",        field:"medicine",    website:"https://www.qmul.ac.uk",       img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80" },
];

const NAWINS_PARTNERS = [
  { name: "University of Greenwich",     url: "https://www.gre.ac.uk" },
  { name: "University of East London",   url: "https://www.uel.ac.uk" },
  { name: "University of Roehampton",    url: "https://www.roehampton.ac.uk" },
  { name: "Ulster University London",    url: "https://www.ulster.ac.uk" },
  { name: "Univ. of West of Scotland",   url: "https://www.uws.ac.uk" },
  { name: "The University of Law",       url: "https://www.law.ac.uk" },
  { name: "University of Chester",       url: "https://www.chester.ac.uk" },
  { name: "University of Wolverhampton", url: "https://www.wlv.ac.uk" },
  { name: "University of Portsmouth",    url: "https://www.port.ac.uk" },
  { name: "Regent College London",       url: "https://www.rcl.ac.uk" },
];

const FIELD_COLORS: Record<string, string> = {
  engineering: "bg-blue-100 text-blue-800",
  business:    "bg-purple-100 text-purple-800",
  medicine:    "bg-rose-100 text-rose-800",
  law:         "bg-amber-100 text-amber-800",
  sciences:    "bg-green-100 text-green-800",
  arts:        "bg-orange-100 text-orange-800",
};

export default function Universities() {
  const [search, setSearch] = useState("");
  const [activeField, setActiveField] = useState("all");

  const filtered = QS_TOP_50.filter(u => {
    const matchSearch = !search.trim() ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.country.toLowerCase().includes(search.toLowerCase());
    const matchField = activeField === "all" || u.field === activeField;
    return matchSearch && matchField;
  });

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#030f2d] via-[#06226b] to-[#081b4e]">
        <div className="container">
          <span className="inline-block rounded-full bg-[#C59D50]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C59D50] mb-5">QS World Rankings 2025</span>
          <h1 className="text-5xl font-bold text-white mb-4">Top 50 Universities</h1>
          <p className="text-blue-100/85 text-lg max-w-2xl mb-8">Click any university to visit their official website. Apply through Nawins Education for expert support.</p>
          <div className="max-w-lg">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200" />
              <Input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search university or country..."
                className="h-12 rounded-full border-blue-200/40 bg-white/10 pl-10 text-white placeholder:text-blue-100/60" />
            </div>
          </div>
        </div>
      </section>

      {/* Course Category Tabs — like IDP/AHZ */}
      <section className="py-4 bg-white border-b border-blue-100 sticky top-[68px] z-40">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {COURSE_CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setActiveField(cat.id)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                  activeField === cat.id
                    ? "bg-[#040F23] text-white"
                    : "bg-[#f7f9ff] text-[#48608f] border border-blue-100 hover:border-[#C59D50] hover:text-[#C59D50]"
                }`}>
                <span>{cat.icon}</span>{cat.label}
              </button>
            ))}
            <span className="ml-auto text-xs text-[#94a3b8] self-center shrink-0 pl-4">{filtered.length} results</span>
          </div>
        </div>
      </section>

      {/* QS Grid */}
      <section className="py-10">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {filtered.map(uni => (
              <a key={uni.rank} href={uni.website} target="_blank" rel="noopener noreferrer"
                className="group rounded-2xl overflow-hidden bg-white border border-blue-100/70 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="relative h-28 overflow-hidden bg-[#0B1E4D]">
                  <img src={uni.img} alt={uni.name} loading="lazy"
                    className="h-full w-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040F23]/70 to-transparent" />
                  <span className="absolute top-2 left-2 rounded-full bg-[#C59D50] px-2 py-0.5 text-[10px] font-bold text-[#040F23]">#{uni.rank}</span>
                  <span className="absolute top-2 right-2 text-base">{uni.flag}</span>
                  <ExternalLink className="absolute bottom-2 right-2 w-3.5 h-3.5 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-3">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1.5 inline-block ${FIELD_COLORS[uni.field] || "bg-gray-100 text-gray-700"}`}>
                    {uni.category}
                  </span>
                  <p className="text-xs font-bold text-[#07173d] leading-tight group-hover:text-[#1a3a8c] transition-colors">{uni.name}</p>
                  <p className="text-[10px] text-[#94a3b8] mt-0.5">{uni.country}</p>
                </div>
              </a>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-[#48608f]">
              <Search className="w-10 h-10 mx-auto mb-3 text-[#94a3b8]" />
              <p>No universities match your search. Try different keywords.</p>
            </div>
          )}
          <p className="text-center text-xs text-[#94a3b8] mt-8">Source: QS World University Rankings 2025 · Click any card to visit the university website directly</p>
        </div>
      </section>

      {/* Nawins Active Partners */}
      <section className="py-12 bg-white border-t border-blue-100/50">
        <div className="container">
          <div className="text-center mb-8">
            <span className="inline-block rounded-full bg-[#C59D50]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C59D50] mb-3">Active Partners</span>
            <h2 className="text-2xl font-bold text-[#07173d]">Our UK University Partners</h2>
            <p className="text-sm text-[#48608f]">Universities we actively work with — apply through Nawins Education for expert support</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {NAWINS_PARTNERS.map(p => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                className="rounded-xl border border-blue-100 bg-[#f7f9ff] p-3 text-center text-xs font-semibold text-[#07173d] hover:border-[#C59D50] hover:text-[#C59D50] transition-all flex items-center justify-center gap-1 group">
                {p.name} <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
