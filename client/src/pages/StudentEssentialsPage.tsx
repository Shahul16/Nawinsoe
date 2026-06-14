import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/shared/CTASection";
import { useLocation } from "wouter";
import { ExternalLink, ChevronRight } from "lucide-react";

const ESSENTIALS = [
  {
    category: "Before You Fly",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-600",
    items: [
      { title: "Passport & Visa", desc: "Ensure your UK Student Visa is stamped and valid for your entire course duration.", icon: "🛂" },
      { title: "Travel Insurance", desc: "Get comprehensive student travel insurance covering medical, loss, and repatriation.", icon: "🏥" },
      { title: "Accommodation Confirmed", desc: "Book university halls or private accommodation before departure.", icon: "🏠" },
      { title: "Flights Booked", desc: "Book return or one-way flight and keep the booking confirmation safe.", icon: "✈️" },
      { title: "Finance Ready", desc: "Carry £2,000–£3,000 for first-month expenses. Set up a UK bank account in advance.", icon: "💳" },
    ],
  },
  {
    category: "On Arrival in the UK",
    color: "bg-purple-50 border-purple-200",
    iconBg: "bg-purple-600",
    items: [
      { title: "BRP (Biometric Residence Permit)", desc: "Collect your BRP within 10 days of arrival from the specified post office.", icon: "🪪" },
      { title: "Register with GP (Doctor)", desc: "Register with a local NHS GP as soon as possible for free healthcare.", icon: "🩺" },
      { title: "UK Bank Account", desc: "Open a bank account with Barclays, Lloyds, or use Monzo/Starling for instant setup.", icon: "🏦" },
      { title: "University Registration", desc: "Complete online enrollment and collect your student ID card.", icon: "🎓" },
      { title: "Transport Card (Oyster)", desc: "Get an 18+ Student Oyster card for discounted travel in London.", icon: "🚇" },
    ],
  },
  {
    category: "During Your Studies",
    color: "bg-green-50 border-green-200",
    iconBg: "bg-green-600",
    items: [
      { title: "Part-Time Work Rights", desc: "As a UK Student visa holder, you can work up to 20 hours/week during term time.", icon: "💼" },
      { title: "Attendance Requirements", desc: "Maintain 85%+ attendance. Universities report to UKVI — avoid visa complications.", icon: "📋" },
      { title: "Council Tax Exemption", desc: "Full-time students are exempt from council tax. Get a certificate from your university.", icon: "🏛️" },
      { title: "Student Discounts (TOTUM/NUS)", desc: "Get a TOTUM card for discounts on food, travel, tech, and entertainment.", icon: "🎫" },
      { title: "Mental Health Support", desc: "All UK universities offer free counseling services. Don't hesitate to use them.", icon: "💚" },
    ],
  },
  {
    category: "Financial Support",
    color: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-600",
    items: [
      { title: "HDFC Credila Education Loan", desc: "Nawins is an official partner of HDFC Credila. Apply for student loans with easy documentation.", icon: "🏦", link: "https://www.hdfccredila.com" },
      { title: "Scholarships & Bursaries", desc: "Many partner universities offer scholarships for Indian students. Ask your Nawins counselor.", icon: "🏆" },
      { title: "Cost of Living Budget", desc: "Estimated monthly budget in UK: Accommodation £600-900, Food £200-300, Transport £100-150.", icon: "📊" },
    ],
  },
  {
    category: "Useful Links & Resources",
    color: "bg-rose-50 border-rose-200",
    iconBg: "bg-rose-600",
    items: [
      { title: "UKVI Official Portal", desc: "Track your visa, check immigration rules, and update your details.", icon: "🌐", link: "https://www.gov.uk/visas-immigration" },
      { title: "UKCISA (Student Advice)", desc: "Free expert advice for international students in the UK.", icon: "📘", link: "https://www.ukcisa.org.uk" },
      { title: "Find a Part-Time Job", desc: "Search for part-time jobs on Indeed, Reed, or your university's career portal.", icon: "🔍", link: "https://www.indeed.co.uk" },
    ],
  },
];

const CHECKLIST = [
  "Valid passport (6+ months beyond course end)",
  "UK Student Visa with correct dates",
  "CAS number and university offer letter",
  "Travel insurance policy",
  "Accommodation confirmation / address",
  "£2,000+ in accessible funds",
  "Bank card usable internationally",
  "University enrollment email",
  "NHS number (apply before flying if possible)",
  "Emergency contact numbers saved",
];

export default function StudentEssentials() {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#030f2d] via-[#06226b] to-[#081b4e]">
        <div className="container max-w-3xl">
          <span className="inline-block rounded-full bg-[#C59D50]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C59D50] mb-5">For Students</span>
          <h1 className="text-5xl font-bold text-white mb-4">Student Essentials</h1>
          <p className="text-blue-100/85 text-lg">Everything you need to know — before you fly, on arrival, and throughout your studies in the UK and abroad.</p>
        </div>
      </section>

      {/* Pre-departure checklist */}
      <section className="py-12 bg-white border-b border-blue-100">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold text-[#07173d] mb-6">✅ Pre-Departure Checklist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHECKLIST.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-[#f7f9ff] border border-blue-100 p-3">
                <div className="w-5 h-5 rounded border-2 border-[#C59D50] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#07173d]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Essentials sections */}
      <section className="py-12">
        <div className="container max-w-4xl space-y-10">
          {ESSENTIALS.map(section => (
            <div key={section.category}>
              <h2 className="text-xl font-bold text-[#07173d] mb-5 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${section.iconBg}`} />
                {section.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {section.items.map(item => (
                  <div key={item.title} className={`rounded-2xl border p-5 ${section.color}`}>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <p className="font-bold text-[#07173d] text-sm mb-1">{item.title}</p>
                        <p className="text-xs text-[#48608f] leading-relaxed">{item.desc}</p>
                        {"link" in item && item.link && (
                          <a href={item.link} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 mt-2 text-xs text-[#294fca] font-semibold hover:underline">
                            Visit website <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
