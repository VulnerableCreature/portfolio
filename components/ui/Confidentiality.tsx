export default function Confidentiality() {
  return (
    <div className="mt-6 w-full rounded-2xl border border-violet-400/20 bg-violet-500/5 p-4 sm:p-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300 sm:size-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-violet-100 sm:text-base">
            Конфиденциальность данных
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-violet-100/70 sm:text-base">
            Демонстрация проекта осуществляется локально через{" "}
            <code className="break-all rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-violet-200 sm:text-sm">
              localhost
            </code>
            , поскольку система содержит конфиденциальную информацию.
            Распространение персональных данных без законных оснований запрещено
            законодательством. Для демонстрации функциональности используются{" "}
            <strong className="font-semibold text-violet-200">
              seed-данные
            </strong>{" "}
            — тестовые данные, не содержащие реальной персональной информации.
          </p>
        </div>
      </div>
    </div>
  );
}
