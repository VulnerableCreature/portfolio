import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { withBase } from "@/config/environment";
import type { Heading, ProjectDetails } from "@/types/project";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

/** Достаём заголовки "## ..." из markdown, чтобы построить оглавление. */
function extractHeadings(markdown: string): Heading[] {
  // Сначала вырезаем блоки кода: "## " внутри них — не заголовки
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, "");

  // Slugger должен давать те же id, что rehype-slug на странице
  const slugger = new GithubSlugger();

  return [...withoutCode.matchAll(/^##\s+(.+)$/gm)].map(([, raw]) => {
    const text = raw.replace(/[`*_]/g, "").trim(); // убираем разметку
    return { id: slugger.slug(text), text };
  });
}

function readProject(fileName: string): ProjectDetails {
  const slug = fileName.replace(/\.md$/, "");
  const file = fs.readFileSync(path.join(PROJECTS_DIR, fileName), "utf8");
  const { data, content } = matter(file); // data — frontmatter, content — тело

  if (!data.title || !data.description) {
    throw new Error(`content/projects/${fileName}: нужны title и description`);
  }

  return {
    slug,
    order: data.order ?? 999,
    title: data.title,
    subtitle: data.subtitle,
    year: data.year,
    description: data.description,
    tags: data.tags ?? [],
    video: data.video ? withBase(data.video) : undefined,
    content,
    headings: extractHeadings(content),
  };
}

export function getProjects(): ProjectDetails[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((name) => name.endsWith(".md"))
    .map(readProject)
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string) {
  return getProjects().find((p) => p.slug === slug);
}

/** Соседние проекты для стрелок ‹ › под видео. */
export function getNeighbours(slug: string) {
  const all = getProjects();
  const i = all.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? all[i - 1] : undefined,
    next: i >= 0 && i < all.length - 1 ? all[i + 1] : undefined,
  };
}
