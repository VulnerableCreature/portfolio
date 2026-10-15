export default function WorkInProgress() {
    return (
      <article className="group relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-violet-500/10 via-white/3 to-transparent p-6 transition-all duration-300 hover:border-violet-400/30 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300 transition-colors duration-300 group-hover:bg-violet-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3v18" />
                <path d="M3 12h18" />
                <path d="m5.6 5.6 12.8 12.8" />
                <path d="M18.4 5.6 5.6 18.4" />
              </svg>
            </div>

            <div className="min-w-0">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300">
                Продолжение следует
              </span>

              <h3 className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
                Это ещё не всё
                <span className="text-violet-300">.</span>
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
                Портфолио постоянно развивается. Впереди новые проекты,
                эксперименты и решения, которыми я дополню эту коллекцию.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 sm:self-center">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/50" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-emerald-300">
              В разработке
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-16 -top-20 size-48 rounded-full bg-violet-500/10 blur-3xl transition-opacity duration-300 group-hover:bg-violet-500/20" />
      </article>
    );
}