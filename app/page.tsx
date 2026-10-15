import { About } from "@/components/About";
import ContactSection from "@/components/ContactSection";
import ProjectsSection from "@/components/ProjectSection";
import StackSection from "@/components/StackSection";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-between gap-8 mb-4">
      <About />
      <ProjectsSection />
      <StackSection />
      <ContactSection />
    </main>
  );
}
