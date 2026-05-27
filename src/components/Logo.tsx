interface LogoProps {
  light?: boolean;
}

const Logo = ({ light = false }: LogoProps) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center ${
        light ? "bg-white/20" : "bg-indigo-100"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`w-4 h-4 ${light ? "text-white" : "text-indigo-600"}`}
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z"
        />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    </div>
    <span
      className={`font-semibold text-base tracking-tight ${
        light ? "text-white" : "text-gray-900"
      }`}
    >
      LocalFinder
    </span>
  </div>
);

export default Logo;
