"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent, ReactNode } from "react";

interface ProjectVideoProps {
  src: string;
  poster?: string;
  title: string;
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
const SEEK_STEP = 5;
const HIDE_DELAY = 2500;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = String(total % 60).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`;
}

const ICONS = {
  play: "M8 5v14l11-7z",
  pause: "M6 19h4V5H6v14zm8-14v14h4V5h-4z",
  replay:
    "M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z",
  volume:
    "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z",
  muted:
    "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a9 9 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z",
  fullscreen:
    "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z",
  exitFullscreen:
    "M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z",
} as const;

function Icon({
  name,
  className = "size-6",
}: {
  name: keyof typeof ICONS;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="flex size-9 items-center justify-center rounded-lg text-white/90 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
    >
      {children}
    </button>
  );
}

function Player({ src, poster, title }: ProjectVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [failed, setFailed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [rate, setRate] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [idle, setIdle] = useState(false);

  const controlsVisible = !playing || !idle || menuOpen;

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    setMenuOpen(false);
    if (video.paused || video.ended) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const seekTo = (time: number) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const next = Math.min(Math.max(time, 0), duration);
    video.currentTime = next;
    setCurrentTime(next);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) video.muted = !video.muted;
  };

  const changeVolume = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = value;
    video.muted = value === 0;
  };

  const changeRate = (value: number) => {
    const video = videoRef.current;
    if (video) video.playbackRate = value;
    setRate(value);
    setMenuOpen(false);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    const video = videoRef.current as
      | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
      | null;
    if (!container || !video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if (container.requestFullscreen) {
      container.requestFullscreen().catch(() => {});
    } else {
      video.webkitEnterFullscreen?.();
    }
  };

  const wake = () => {
    setIdle(false);
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setIdle(true), HIDE_DELAY);
  };

  const seekFromPointer = (e: PointerEvent<HTMLDivElement>) => {
    const bar = barRef.current;
    if (!bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    seekTo(((e.clientX - rect.left) / rect.width) * duration);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "INPUT") return;
    wake();

    switch (e.code) {
      case "Space":
        if (tag === "BUTTON") return;
        e.preventDefault();
        togglePlay();
        break;
      case "KeyK":
        togglePlay();
        break;
      case "ArrowLeft":
        e.preventDefault();
        seekTo(currentTime - SEEK_STEP);
        break;
      case "ArrowRight":
        e.preventDefault();
        seekTo(currentTime + SEEK_STEP);
        break;
      case "KeyM":
        toggleMute();
        break;
      case "KeyF":
        toggleFullscreen();
        break;
    }
  };

  useEffect(() => {
    const onChange = () =>
      setFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    return () => clearTimeout(hideTimerRef.current);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.error) setFailed(true);
    if (video.readyState >= 1) setDuration(video.duration);
    if (video.buffered.length > 0) {
      setBuffered(video.buffered.end(video.buffered.length - 1));
    }
  }, []);

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPercent = duration ? (buffered / duration) * 100 : 0;
  const volumeIcon = muted || volume === 0 ? "muted" : "volume";

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label={`Видеоплеер: ${title}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerMove={wake}
      onMouseLeave={() => setIdle(true)}
      className={[
        "relative select-none overflow-hidden bg-black outline-none focus-visible:ring-2 focus-visible:ring-violet-400",
        fullscreen
          ? "rounded-none"
          : "rounded-2xl border border-white/10 shadow-2xl shadow-black/40",
        controlsVisible ? "" : "cursor-none",
      ].join(" ")}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        aria-label={`Видео проекта ${title}`}
        className={`bg-black object-contain ${
          fullscreen ? "h-full w-full" : "aspect-video w-full"
        }`}
        onClick={togglePlay}
        onDoubleClick={toggleFullscreen}
        onPlay={() => {
          setPlaying(true);
          setEnded(false);
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setEnded(true);
        }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => {
          if (!draggingRef.current) setCurrentTime(e.currentTarget.currentTime);
        }}
        onProgress={(e) => {
          const { buffered: ranges } = e.currentTarget;
          if (ranges.length > 0) setBuffered(ranges.end(ranges.length - 1));
        }}
        onWaiting={() => setWaiting(true)}
        onPlaying={() => setWaiting(false)}
        onCanPlay={() => setWaiting(false)}
        onVolumeChange={(e) => {
          setVolume(e.currentTarget.volume);
          setMuted(e.currentTarget.muted);
        }}
        onError={() => setFailed(true)}
      />

      {/* Ошибка загрузки */}
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/85 p-6 text-center">
          <p className="font-medium text-white">Не удалось загрузить видео</p>
          <p className="text-sm text-white/60">
            Проверьте, что файл на месте и сохранён в формате H.264 + AAC.
          </p>
        </div>
      )}

      {waiting && playing && !failed && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="size-12 animate-spin rounded-full border-4 border-white/20 border-t-violet-400" />
        </div>
      )}

      {!playing && !failed && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={ended ? "Смотреть снова" : "Смотреть видео"}
          className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-rose-500 text-white shadow-lg shadow-violet-950/50 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Icon name={ended ? "replay" : "play"} className="size-8" />
        </button>
      )}

      <div
        className={`absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/40 to-transparent px-4 pb-3 pt-12 transition-opacity duration-200 has-focus-visible:opacity-100 ${
          controlsVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          ref={barRef}
          role="slider"
          tabIndex={0}
          aria-label="Перемотка"
          aria-valuemin={0}
          aria-valuemax={Math.floor(duration)}
          aria-valuenow={Math.floor(currentTime)}
          aria-valuetext={`${formatTime(currentTime)} из ${formatTime(duration)}`}
          className="group/bar relative flex h-4 cursor-pointer touch-none items-center"
          onPointerDown={(e) => {
            draggingRef.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            seekFromPointer(e);
          }}
          onPointerMove={(e) => {
            if (draggingRef.current) seekFromPointer(e);
          }}
          onPointerUp={() => {
            draggingRef.current = false;
          }}
          onPointerCancel={() => {
            draggingRef.current = false;
          }}
          onKeyDown={(e) => {
            if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
              e.preventDefault();
              e.stopPropagation();
              seekTo(
                currentTime +
                  (e.code === "ArrowRight" ? SEEK_STEP : -SEEK_STEP),
              );
            }
          }}
        >
          <div className="relative h-1 w-full rounded-full bg-white/20 transition-[height] group-hover/bar:h-1.5">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-white/30"
              style={{ width: `${bufferedPercent}%` }}
            />

            <div
              className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-violet-400 to-rose-400"
              style={{ width: `${progress}%` }}
            />

            <div
              className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover/bar:opacity-100 group-focus-visible/bar:opacity-100"
              style={{ left: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-1 flex items-center gap-1 text-white">
          <IconButton
            label={playing ? "Пауза" : ended ? "Смотреть снова" : "Смотреть"}
            onClick={togglePlay}
          >
            <Icon name={ended ? "replay" : playing ? "pause" : "play"} />
          </IconButton>

          <IconButton
            label={volumeIcon === "muted" ? "Включить звук" : "Выключить звук"}
            onClick={toggleMute}
          >
            <Icon name={volumeIcon} />
          </IconButton>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={(e) => changeVolume(Number(e.target.value))}
            aria-label="Громкость"
            className="hidden h-1 w-20 cursor-pointer accent-violet-400 sm:block"
          />

          <span className="ml-2 text-sm tabular-nums text-white/80">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="ml-auto flex items-center gap-1">
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label="Скорость воспроизведения"
                aria-expanded={menuOpen}
                className="h-9 min-w-9 rounded-lg px-2 text-sm font-medium tabular-nums text-white/90 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
              >
                {rate}x
              </button>

              {menuOpen && (
                <ul className="absolute bottom-full right-0 mb-2 w-28 rounded-xl border border-white/10 bg-[#14121a]/95 p-1 shadow-xl backdrop-blur">
                  {SPEEDS.map((speed) => (
                    <li key={speed}>
                      <button
                        type="button"
                        onClick={() => changeRate(speed)}
                        aria-pressed={speed === rate}
                        className={`w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors hover:bg-white/10 ${
                          speed === rate ? "text-violet-300" : "text-white/80"
                        }`}
                      >
                        {speed === 1 ? "Обычная" : `${speed}x`}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <IconButton
              label={
                fullscreen ? "Выйти из полноэкранного режима" : "На весь экран"
              }
              onClick={toggleFullscreen}
            >
              <Icon name={fullscreen ? "exitFullscreen" : "fullscreen"} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * key={src} полностью пересоздаёт плеер при переходе к другому проекту
 * (стрелки ‹ ›), иначе время и пауза остались бы от предыдущего видео.
 */
export default function ProjectVideo(props: ProjectVideoProps) {
  return <Player key={props.src} {...props} />;
}
