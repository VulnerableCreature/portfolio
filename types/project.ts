export default interface IProject {
  title: string;
  year: number;
  description: string;
  tags: string[];
  featured: boolean;
  video?: string;
}
