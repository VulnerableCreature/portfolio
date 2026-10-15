
import type { ProjectActivity, ProjectType } from "@/types/project";

const activityLabels: Record<ProjectActivity, string> = {
  production: "Продакшен",
  support: "Поддержка",
  development: "Разработка",
};

const typeLabels: Record<ProjectType, string> = {
  personal: "Личный опыт",
  commercial: "Коммерция",
};

interface ProjectBadgesProps {
  activities?: ProjectActivity[];
  type?: ProjectType;
}

export default function ProjectBadges({
  activities = [],
  type,
}: ProjectBadgesProps) {
  if (activities.length === 0 && !type) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {activities.map((activity) => (
        <span
          key={activity}
          className="rounded-lg border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200"
        >
          {activityLabels[activity]}
        </span>
      ))}

      {type && (
        <span
          className={`rounded-lg border px-3 py-1 text-xs font-medium ${
            type === "commercial"
              ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
              : "border-sky-400/20 bg-sky-500/10 text-sky-200"
          }`}
        >
          {typeLabels[type]}
        </span>
      )}
    </div>
  );
}
