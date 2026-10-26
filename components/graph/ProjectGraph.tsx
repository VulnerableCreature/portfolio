"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/types/project";

type GraphMode = "projects" | "technologies";

interface ProjectGraphProps {
  mode: GraphMode;
  projects: Project[];
  project?: Project;
}

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  slug?: string;
  count?: number;
}

const WIDTH = 900;
const HEIGHT = 560;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;

const PALETTE = [
  "#a78bfa",
  "#67e8f9",
  "#f9a8d4",
  "#86efac",
  "#fcd34d",
  "#c4b5fd",
  "#7dd3fc",
  "#fdba74",
];

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export default function ProjectGraph({
  mode,
  projects,
  project,
}: ProjectGraphProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const graph = useMemo(() => {
    if (mode === "technologies" && project) {
      const technologies = [
        ...new Set(project.tags.map((tag) => tag.trim())),
      ].filter(Boolean);

      const center: Node = {
        id: project.slug,
        label: project.title,
        x: CENTER_X,
        y: CENTER_Y,
        radius: 47,
        color: "#a78bfa",
        slug: project.slug,
      };

      const radius = technologies.length > 8 ? 195 : 170;

      const nodes: Node[] = [
        center,
        ...technologies.map((tech, index): Node => {
          const angle =
            (2 * Math.PI * index) / technologies.length - Math.PI / 2;

          return {
            id: `tech:${normalize(tech)}`,
            label: tech,
            x: CENTER_X + Math.cos(angle) * radius,
            y: CENTER_Y + Math.sin(angle) * radius,
            radius: 25,
            color: PALETTE[index % PALETTE.length],
          };
        }),
      ];

      return {
        nodes,
        edges: nodes.slice(1).map((node) => ({
          source: center,
          target: node,
          weight: 1,
        })),
      };
    }

    const sorted = [...projects].sort((a, b) => a.order - b.order);
    const radius = Math.min(205, 90 + sorted.length * 17);

    const nodes: Node[] = sorted.map((item, index) => {
      const angle =
        (2 * Math.PI * index) / Math.max(sorted.length, 1) - Math.PI / 2;

      return {
        id: item.slug,
        label: item.title,
        x: CENTER_X + Math.cos(angle) * radius,
        y: CENTER_Y + Math.sin(angle) * radius,
        radius: 34,
        color: PALETTE[index % PALETTE.length],
        slug: item.slug,
      };
    });

    const edges: {
      source: Node;
      target: Node;
      weight: number;
    }[] = [];

    for (let i = 0; i < sorted.length; i++) {
      for (let j = i + 1; j < sorted.length; j++) {
        const a = sorted[i];
        const b = sorted[j];

        const aTags = new Set(a.tags.map(normalize));
        const shared = b.tags.filter((tag) => aTags.has(normalize(tag)));

        if (shared.length > 0) {
          edges.push({
            source: nodes[i],
            target: nodes[j],
            weight: shared.length,
          });
        }
      }
    }

    return { nodes, edges };
  }, [mode, projects, project]);

  const activeNode = graph.nodes.find((node) => node.id === activeId);

  if (mode === "technologies" && !project) return null;

  return (
    <section className="w-full">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="mt-2 text-2xl font-medium text-white">
            {mode === "projects"
              ? "Карта проектов"
              : "Технологическая архитектура"}
          </h2>
          <p className="mt-2 text-sm text-white/50">
            {mode === "projects"
              ? "Связи отражают общие теги проектов."
              : "Выберите узел, чтобы изучить стек проекта."}
          </p>
        </div>

        <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/50">
          {graph.nodes.length} узлов · {graph.edges.length} связей
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e13]">
        <div className="relative">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            role="group"
            aria-label={
              mode === "projects"
                ? "Граф связей между проектами"
                : `Граф технологий проекта ${project?.title}`
            }
            className="block h-auto w-full"
          >
            <defs>
              <pattern
                id="graph-grid"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="1" fill="#ffffff" opacity="0.08" />
              </pattern>
              <filter
                id="graph-glow"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect width={WIDTH} height={HEIGHT} fill="url(#graph-grid)" />

            {graph.edges.map((edge, index) => {
              const highlighted =
                activeId === edge.source.id || activeId === edge.target.id;

              return (
                <line
                  key={`${edge.source.id}-${edge.target.id}-${index}`}
                  x1={edge.source.x}
                  y1={edge.source.y}
                  x2={edge.target.x}
                  y2={edge.target.y}
                  stroke={highlighted ? edge.source.color : "#8b7cba"}
                  strokeOpacity={activeId ? (highlighted ? 0.8 : 0.07) : 0.24}
                  strokeWidth={
                    highlighted ? 1.8 : Math.min(0.7 + edge.weight * 0.3, 2)
                  }
                  className="transition-all duration-300"
                />
              );
            })}

            {graph.nodes.map((node) => {
              const selected = activeId === node.id;
              const related = graph.edges.some(
                (edge) =>
                  (edge.source.id === activeId && edge.target.id === node.id) ||
                  (edge.target.id === activeId && edge.source.id === node.id),
              );
              const dimmed = Boolean(activeId) && !selected && !related;

              const circle = (
                <>
                  {selected && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.radius + 9}
                      fill="none"
                      stroke={node.color}
                      strokeOpacity="0.35"
                      strokeWidth="1"
                    />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.radius}
                    fill={selected ? `${node.color}30` : "#17151f"}
                    stroke={node.color}
                    strokeOpacity={dimmed ? 0.18 : selected ? 1 : 0.7}
                    strokeWidth={selected ? 2 : 1.2}
                    filter={selected ? "url(#graph-glow)" : undefined}
                  />
                  <text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={dimmed ? "#77717f" : "#f5f3ff"}
                    fontSize={
                      mode === "projects" ? 11 : node.radius > 30 ? 11 : 10
                    }
                    fontWeight={selected ? 600 : 500}
                  >
                    {node.label.length > (mode === "projects" ? 15 : 18)
                      ? `${node.label.slice(0, mode === "projects" ? 14 : 17)}…`
                      : node.label}
                  </text>
                </>
              );

              return (
                <g
                  key={node.id}
                  role="button"
                  tabIndex={0}
                  aria-label={node.label}
                  aria-pressed={selected}
                  onClick={() =>
                    setActiveId((current) =>
                      current === node.id ? null : node.id,
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveId((current) =>
                        current === node.id ? null : node.id,
                      );
                    }
                  }}
                  className="cursor-pointer outline-none"
                  opacity={dimmed ? 0.35 : 1}
                >
                  {circle}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
          <p className="text-xs text-white/40">
            Нажмите на узел, чтобы выделить связи.
          </p>
          <button
            type="button"
            onClick={() => setActiveId(null)}
            className="rounded-lg px-3 py-1.5 text-xs text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            Сбросить выделение
          </button>
        </div>
      </div>

      {activeNode && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div>
            <p className="text-xs text-white/40">Выбранный узел</p>
            <p className="mt-1 font-medium text-white">{activeNode.label}</p>
          </div>

          {activeNode.slug && mode === "projects" && (
            <Link
              href={`/projects/${activeNode.slug}`}
              className="rounded-lg border border-violet-400/30 px-3 py-2 text-sm text-violet-200 transition-colors hover:bg-violet-500/10"
            >
              Открыть проект →
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
