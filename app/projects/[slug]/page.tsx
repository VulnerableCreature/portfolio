import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNeighbours, getProject, getProjects } from "@/lib/projects";
import TableOfContents from "@/components/project/TableOfContents";
import ProjectVideo from "@/components/project/ProjectVideo";
import ProjectNav from "@/components/project/ProjectNav";
import TechStack from "@/components/project/TechStack";
import Container from "@/components/ui/Container";
import Markdown from "@/components/project/Markdown";
import ContactSection from "@/components/ContactSection";
import Confidentiality from "@/components/ui/Confidentiality";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map(({ slug }) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};

  return { title: project.title, description: project.description };
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getNeighbours(slug);
  const hasToc = project.headings.length > 0;

  return (
    <main className="w-full pb-16 pt-24">
      <Container>
        <Confidentiality />
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white mt-10"
        >
          <span aria-hidden="true">←</span>
          Все проекты
        </Link>

        <div className="mt-6 rounded-3xl border border-white/10 bg-[#0e0e13]/80 p-6 shadow-xl lg:p-8 mb-20">
          <div className="mb-8 flex gap-2" aria-hidden="true">
            <span className="size-3 rounded-full bg-white/15" />
            <span className="size-3 rounded-full bg-white/15" />
            <span className="size-3 rounded-full bg-white/15" />
          </div>

          <div
            className={
              hasToc ? "grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]" : ""
            }
          >
            {hasToc && <TableOfContents headings={project.headings} />}

            <div className="min-w-0">
              <header className="text-center">
                <ProjectNav prev={prev} next={next} title={project.title} />

                {project.subtitle && (
                  <p className="mx-auto mt-4 w-fit rounded-full border border-violet-400/20 bg-violet-500/15 px-5 py-1 text-sm text-violet-100">
                    {project.subtitle}
                  </p>
                )}
              </header>

              {project.video && (
                <div className="mt-8">
                  <ProjectVideo src={project.video} title={project.title} />
                </div>
              )}

              <TechStack items={project.tags} />

              <div className="mt-12">
                <Markdown>{project.content}</Markdown>
              </div>
            </div>
          </div>
        </div>
        <ContactSection />
      </Container>
    </main>
  );
}
