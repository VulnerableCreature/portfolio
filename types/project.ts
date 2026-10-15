export interface Project {
  slug: string;
  order: number;
  title: string;
  subtitle?: string;
  year: number;
  description: string;
  tags: string[];
  video?: string;
}

export interface Heading {
  id: string;
  text: string;
}

export interface ProjectDetails extends Project {
  content: string; // markdown без frontmatter
  headings: Heading[]; // для оглавления
}
