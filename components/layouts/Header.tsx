import Image from "next/image";

export function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/5 bg-[#100e14]/95 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <Image
          src="/portfolio/images/logo-lion.svg"
          alt="Logo portfolio"
          width={80}
          height={80}
        />

        <nav>
          <ul className="flex items-center justify-start gap-5.5">
            <li>
              <a
                href="#projects"
                className="inline-block text-md font-medium text-gray-400 transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
              >
                Проекты
              </a>
            </li>

            <li>
              <a
                href="#stack"
                className="inline-block text-md font-medium text-gray-400 transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
              >
                Стек
              </a>
            </li>
          </ul>
        </nav>

        <a
          href="#contacts"
          className="inline-block rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
        >
          Связаться
        </a>
      </div>
    </header>
  );
}
