import Section from "./project/Section";
import ProjectCard from "./project/ProjectCard";
import { getProjects } from "@/lib/projects";

// const projects: IProject[] = [
//   {
//     title: "Laravel CMS",
//     year: 2026,
//     description: "Система управления контентом.",
//     tags: ["PHP", "Laravel", "PostgreSQL"],
//     featured: true,
//     video: "/videos/laravel-cms.mp4",
//   },
//   {
//     title: "Referral API",
//     year: 2026,
//     description: "API для реферального проекта.",
//     tags: ["PHP", "Laravel", "REST API"],
//     featured: true,
//     video: "/videos/referral-api.mp4",
//   },
//   {
//     title: "Mobile Library",
//     year: 2026,
//     description: "Мобильное приложение на Flutter.",
//     tags: ["Flutter", "Dart", "API"],
//     featured: true,
//     video: "/videos/mobile-library.mp4",
//   },
// ];

export default function ProjectsSection() {
  const projects = getProjects();
  return (
    <Section
      id="projects"
      title="Избранные проекты"
      description="Проекты, сделаные мною"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}
