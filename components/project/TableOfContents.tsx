import type { Heading } from "@/types/project";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  return (
    <nav
      aria-label="Содержание"
      className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto"
    >
      <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
        Содержание
      </h2>

      <ol className="mt-4">
        {headings.map((heading, index) => (
          <li
            key={heading.id}
            className="border-b border-white/10 last:border-0"
          >
            <a
              href={`#${heading.id}`}
              className="flex gap-2 py-3 text-white/70 transition-colors hover:text-white"
            >
              <span className="tabular-nums text-yellow-400/80">
                {index + 1}.
              </span>
              <span>{heading.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
