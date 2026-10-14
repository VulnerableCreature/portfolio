import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export default function Section({
  id,
  title,
  description,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-6xl scroll-mt-28 px-8"
    >
      <h2 className="text-3xl font-medium tracking-tight text-white md:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-lg text-lg text-white/60">{description}</p>
      )}

      <div className="mt-12">{children}</div>
    </section>
  );
}
