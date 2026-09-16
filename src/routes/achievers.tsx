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
  return FALLBACK_IMAGES[name.trim().toLowerCase()] || "";
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
              let pct = item.pct || "";
              if (!pct && item.achievement) {
                const match = item.achievement.match(/\d+(\.\d+)?%/);
                if (match) pct = match[0];
              }

              let exam = item.exam || item.achievement || "Achiever";
              if (exam.startsWith(pct)) {
                exam = exam.replace(pct, "").replace(/^ in /i, "").trim();
              }

              const img = item.imageUrl || item.avatar || getFallbackImage(item.name) || img12_angel;

              return {
                ...item,
                name: item.name,
                exam: exam || "2025-26",
                pct: pct || "95.00%",
                rank: item.rank !== undefined && item.rank !== "" ? Number(item.rank) : index + 1,
                avatar: img,
                poster: img,
                batchYear: item.batchYear || "2025-26",
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
