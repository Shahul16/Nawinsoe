import React, { useState } from "react";

const PARTNERS = [
  { name: "University of Greenwich",     domain: "gre.ac.uk",        color: "#003B71", text: "UG" },
  { name: "University of East London",   domain: "uel.ac.uk",        color: "#CF0E25", text: "UEL" },
  { name: "University of Roehampton",    domain: "roehampton.ac.uk", color: "#00467F", text: "UR" },
  { name: "Ulster University London",    domain: "ulster.ac.uk",     color: "#003865", text: "UU" },
  { name: "Univ. of West of Scotland",   domain: "uws.ac.uk",        color: "#005EB8", text: "UWS" },
  { name: "The University of Law",       domain: "law.ac.uk",        color: "#8B0000", text: "UL" },
  { name: "University of Chester",       domain: "chester.ac.uk",    color: "#003057", text: "UC" },
  { name: "University of Wolverhampton", domain: "wlv.ac.uk",        color: "#5B2C8D", text: "UW" },
  { name: "University of Portsmouth",    domain: "port.ac.uk",       color: "#003A70", text: "UP" },
  { name: "Regent College London",       domain: "rcl.ac.uk",        color: "#1B3A6B", text: "RC" },
  { name: "QA Higher Education",         domain: "qa.com",           color: "#E6007E", text: "QA" },
  { name: "University of Hertfordshire", domain: "herts.ac.uk",      color: "#009A44", text: "UH" },
];

function LogoCard({ name, domain, color, text }: typeof PARTNERS[0]) {
  const [err, setErr] = useState(false);
  return (
    <div className="flex shrink-0 flex-col items-center justify-center gap-2 h-[96px] w-[180px] rounded-xl bg-white border border-gray-100 shadow-sm px-4 hover:shadow-md hover:border-[#C59D50]/40 transition-all duration-300 hover:-translate-y-0.5">
      {!err ? (
        <img
          src={`https://logo.clearbit.com/${domain}`}
          alt={name}
          onError={() => setErr(true)}
          className="h-9 w-auto max-w-[120px] object-contain"
          loading="lazy"
        />
      ) : (
        <div className="h-9 w-9 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: color }}>
          {text}
        </div>
      )}
      <p className="text-[10px] font-semibold text-center text-[#040F23] leading-tight">{name}</p>
    </div>
  );
}

// Triple the array so seamless infinite loop works at any screen width
const R1 = [...PARTNERS, ...PARTNERS, ...PARTNERS];
const R2 = [...PARTNERS, ...PARTNERS, ...PARTNERS].reverse();

export default function PartnersWall() {
  return (
    <section className="py-16 bg-[#f7f9ff] overflow-hidden">
      <style>{`
        @keyframes scroll-left  { 0%{transform:translateX(0)} 100%{transform:translateX(-33.333%)} }
        @keyframes scroll-right { 0%{transform:translateX(-33.333%)} 100%{transform:translateX(0)} }
        .scroll-left  { animation: scroll-left  30s linear infinite; }
        .scroll-right { animation: scroll-right 30s linear infinite; }
        .scroll-left:hover,
        .scroll-right:hover { animation-play-state: paused; }
      `}</style>

      {/* Header */}
      <div className="container text-center mb-10">
        <span className="inline-block rounded-full bg-[#C59D50]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C59D50] mb-3">Our Partners</span>
        <h2 className="text-3xl font-bold text-[#07173d]">Our University Partners</h2>
        <p className="text-sm text-[#48608f] mt-2">Trusted by leading institutions worldwide</p>
      </div>

      {/* Fade edges */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#f7f9ff] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#f7f9ff] to-transparent" />

        {/* Row 1 — scrolls LEFT */}
        <div className="flex gap-4 mb-4 w-max scroll-left">
          {R1.map((p, i) => <LogoCard key={`l-${i}`} {...p} />)}
        </div>

        {/* Row 2 — scrolls RIGHT */}
        <div className="flex gap-4 w-max scroll-right">
          {R2.map((p, i) => <LogoCard key={`r-${i}`} {...p} />)}
        </div>
      </div>
    </section>
  );
}
