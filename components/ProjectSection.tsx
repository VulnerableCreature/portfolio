import Section from "./project/Section";
import ProjectCard from "./project/ProjectCard";
import { getProjects } from "@/lib/projects";
import WorkInProgress from "./project/WorkInProgress";

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

      <WorkInProgress />
    </Section>
  );
}
