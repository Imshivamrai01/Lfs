import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionEyebrow } from "@/components/site/reveal";
import { Link } from "@tanstack/react-router";
import { X, Trophy } from "lucide-react";
import { gsap } from "gsap";
import { getAchievers } from "@/api/functions";

// Image imports
import img12_angel from "@/assets/Class12/xvuao5acg0ooy2jqh2ts.png";
import img12_priy from "@/assets/Class12/d0uwlwruvmriftzl5lej.png";
import img12_laxmi from "@/assets/Class12/msni2hieheuewekn06mv.png";
import img12_putul from "@/assets/Class12/mywy3s8uaa42cp8jyazv.png";
import img12_sanidhya from "@/assets/Class12/ucqg1qdaftyh3gw91q4z.png";
import img10_divyansh from "@/assets/Class10/lbgbyce51gbrxddmu0pd.png";
import img10_adarsh from "@/assets/Class10/oa1p5eiwk4fok4hyu1ts.png";
import img10_samar from "@/assets/Class10/yhf2x9jrqckaeb7amcfk.png";
import img10_ananya from "@/assets/Class10/wsonhz5m81tssfsggdjj.png";
import img10_riya from "@/assets/Class10/buew5yx5ldnfxec7ge9p.jpg";
import img12_shreya from "@/assets/Class12/t5gwnpkeb7sxbvjgliv7.jpg";
import img12_vikas from "@/assets/Class12/iltnqrcmwrfnmni7sjnm.jpg";
import img12_akshaj from "@/assets/Class12/ngkkdzuvdxf5lscqmbfj.jpg";

interface Achiever {
  name: string;
  exam: string;
  pct: string;
  avatar: string;
  poster: string;
  rank?: number;
  batchYear?: string;
  achievement?: string;
}

const CLASS12: Achiever[] = [
  {
    name: "Angel Verma",
    exam: "ISC XII · 2025-26",
    pct: "98.00%",
    avatar: img12_angel,
    poster: img12_angel,
  },
  {
    name: "Priyanshu Singh",
    exam: "ISC XII · 2025-26",
    pct: "95.75%",
    avatar: img12_priy,
    poster: img12_priy,
  },
  {
    name: "Laxmi",
    exam: "ISC XII · 2025-26",
    pct: "95.75%",
    avatar: img12_laxmi,
    poster: img12_laxmi,
  },
  {
    name: "Putul Sharma",
    exam: "ISC XII · 2025-26",
    pct: "95.00%",
    avatar: img12_putul,
    poster: img12_putul,
  },
  {
    name: "Sanidhya Kumar Gupta",
    exam: "ISC XII · 2025-26",
    pct: "95.00%",
    avatar: img12_sanidhya,
    poster: img12_sanidhya,
  },
];

const CLASS10: Achiever[] = [
  {
    name: "Divyanshu Sharma",
    exam: "ICSE X · 2025-26",
    pct: "97.80%",
    avatar: img10_divyansh,
    poster: img10_divyansh,
  },
  {
    name: "Adarsh Baranwal",
    exam: "ICSE X · 2025-26",
    pct: "95.60%",
    avatar: img10_adarsh,
    poster: img10_adarsh,
  },
  {
    name: "Samar Gupta",
    exam: "ICSE X · 2025-26",
    pct: "94.40%",
    avatar: img10_samar,
    poster: img10_samar,
  },
  {
    name: "Ananya Gupta",
    exam: "ICSE X · 2025-26",
    pct: "94.00%",
    avatar: img10_ananya,
    poster: img10_ananya,
  },
  {
    name: "Riya Yadav",
    exam: "ICSE X · 2025-26",
    pct: "93.60%",
    avatar: img10_riya,
    poster: img10_riya,
  },
];

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

const RANK_META = [
  {
    label: "1st",
    emoji: "🥇",
    ring: "#FFD700",
    badge: "linear-gradient(135deg,#FFD700,#FFA500)",
    badgeText: "#7c3800",
  },
  {
    label: "2nd",
    emoji: "🥈",
    ring: "#C0C0C0",
    badge: "linear-gradient(135deg,#C0C0C0,#A8A8A8)",
    badgeText: "#3a3a3a",
  },
  {
    label: "3rd",
    emoji: "🥉",
    ring: "#CD7F32",
    badge: "linear-gradient(135deg,#CD7F32,#A0522D)",
    badgeText: "#fff",
  },
  {
    label: "4th",
    emoji: "",
    ring: "oklch(0.42 0.15 260 / 0.35)",
    badge: "oklch(0.42 0.15 260 / 0.08)",
    badgeText: "oklch(0.42 0.15 260)",
  },
  {
    label: "5th",
    emoji: "",
    ring: "oklch(0.42 0.15 260 / 0.35)",
    badge: "oklch(0.42 0.15 260 / 0.08)",
    badgeText: "oklch(0.42 0.15 260)",
  },
];

// Confetti
function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
    const COLORS = ["#FDB515", "#0B4DA2", "#fff", "#ff6b6b", "#a8edea", "#fed6e3", "#c3f0ca"];
    const pieces = Array.from({ length: 110 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height - c.height,
      r: Math.random() * 6 + 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: Math.random() * 2 + 0.8,
      swing: Math.random() * 1.4 - 0.7,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.13,
      rect: Math.random() > 0.5,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pieces.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.82;
        if (p.rect) ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
        else {
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
        p.y += p.speed;
        p.x += p.swing * 0.4;
        p.angle += p.spin;
        if (p.y > c.height) {
          p.y = -10;
          p.x = Math.random() * c.width;
        }
      });
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf.current);
  }, []);
  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

// Celebration Popup
function CelebrationPopup({
  achiever,
  rank,
  isXII,
  onClose,
}: {
  achiever: Achiever;
  rank: number;
  isXII: boolean;
  onClose: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rm = RANK_META[rank - 1];
  const accentGrad = isXII
    ? "linear-gradient(135deg, oklch(0.28 0.12 262), oklch(0.42 0.15 260))"
    : "linear-gradient(135deg, oklch(0.22 0.10 262), oklch(0.35 0.16 258))";
  const pctGrad = isXII
    ? "linear-gradient(135deg, oklch(0.42 0.15 260), oklch(0.82 0.15 82))"
    : "linear-gradient(135deg, oklch(0.32 0.14 260), oklch(0.52 0.18 255))";
  const accentLabel = isXII ? "oklch(0.82 0.15 82)" : "oklch(0.75 0.12 240)";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.75, opacity: 0, y: 48 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" },
      );
    }
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(5,10,30,0.88)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <Confetti />
      </div>

      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          zIndex: 10,
          background: "white",
          borderRadius: "2.5rem",
          overflow: "hidden",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            zIndex: 20,
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <X size={14} />
        </button>

        {/* Banner */}
        <div
          style={{
            background: accentGrad,
            padding: "2rem 2rem 3.5rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-40px",
              right: "-40px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.07)",
              pointerEvents: "none",
            }}
          />
          <span
            style={{
              display: "inline-block",
              background: rm.badge,
              color: rm.badgeText,
              borderRadius: "999px",
              padding: "4px 14px",
              marginBottom: "0.75rem",
              fontSize: "0.7rem",
              fontWeight: 800,
              fontFamily: "'Inter',sans-serif",
              letterSpacing: "0.1em",
              boxShadow: `0 4px 14px ${rm.ring}44`,
            }}
          >
            {rm.emoji && <span style={{ marginRight: "4px" }}>{rm.emoji}</span>}
            {rm.label} Rank
          </span>
          <div
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: accentLabel,
              marginBottom: "0.4rem",
            }}
          >
            {isXII ? "ISC Class XII" : "ICSE Class X"} · 2025-26
          </div>
          <div
            style={{
              fontFamily: "'Fraunces',serif",
              fontSize: "1.45rem",
              fontWeight: 600,
              color: "white",
            }}
          >
            Congratulations! 🎉
          </div>
        </div>

        {/* Avatar — overlaps banner */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-52px",
            position: "relative",
            zIndex: 5,
          }}
        >
          <div
            style={{
              width: "104px",
              height: "104px",
              borderRadius: "50%",
              border: `4px solid ${rm.ring}`,
              padding: "3px",
              background: "white",
              boxShadow: `0 8px 32px ${rm.ring}55, 0 0 0 8px white`,
            }}
          >
            <img
              src={achiever.poster}
              alt={achiever.name}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "1.1rem 2rem 2rem", textAlign: "center" }}>
          <h4
            style={{
              fontFamily: "'Fraunces',serif",
              fontSize: "1.35rem",
              fontWeight: 600,
              color: "oklch(0.18 0.04 262)",
              margin: "0 0 0.2rem",
              letterSpacing: "-0.01em",
            }}
          >
            {achiever.name}
          </h4>
          <div
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.67rem",
              fontWeight: 600,
              color: "oklch(0.55 0.03 260)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "1.1rem",
            }}
          >
            {achiever.exam}
          </div>

          {/* Big percentage */}
          <div
            style={{
              fontFamily: "'Fraunces',serif",
              fontSize: "3.8rem",
              fontWeight: 700,
              lineHeight: 1,
              background: pctGrad,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "0.4rem",
            }}
          >
            {achiever.pct}
          </div>
          <div
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.68rem",
              fontWeight: 600,
              color: "oklch(0.60 0.04 260)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
            }}
          >
            Aggregate Score
          </div>

          <p
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.82rem",
              color: "oklch(0.50 0.04 260)",
              lineHeight: 1.65,
              margin: "0 0 1.5rem",
            }}
          >
            Your hard work and dedication have truly paid off. We are incredibly proud of you! 🌟
          </p>

          <button
            onClick={onClose}
            style={{
              width: "100%",
              padding: "12px",
              background: accentGrad,
              color: "white",
              border: "none",
              borderRadius: "1rem",
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.04em",
              boxShadow: "0 4px 16px oklch(0.42 0.15 260 / 0.28)",
            }}
          >
            Close ✕
          </button>
        </div>
      </div>
    </div>
  );
}

// Single List Row
function AchieverRow({
  a,
  rank,
  isXII,
  delay,
  onOpen,
}: {
  a: Achiever;
  rank: number;
  isXII: boolean;
  delay: number;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const rm = RANK_META[rank - 1];
  const accent = isXII ? "oklch(0.82 0.15 82)" : "oklch(0.52 0.18 255)";
  const accentGrad = isXII
    ? "linear-gradient(135deg, oklch(0.82 0.15 82), oklch(0.72 0.13 55))"
    : "linear-gradient(135deg, oklch(0.52 0.18 255), oklch(0.42 0.15 260))";

  return (
    <motion.button
      initial={{ opacity: 0, x: isXII ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.2, margin: "-5%" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`View ${a.name}`}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.9rem",
        padding: "0.7rem 1rem",
        borderRadius: "1rem",
        background: hovered
          ? isXII
            ? "oklch(0.82 0.15 82 / 0.07)"
            : "oklch(0.52 0.18 255 / 0.07)"
          : "transparent",
        border: `1px solid ${hovered ? accent + "44" : "transparent"}`,
        transition: "all 0.22s ease",
        transform: hovered ? "translateX(4px)" : "translateX(0)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Rank */}
      <div
        style={{
          width: "28px",
          flexShrink: 0,
          textAlign: "center",
          fontFamily: "'Inter',sans-serif",
          fontSize: rank <= 3 ? "1.15rem" : "0.72rem",
          fontWeight: 700,
          color: rank <= 3 ? undefined : "oklch(0.60 0.04 260)",
          lineHeight: 1,
        }}
      >
        {rank <= 3 ? rm.emoji : <span style={{ fontFeatureSettings: "'tnum'" }}>0{rank}</span>}
      </div>

      {/* Circle photo */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        {/* Pulse ring for top 3 */}
        {rank <= 3 && (
          <span
            style={{
              position: "absolute",
              inset: "-4px",
              borderRadius: "50%",
              border: `1.5px solid ${rm.ring}`,
              animation: "lfs-pulse 2.2s ease-out infinite",
              opacity: hovered ? 1 : 0.55,
            }}
          />
        )}
        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            padding: "2px",
            background: hovered ? accentGrad : `linear-gradient(135deg, ${rm.ring}, ${accent}88)`,
            transition: "all 0.25s ease",
            boxShadow: hovered ? `0 4px 18px ${accent}44` : "none",
            overflow: "hidden",
          }}
        >
          <img
            src={a.avatar}
            alt={a.name}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
              border: "2px solid white",
              transition: "transform 0.3s ease",
              transform: hovered ? "scale(1.08)" : "scale(1)",
            }}
          />
        </div>
      </div>

      {/* Name + exam */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "'Fraunces',serif",
            fontSize: "0.97rem",
            fontWeight: 500,
            color: hovered ? "oklch(0.22 0.08 262)" : "oklch(0.22 0.04 262)",
            lineHeight: 1.25,
            transition: "color 0.2s",
          }}
        >
          {a.name}
        </div>
        <div
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "0.62rem",
            fontWeight: 600,
            color: "oklch(0.58 0.03 260)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginTop: "2px",
          }}
        >
          {a.exam}
        </div>
      </div>

      {/* Percentage */}
      <div style={{ flexShrink: 0, textAlign: "right" }}>
        <div
          style={{
            fontFamily: "'Fraunces',serif",
            fontSize: "1.15rem",
            fontWeight: 700,
            background: hovered ? accentGrad : "none",
            WebkitBackgroundClip: hovered ? "text" : "unset",
            WebkitTextFillColor: hovered ? "transparent" : "oklch(0.28 0.12 262)",
            color: hovered ? "transparent" : "oklch(0.28 0.12 262)",
            transition: "all 0.22s",
            lineHeight: 1,
          }}
        >
          {a.pct}
        </div>
        <div
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "0.58rem",
            fontWeight: 600,
            color: "oklch(0.65 0.04 260)",
            marginTop: "3px",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          tap to celebrate →
        </div>
      </div>
    </motion.button>
  );
}

// Toppers Panel
function ToppersPanel({ title, list, isXII }: { title: string; list: Achiever[]; isXII: boolean }) {
  const [popup, setPopup] = useState<{ a: Achiever; rank: number } | null>(null);
  const accentGrad = isXII
    ? "linear-gradient(135deg, oklch(0.28 0.12 262), oklch(0.42 0.15 260))"
    : "linear-gradient(135deg, oklch(0.22 0.10 262), oklch(0.35 0.16 258))";
  const accentLabel = isXII ? "oklch(0.82 0.15 82)" : "oklch(0.75 0.12 240)";

  return (
    <>
      <AnimatePresence>
        {popup && (
          <motion.div
            key="popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <CelebrationPopup
              achiever={popup.a}
              rank={popup.rank}
              isXII={isXII}
              onClose={() => setPopup(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        style={{
          borderRadius: "1.75rem",
          overflow: "hidden",
          border: "1.5px solid oklch(0.42 0.15 260 / 0.10)",
          boxShadow: "0 4px 24px oklch(0.28 0.12 262 / 0.07), 0 1px 0 oklch(0.42 0.15 260 / 0.05)",
          background: "white",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: accentGrad,
            padding: "1.1rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <Trophy size={17} color={isXII ? "oklch(0.82 0.15 82)" : "oklch(0.75 0.12 240)"} />
          <div>
            <div
              style={{
                fontFamily: "'Fraunces',serif",
                fontSize: "1.05rem",
                fontWeight: 600,
                color: "white",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: accentLabel,
                marginTop: "1px",
              }}
            >
              2025–26 · Tap a row to celebrate 🎉
            </div>
          </div>
        </div>

        {/* Column headers */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.9rem",
            padding: "0.6rem 1rem 0.5rem",
            borderBottom: "1px solid oklch(0.42 0.15 260 / 0.08)",
            background: "oklch(0.975 0.008 250)",
          }}
        >
          <div style={{ width: "28px" }} />
          <div style={{ width: "46px" }} />
          <div
            style={{
              flex: 1,
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "oklch(0.58 0.03 260)",
            }}
          >
            Student
          </div>
          <div
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "oklch(0.58 0.03 260)",
              textAlign: "right",
            }}
          >
            Score
          </div>
        </div>

        {/* Rows */}
        <div style={{ padding: "0.5rem 0.5rem 0.75rem" }}>
          {list.map((a, i) => (
            <AchieverRow
              key={a.name}
              a={a}
              rank={i + 1}
              isXII={isXII}
              delay={i * 0.07}
              onOpen={() => setPopup({ a, rank: i + 1 })}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes lfs-pulse {
          0%   { transform: scale(1);    opacity: 0.7; }
          60%  { transform: scale(1.22); opacity: 0;   }
          100% { transform: scale(1.22); opacity: 0;   }
        }
      `}</style>
    </>
  );
}

// Main Export
export function Achievers() {
  const [achievers, setAchievers] = useState<Achiever[]>([]);

  useEffect(() => {
    getAchievers()
      .then((data) => {
        if (data && data.length > 0) {
          const mappedData = data.map((item: any, index: number) => {
            const normName = (item.name || "").trim().toLowerCase();
            const known = KNOWN_ACHIEVERS_MAP[normName];

            // Extract pct if stored in item or achievement
            let pct = item.pct || "";
            if (!pct && item.achievement) {
              const match = item.achievement.match(/\d+(\.\d+)?%/);
              if (match) pct = match[0];
            }
            if (!pct && known) {
              pct = known.pct;
            }

            let exam = item.exam || item.achievement || "";
            // Clean up exam title if needed
            if (exam.startsWith(pct)) {
              exam = exam.replace(pct, "").replace(/^ in /i, "").trim();
            }
            if ((!exam || exam === "Achiever") && known) {
              exam = known.exam;
            }

            const img = item.imageUrl || item.avatar || getFallbackImage(item.name) || (known ? known.avatar : img12_angel);

            return {
              _id: item._id,
              name: item.name,
              exam: exam || (known ? known.exam : (item.batchYear ? `Class XII · ${item.batchYear}` : "2025-26")),
              pct: pct || (known ? known.pct : "95.00%"),
              avatar: img,
              poster: img,
              rank: item.rank !== undefined && item.rank !== null && item.rank !== "" && Number(item.rank) !== 99 ? Number(item.rank) : index + 1,
              batchYear: item.batchYear || "2025-26",
              achievement: item.achievement || (known ? `${known.pct} in ${known.exam}` : ""),
            };
          });
          setAchievers(mappedData);
        }
      })
      .catch(console.error);
  }, []);

  const parseScore = (pctStr: string = "") => {
    const val = parseFloat(pctStr.replace("%", "").trim());
    return isNaN(val) ? 0 : val;
  };

  const isClassXII = (a: Achiever) => {
    const normName = (a.name || "").trim().toLowerCase();
    const known = KNOWN_ACHIEVERS_MAP[normName];
    if (known) return known.isXII;
    const str = `${a.exam || ""} ${a.achievement || ""}`.toUpperCase();
    return str.includes("XII") || str.includes("12") || str.includes("ISC");
  };

  const isClassX = (a: Achiever) => {
    const normName = (a.name || "").trim().toLowerCase();
    const known = KNOWN_ACHIEVERS_MAP[normName];
    if (known) return !known.isXII;
    const str = `${a.exam || ""} ${a.achievement || ""}`.toUpperCase();
    return (str.includes("X") || str.includes("10") || str.includes("ICSE")) || !isClassXII(a);
  };

  const sortList = (list: Achiever[]) => {
    return [...list].sort((a, b) => {
      if (a.rank && b.rank && a.rank !== b.rank) return a.rank - b.rank;
      return parseScore(b.pct) - parseScore(a.pct);
    });
  };

  const top12Filtered = sortList(achievers.filter(isClassXII));
  const top10Filtered = sortList(achievers.filter(isClassX));

  const top12 = top12Filtered.length > 0 ? top12Filtered.slice(0, 5) : CLASS12;
  const top10 = top10Filtered.length > 0 ? top10Filtered.slice(0, 5) : CLASS10;

  const currentSession = achievers[0]?.batchYear || "2025-26";

  return (
    <section className="screen-fit-section overflow-hidden bg-[color:var(--section)]">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <SectionEyebrow>Class of {currentSession}</SectionEyebrow>
            <Reveal
              as="h2"
              className="text-display text-[clamp(2.2rem,5vw,3.75rem)] text-[color:var(--ink)]"
            >
              Our achievers,
              <br />
              <span className="italic text-[color:var(--navy)]">on the record.</span>
            </Reveal>
          </div>
          <Link
            to="/achievers"
            className="text-sm font-semibold text-[color:var(--navy)] story-link"
          >
            See the full honour roll →
          </Link>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <ToppersPanel title="Class XII (ISC) Toppers" list={top12} isXII={true} />
          <ToppersPanel title="Class X (ICSE) Toppers" list={top10} isXII={false} />
        </div>
      </div>
    </section>
  );
}
