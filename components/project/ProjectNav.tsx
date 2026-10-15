import Link from "next/link";
import type { Project } from "@/types/project";

interface ArrowProps {
  direction: "prev" | "next";
  project?: Project;
}

function Arrow({ direction, project }: ArrowProps) {
  const base = "flex h-11 w-14 items-center justify-center rounded-full";
  const path = direction === "prev" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6";

  const icon = (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );

  if (!project) {
    return (
      <span className={`${base} bg-white/5 text-white/20`} aria-hidden="true">
        {icon}
      </span>
    );
  }

  const label = direction === "prev" ? "Предыдущий проект" : "Следующий проект";

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`${label}: ${project.title}`}
      title={project.title}
      className={`${base} bg-white/10 text-white transition-colors hover:bg-white/20`}
    >
      {icon}
    </Link>
  );
}

export default function ProjectNav({
  prev,
  next,
  title,
}: {
  prev?: Project;
  next?: Project;
  title: string;
}) {
  return (
    <div className="mt-4 flex items-center justify-between">
      <Arrow direction="prev" project={prev} />
      <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h1>
      <Arrow direction="next" project={next} />
    </div>
  );
}
