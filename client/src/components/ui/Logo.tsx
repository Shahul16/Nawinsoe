export default function Logo({ className = "", width = 192, height = 192, title = "NAWINS Edutech" }: { className?: string; width?: number; height?: number; title?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 600"
      width={width}
      height={height}
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <linearGradient id="gold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#d6ad5a" />
          <stop offset="1" stopColor="#b7852f" />
        </linearGradient>
        <linearGradient id="navy" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#07133a" />
          <stop offset="1" stopColor="#213a5b" />
        </linearGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000" floodOpacity="0.18" />
        </filter>
      </defs>

      <g transform="translate(60,60)">
        <path d="M240 20 L520 140 L240 260 L-40 140 Z" fill="url(#navy)" rx="6" filter="url(#soft)" />
        <path d="M140 220 L360 40 L410 90 L190 270 Z" fill="url(#gold)" stroke="#b07e2b" strokeWidth="2" />
        <path d="M40 320 L120 100 L180 140 L260 20 L320 80 L260 320 L200 280 L120 380 Z" fill="url(#navy)" opacity="0.98" />
      </g>

      <g transform="translate(80,420)">
        <text x="0" y="0" fontFamily="Montserrat, Sans-serif" fontSize="72" letterSpacing="6" fill="#07133a" fontWeight="700">NAWINS</text>
        <text x="0" y="60" fontFamily="Open Sans, Sans-serif" fontSize="22" letterSpacing="6" fill="#b7852f">Edutech</text>
      </g>
    </svg>
  );
}
