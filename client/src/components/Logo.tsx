export default function Logo({ className = "", width = 192, height = 192, title = "NAWINS Edutech" }: { className?: string; width?: number; height?: number; title?: string }) {
  return (
    <img
      src="/manus-static/nawins_education_logo_v2.svg?v=2"
      alt={title}
      width={width}
      height={height}
      className={className}
      loading="eager"
      fetchPriority="high"
    />
  );
}