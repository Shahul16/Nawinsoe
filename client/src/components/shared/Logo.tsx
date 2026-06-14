export default function Logo({
  className = "",
  width = 192,
  height = 192,
  title = "NAWINS Edutech",
}: {
  className?: string;
  width?: number;
  height?: number;
  title?: string;
}) {
  return (
    <img
      src="/Nawins-static/nawins_education_logo.svg"
      alt={title}
      width={width}
      height={height}
      className={className}
      loading="eager"
      fetchPriority="high"
    />
  );
}
