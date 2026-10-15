import Code from "./about/Code";
import HeroActions from "./HeroActions";

export function About() {
  return (
    <section className="mx-auto max-w-5xl w-full pt-44 grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col gap-6">
        <div className="w-52 flex items-center justify-start gap-2 px-2 border border-amber-300/40 rounded-xl">
          <div className="bg-yellow-400 size-2 rounded-full"></div>
          <span className="text-sm font-light text-yellow-400">
            Открыт к новым проектам
          </span>
        </div>
        <span className="text-7xl font-medium">Fullstack-разработчик</span>
        <HeroActions />
      </div>
      <Code />
    </section>
  );
}
