import type { ReactNode } from "react";
import { LenisProvider } from "./lenis-provider";
import { SiteNav } from "./site-nav";
import { SiteFooter } from "./site-footer";
import { ScrollProgress } from "./scroll-progress";
import { useRouterState } from "@tanstack/react-router";

export function SiteChrome({ children }: { children: ReactNode }) {
  const routerState = useRouterState();
  const isAdminPath = routerState.location.pathname.startsWith('/admin');

  return (
    <LenisProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      {!isAdminPath && <ScrollProgress />}
      {!isAdminPath && <SiteNav />}
      <main id="main" className="min-h-screen">
        {children}
      </main>
      {!isAdminPath && <SiteFooter />}
    </LenisProvider>
  );
}
