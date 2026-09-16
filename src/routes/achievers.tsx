import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { CTA } from "@/components/home/cta";
import { AchieversSection } from "@/components/site/achievers-section";
import { useState, useEffect } from "react";
import { getAchievers } from "@/api/functions";

import img12_angel from "@/assets/Class12/xvuao5acg0ooy2jqh2ts.png";
import img12_priy from "@/assets/Class12/d0uwlwruvmriftzl5lej.png";
import img12_laxmi from "@/assets/Class12/msni2hieheuewekn06mv.png";
import img12_putul from "@/assets/Class12/mywy3s8uaa42cp8jyazv.png";
import img12_sanidhya from "@/assets/Class12/ucqg1qdaftyh3gw91q4z.png";
import img12_shreya from "@/assets/Class12/t5gwnpkeb7sxbvjgliv7.jpg";
import img12_vikas from "@/assets/Class12/iltnqrcmwrfnmni7sjnm.jpg";
import img12_akshaj from "@/assets/Class12/ngkkdzuvdxf5lscqmbfj.jpg";
import img10_divyansh from "@/assets/Class10/lbgbyce51gbrxddmu0pd.png";
import img10_adarsh from "@/assets/Class10/oa1p5eiwk4fok4hyu1ts.png";
import img10_samar from "@/assets/Class10/yhf2x9jrqckaeb7amcfk.png";
import img10_ananya from "@/assets/Class10/wsonhz5m81tssfsggdjj.png";
import img10_riya from "@/assets/Class10/buew5yx5ldnfxec7ge9p.jpg";

const KNOWN_ACHIEVERS_MAP: Record<string, { exam: string; pct: string; isXII: boolean; avatar: string }> = {
  "angel verma": { exam: "ISC XII · 2025-26", pct: "98.00%", isXII: true, avatar: img12_angel },
  "priyanshu singh": { exam: "ISC XII · 2025-26", pct: "95.75%", isXII: true, avatar: img12_priy },
  "laxmi": { exam: "ISC XII · 2025-26", pct: "95.75%", isXII: true, avatar: img12_laxmi },
  "putul sharma": { exam: "ISC XII · 2025-26", pct: "95.00%", isXII: true, avatar: img12_putul },
  "sanidhya kumar gupta": { exam: "ISC XII · 2025-26", pct: "95.00%", isXII: true, avatar: img12_sanidhya },
  "shreya baranwal": { exam: "ISC XII · 2025-26", pct: "90.25%", isXII: true, avatar: img12_shreya },
  "vikas kushwaha": { exam: "ISC XII · 2025-26", pct: "89.50%", isXII: true, avatar: img12_vikas },
  "akshaj srivastav": { exam: "ISC XII · 2025-26", pct: "89.00%", isXII: true, avatar: img12_akshaj },
  "divyanshu sharma": { exam: "ICSE X · 2025-26", pct: "97.80%", isXII: false, avatar: img10_divyansh },
  "adarsh baranwal": { exam: "ICSE X · 2025-26", pct: "95.60%", isXII: false, avatar: img10_adarsh },
  "samar gupta": { exam: "ICSE X · 2025-26", pct: "94.40%", isXII: false, avatar: img10_samar },
  "ananya gupta": { exam: "ICSE X · 2025-26", pct: "94.00%", isXII: false, avatar: img10_ananya },
  "riya yadav": { exam: "ICSE X · 2025-26", pct: "93.60%", isXII: false, avatar: img10_riya },
  "sanket tiwari": { exam: "ICSE X · 2025-26", pct: "89.00%", isXII: false, avatar: img10_riya },
};

const FALLBACK_IMAGES: Record<string, string> = {
  "angel verma": img12_angel,
  "priyanshu singh": img12_priy,
  "laxmi": img12_laxmi,
  "putul sharma": img12_putul,
  "sanidhya kumar gupta": img12_sanidhya,
  "shreya baranwal": img12_shreya,
  "vikas kushwaha": img12_vikas,
  "akshaj srivastav": img12_akshaj,
  "divyanshu sharma": img10_divyansh,
  "adarsh baranwal": img10_adarsh,
  "samar gupta": img10_samar,
  "ananya gupta": img10_ananya,
  "riya yadav": img10_riya,
  "sanket tiwari": img10_riya, // fallback for Sanket
};

function getFallbackImage(name: string) {
  if (!name) return "";
  const key = name.trim().toLowerCase();
  return FALLBACK_IMAGES[key] || (KNOWN_ACHIEVERS_MAP[key]?.avatar) || "";
}

export const Route = createFileRoute("/achievers")({
  errorComponent: ({ error }) => (
    <div style={{ padding: 20, color: 'red' }}>
      <h1>Error in Achievers Route</h1>
      <pre>{error.message}</pre>
      <pre>{error.stack}</pre>
    </div>
  ),
  head: () => ({
    meta: [
      { title: "Achievers — Little Flower School, Salempur" },
      {
        name: "description",
        content:
          "The 2025-26 honour roll of ICSE and ISC toppers at Little Flower School, Salempur.",
      },
      { property: "og:title", content: "Achievers — Little Flower School, Salempur" },
      { property: "og:description", content: "ICSE and ISC toppers of 2025-26." },
      { property: "og:url", content: "/achievers" },
    ],
    links: [{ rel: "canonical", href: "/achievers" }],
  }),
  component: () => {
    const [achievers, setAchievers] = useState<any[]>([]);

    useEffect(() => {
      async function fetchData() {
        try {
          const data = await getAchievers();
          if (data && data.length > 0) {
            const mappedData = data.map((item: any, index: number) => {
              const normName = (item.name || "").trim().toLowerCase();
              const known = KNOWN_ACHIEVERS_MAP[normName];

              let pct = item.pct || "";
              if (!pct && item.achievement) {
                const match = item.achievement.match(/\d+(\.\d+)?%/);
                if (match) pct = match[0];
              }
              if (!pct && known) {
                pct = known.pct;
              }

              let exam = item.exam || item.achievement || "";
              if (exam.startsWith(pct)) {
                exam = exam.replace(pct, "").replace(/^ in /i, "").trim();
              }
              if ((!exam || exam === "Achiever") && known) {
                exam = known.exam;
              }

              const img = item.imageUrl || item.avatar || getFallbackImage(item.name) || (known ? known.avatar : img12_angel);

              return {
                ...item,
                name: item.name,
                exam: exam || (known ? known.exam : (item.batchYear ? `Class XII · ${item.batchYear}` : "2025-26")),
                pct: pct || (known ? known.pct : "95.00%"),
                rank: item.rank !== undefined && item.rank !== "" && Number(item.rank) !== 99 ? Number(item.rank) : index + 1,
                avatar: img,
                poster: img,
                batchYear: item.batchYear || "2025-26",
                achievement: item.achievement || (known ? `${known.pct} in ${known.exam}` : ""),
              };
            });

            // Sort by rank ascending then pct descending
            mappedData.sort((a: any, b: any) => {
              if (a.rank && b.rank && a.rank !== b.rank) return a.rank - b.rank;
              const pA = parseFloat(String(a.pct).replace("%", "")) || 0;
              const pB = parseFloat(String(b.pct).replace("%", "")) || 0;
              return pB - pA;
            });

            setAchievers(mappedData);
          }
        } catch (e) {
          console.error("Error fetching achievers:", e);
        }
      }
      fetchData();
    }, []);

    const sessionYear = achievers[0]?.batchYear || "2025-26";

    return (
      <>
        <PageHeader
          eyebrow={`Honour Roll · ${sessionYear}`}
          title={
            <>
              Our achievers,
              <br />
              <span className="italic text-[color:var(--gold)]">named and remembered.</span>
            </>
          }
          subtitle="Every year, we celebrate the students whose discipline, effort and quiet ambition set the tone for the years to follow."
        />
        <AchieversSection data={achievers} />
        <CTA />
      </>
    );
  },
});
