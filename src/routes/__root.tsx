import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  ScrollRestoration,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { PageLoader } from "../components/site/page-loader";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteChrome } from "../components/site/site-chrome";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Little Flower School, Salempur — For God and Man | ICSE & ISC School" },
      {
        name: "description",
        content:
          "Little Flower School, Salempur (LFS Salempur) — premier ICSE (10th) & ISC (12th) co-educational Christian minority institution in Deoria, UP. Nurturing academic brilliance, holistic leadership, and moral integrity since decades.",
      },
      {
        name: "keywords",
        content:
          "Little Flower School Salempur, LFS Salempur, best school in Salempur, ICSE school Deoria, ISC school Salempur UP, Little Flower School Deoria, top schools in Eastern UP, ICSE board admission Salempur, Little Flower Mission Education Society, Fr Jubish Thomas CST, school admission LKG to 12th Salempur",
      },
      { name: "author", content: "Little Flower School, Salempur" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "theme-color", content: "#0B4DA2" },
      { name: "application-name", content: "LFS Salempur" },
      { name: "apple-mobile-web-app-title", content: "LFS Salempur" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      
      // Geo Tags for Local SEO Salempur & Deoria UP
      { name: "geo.region", content: "IN-UP" },
      { name: "geo.placename", content: "Salempur, Deoria" },
      { name: "geo.position", content: "26.2974;83.9298" },
      { name: "ICBM", content: "26.2974, 83.9298" },

      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Little Flower School, Salempur" },
      { property: "og:title", content: "Little Flower School, Salempur — For God and Man" },
      {
        property: "og:description",
        content:
          "Little Flower School (LFS), Salempur — CISCE affiliated (ICSE & ISC) institution committed to holistic academic excellence, character building, and moral values.",
      },
      { property: "og:url", content: "https://lfssalempur.online/" },
      { property: "og:image", content: "https://lfssalempur.online/lfs-logo.png" },
      { property: "og:image:alt", content: "Little Flower School Salempur Crest & Logo" },
      { property: "og:locale", content: "en_IN" },

      // Twitter Cards
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Little Flower School, Salempur — For God and Man" },
      {
        name: "twitter:description",
        content:
          "Premier ICSE & ISC institution in Salempur, Deoria UP. Admissions open for LKG to VIII.",
      },
      { name: "twitter:image", content: "https://lfssalempur.online/lfs-logo.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/lfs-logo.png" },
      { rel: "apple-touch-icon", href: "/lfs-logo.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
      { rel: "alternate", type: "text/plain", href: "/llms.txt", title: "LLMs Context" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["School", "EducationalOrganization"],
              "@id": "https://lfssalempur.online/#school",
              name: "Little Flower School, Salempur",
              alternateName: ["LFS Salempur", "Little Flower School Salempur", "LFS"],
              url: "https://lfssalempur.online",
              logo: "https://lfssalempur.online/lfs-logo.png",
              image: "https://lfssalempur.online/lfs-logo.png",
              description:
                "Little Flower School, Salempur is an esteemed ICSE & ISC affiliated co-educational institution in Salempur, Deoria, Uttar Pradesh.",
              slogan: "For God and Man",
              telephone: "+91-9453344112",
              email: "littleflowersalempur@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Little Flower School Campus",
                addressLocality: "Salempur",
                addressRegion: "Uttar Pradesh",
                postalCode: "274509",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 26.2974,
                longitude: 83.9298,
              },
              hasCredential: [
                {
                  "@type": "EducationalOccupationalCredential",
                  credentialCategory: "degree",
                  name: "ICSE (Class X) & ISC (Class XII) Affiliation - CISCE New Delhi",
                },
              ],
              parentOrganization: {
                "@type": "Organization",
                name: "Little Flower Mission Education Society, Gorakhpur",
              },
              founder: {
                "@type": "Organization",
                name: "CST Fathers (Little Flower Congregation)",
              },
              employee: [
                {
                  "@type": "Person",
                  name: "Fr. Jubish Thomas CST",
                  jobTitle: "Principal",
                },
                {
                  "@type": "Person",
                  name: "Fr. Benoy Mathew CST",
                  jobTitle: "Manager",
                },
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+91-9453344112",
                  contactType: "Admissions & Inquiries",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi"],
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+91-8765932092",
                  contactType: "Administrative Office",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi"],
                },
              ],
              sameAs: [
                "https://www.lfssalempur.online/payonline/",
                "https://github.com/shineinfosolutions/lfs-salempur",
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://lfssalempur.online/#website",
              url: "https://lfssalempur.online",
              name: "Little Flower School, Salempur",
              description: "Official Website of Little Flower School, Salempur, Deoria, UP",
              publisher: {
                "@id": "https://lfssalempur.online/#school",
              },
              inLanguage: "en-IN",
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PageLoader />
      <SiteChrome>
        <Outlet />
      </SiteChrome>
    </QueryClientProvider>
  );
}
