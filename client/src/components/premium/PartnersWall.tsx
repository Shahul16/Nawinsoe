import { useMemo } from "react";

// ── University partners ──────────────────────────────────────────────
const PARTNER_UNIVERSITIES = [
  "University of Oxford",
  "University of Cambridge",
  "UCL",
  "King's College London",
  "University of Manchester",
  "University of Leeds",
  "University of Bristol",
  "University of Sheffield",
  "Queen Mary University London",
  "Coventry University",
] as const;

// ── Helpers ──────────────────────────────────────────────────────────

/** Duplicate the array N times for seamless infinite looping. */
function duplicateLogos<T>(arr: readonly T[], times: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < times; i++) result.push(...arr);
  return result;
}

/** Truncate university name to a consistent display abbreviation. */
function formatUniversityName(name: string): string {
  if (name.length <= 28) return name;
  return name.replace("University of ", "Univ. of ").replace("University ", "Univ. ");
}

// ── Logo card component ──────────────────────────────────────────────

function PartnerLogoCard({ name }: { name: string }) {
  return (
    <div
      className="
        flex shrink-0 items-center justify-center
        h-[96px] min-w-[200px] sm:min-w-[220px]
        rounded-xl border border-[rgba(8,15,30,0.06)]
        bg-white px-6
        shadow-[0_2px_8px_rgba(2,6,23,0.04)]
        transition-all duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_8px_24px_rgba(2,6,23,0.10)]
        hover:border-[rgba(197,157,80,0.25)]
      "
      role="listitem"
    >
      <span className="text-sm sm:text-[0.9rem] font-semibold text-[#040F23] text-center leading-tight select-none whitespace-nowrap">
        {formatUniversityName(name)}
      </span>
    </div>
  );
}

// ── Marquee row component ────────────────────────────────────────────

function MarqueeRow({
  logos,
  direction,
  speed,
}: {
  logos: readonly string[];
  direction: "left" | "right";
  speed: "fast" | "slow";
}) {
  // Duplicate 6× to ensure no visual gap at any viewport width
  const duped = useMemo(() => duplicateLogos(logos, 6), [logos]);

  return (
    <div className="group relative overflow-hidden" role="marquee" aria-label="Scrolling university partners">
      {/* Left fade mask */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-[#f7f9ff] to-transparent" />

      {/* Right fade mask */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#f7f9ff]" />

      {/* Scrolling track */}
      <div
        className={`flex w-max gap-4 sm:gap-5 py-3 group-hover:[animation-play-state:paused] ${
          direction === "left"
            ? speed === "fast"
              ? "animate-marquee-left"
              : "animate-marquee-left-slow"
            : speed === "fast"
              ? "animate-marquee-right"
              : "animate-marquee-right-slow"
        }`}
      >
        {duped.map((name, i) => (
          <PartnerLogoCard key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </div>
  );
}

// ── Section component ────────────────────────────────────────────────

export default function PartnersWall() {
  // Split universities into two roughly equal halves for the two rows
  const topRow = PARTNER_UNIVERSITIES.slice(0, 5);
  const bottomRow = PARTNER_UNIVERSITIES.slice(5);

  return (
    <section className="py-16 sm:py-20 bg-[#f7f9ff]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#040F23] font-['Montserrat','Sora',sans-serif] tracking-[-0.02em]">
            Our University Partners
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#818899] max-w-lg mx-auto">
            Trusted by leading institutions worldwide
          </p>
        </div>

        {/* Two marquee rows */}
        <div className="space-y-4 sm:space-y-5">
          {/* Top row — scrolls left ← */}
          <MarqueeRow logos={topRow} direction="left" speed="fast" />

          {/* Bottom row — scrolls right → */}
          <MarqueeRow logos={bottomRow} direction="right" speed="slow" />
        </div>
      </div>
    </section>
  );
}
