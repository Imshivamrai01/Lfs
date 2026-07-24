import type { ReactNode } from "react";

export function Marquee({ children, speed = 40 }: { children: ReactNode; speed?: number }) {
  return (
    <div className="relative flex overflow-hidden">
      <div
        className="flex shrink-0 animate-marquee gap-16"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 animate-marquee gap-16 pl-16"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
    </div>
  );
}
