
import Link from "next/link";
import type { Project } from "@/types/project";
import Tag from "./Tag";
import ProjectBadges from "./ProjectBadges";

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  return (
    <article className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors duration-200 hover:border-white/20">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-medium text-white">
          {project.title}
        </h3>

        <span className="shrink-0 text-sm text-white/50">
          {project.year}
        </span>
      </div>

      <p className="mt-3 text-white/60">
        {project.description}
      </p>

      <div className="mt-4">
        <ProjectBadges
          activities={project.activities}
          type={project.type}
        />
      </div>

      <div className="my-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <Link
        href={`/projects/${project.slug}`}
        className="mt-auto inline-flex w-fit items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
      >
        Подробнее
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
