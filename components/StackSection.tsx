import Section from "./project/Section";
import TechGroup from "./stack/TechGroup";

interface TechGroupData {
  title: string;
  items: string[];
}

const groups: TechGroupData[] = [
  {
    title: "Frontend",
    items: ["TypeScript", "React", "Next.Js", "Tailwind"],
  },
  {
    title: "Backend",
    items: ["PHP", "Laravel", "REST", "Yii2", "Node.Js", "Websocket"],
  },
  {
    title: "Данные",
    items: ["PostgreSQL", "MySQL", "Redis", "MongoDB"],
  },
  {
    title: "Инфраструктура",
    items: ["Docker", "Nginx", "Linux"],
  },
  {
    title: "Artificial Intelligence (AI)",
    items: ["Chat GPT", "Claude Code"],
  },
];

export default function StackSection() {
  return (
    <Section
      id="stack"
      title="Технологии"
      description="Инструменты, с которыми я работаю каждый день."
    >
      <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
        {groups.map((group) => (
          <TechGroup
            key={group.title}
            title={group.title}
            items={group.items}
          />
        ))}
      </div>
    </Section>
  );
}
