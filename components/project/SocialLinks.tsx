import type { ReactNode } from "react";

type SocialLink = {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
  color: string;
  hover: string;
  external?: boolean;
};

function ExternalLinkIcon() {
  return (
    <svg
      className="size-4 shrink-0 text-white/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      className="size-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg
      className="size-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21.8 4.6 18.5 20c-.25 1.1-.9 1.35-1.8.85l-5-3.7-2.4 2.3c-.27.27-.5.5-1 .5l.36-5.1 9.3-8.4c.4-.36-.1-.56-.62-.2L6 13.4l-4.9-1.53c-1.07-.34-1.1-1.08.22-1.6L20.5 2.9c.9-.33 1.7.22 1.3 1.7Z" />
    </svg>
  );
}

function HhIcon() {
  return (
    <span
      className="text-base font-extrabold tracking-tight"
      aria-hidden="true"
    >
      hh
    </span>
  );
}

const socialLinks: SocialLink[] = [
  {
    label: "Email",
    value: "MescheryakovLV@yandex.ru",
    href: "mailto:MescheryakovLV@yandex.ru",
    icon: <EmailIcon />,
    color: "bg-violet-500/10 text-violet-300",
    hover:
      "hover:border-violet-400/40 hover:bg-violet-500/[0.08] group-hover:bg-violet-500/20 group-hover:text-violet-200",
  },
  {
    label: "Telegram",
    value: "@cute_lion",
    href: "https://t.me/cute_lion",
    icon: <TelegramIcon />,
    color: "bg-sky-500/10 text-sky-300",
    hover:
      "hover:border-sky-400/40 hover:bg-sky-500/[0.08] group-hover:bg-sky-500/20 group-hover:text-sky-200",
    external: true,
  },
  {
    label: "PHP Разработчик",
    value: "Профиль на hh.ru",
    href: "https://hh.ru/resume/893be796ff10cfa4ac0039ed1f787854536d64?hhtmFrom=profile&print=true",
    icon: <HhIcon />,
    color: "bg-orange-500/10 text-orange-300",
    hover:
      "hover:border-orange-400/40 hover:bg-orange-500/[0.08] group-hover:bg-orange-500/20 group-hover:text-orange-200",
    external: true,
  },
  {
    label: "Flutter Разработчик",
    value: "Профиль на hh.ru",
    href: "https://hh.ru/resume/1f78a17eff10ff28e30039ed1f6d73586a4e53?hhtmFrom=profile",
    icon: <HhIcon />,
    color: "bg-blue-500/10 text-blue-300",
    hover:
      "hover:border-blue-400/40 hover:bg-blue-500/[0.08] group-blue:bg-orange-500/20 group-hover:text-blue-200",
    external: true,
  },
];

function SocialLinkCard({ link }: { link: SocialLink }) {
  return (
    <a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className={`group flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/3 px-4 py-3 transition-all duration-300 ${link.hover}`}
    >
      <span
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${link.color} ${link.hover}`}
      >
        {link.icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-xs text-white/40">{link.label}</span>

        <span className="mt-0.5 block break-all text-sm font-medium text-white">
          {link.value}
        </span>
      </span>

      <ExternalLinkIcon />
    </a>
  );
}

export default function SocialLinks() {
  return (
    <nav
      aria-label="Контактная информация"
      className="mt-6 flex flex-wrap gap-3"
    >
      {socialLinks.map((link) => (
        <SocialLinkCard key={link.href} link={link} />
      ))}
    </nav>
  );
}
