interface GithubLinkProps {
  href?: string | null;
  compact?: boolean;
}

export default function GithubLink({ href, compact = false }: GithubLinkProps) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Открыть репозиторий проекта на GitHub"
      className={[
        "group inline-flex shrink-0 items-center justify-center gap-2.5",
        "rounded-xl border border-white/10 bg-white/4",
        "text-sm font-medium text-white/75",
        "transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-white/25",
        "hover:bg-white/8 hover:text-white",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-violet-400 focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[#0e0e13]",
        compact ? "px-3.5 py-2" : "px-5 py-3",
      ].join(" ")}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5 shrink-0 transition-transform duration-200 group-hover:scale-110"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3.01 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.08c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9Z"
        />
      </svg>

      <span>GitHub</span>

      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        className="size-3.5 text-white/35 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70"
      >
        <path
          d="M6 4h10v10M16 4 4 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
