export type ProjectActivity = "production" | "support" | "development";

export type ProjectType = "personal" | "commercial";

export interface Project {
  slug: string;
  order: number;
  title: string;
  subtitle?: string;
  year: number;
  description: string;
  tags: string[];
  activities?: ProjectActivity[];
  type?: ProjectType;
  video?: string;
  github?: string | null;
}

export interface Heading {
  id: string;
  text: string;
}

export interface ProjectDetails extends Project {
  content: string;
  headings: Heading[];
}
