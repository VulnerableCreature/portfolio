import type { ReactNode } from "react";

export interface TagProps {
  children: ReactNode;
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-white/60">
      {children}
    </span>
  );
}
