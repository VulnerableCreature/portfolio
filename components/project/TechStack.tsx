export default function TechStack({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="tech-title" className="mt-10">
      <h2
        id="tech-title"
        className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-white/40"
      >
        Стек технологий
      </h2>

      <ul className="flex flex-wrap justify-center gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex h-14 min-w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-white/70 transition-colors hover:border-violet-400/40 hover:text-white"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
