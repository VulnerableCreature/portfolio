"use client";

import { useEffect, useState } from "react";
import type IProject from "@/types/project";
import Tag from "./Tag";

interface ProjectCardProps {
  project: IProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (!isVideoOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVideoOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoOpen]);

  return (
    <>
      <article className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors duration-200 hover:border-white/20">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-medium text-white">{project.title}</h3>

          <span className="text-sm text-white/50">{project.year}</span>
        </div>

        <p className="mt-3 text-white/60">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        {project.video && (
          <button
            type="button"
            onClick={() => setIsVideoOpen(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
          >
            <span aria-hidden="true">▶</span>
            Смотреть видео
          </button>
        )}
      </article>

      {isVideoOpen && project.video && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setIsVideoOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Видео проекта ${project.title}`}
            className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#100e14] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
              <h3 className="font-medium text-white">{project.title}</h3>

              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                aria-label="Закрыть видео"
                className="rounded-lg px-3 py-1 text-xl text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="bg-black">
              <video
                key={project.video}
                controls
                autoPlay
                playsInline
                className="max-h-[75vh] w-full"
              >
                <source src={project.video} type="video/mp4" />
                Ваш браузер не поддерживает воспроизведение видео.
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
