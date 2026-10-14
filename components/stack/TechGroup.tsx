import Tag from "../project/Tag";

interface TechGroupProps {
  title: string;
  items: string[];
}

export default function TechGroup({ title, items }: TechGroupProps) {
  return (
    <div>
      <h3 className="mb-4 text-[15px] font-semibold text-white">{title}</h3>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
    </div>
  );
}
