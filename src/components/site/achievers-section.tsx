import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Star, Trophy } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Image imports
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

// Data
interface Achiever {
  name: string;
  exam: string;
  pct: string;
  poster: string;
  avatar: string;
  rank: number;
}

const ALL_ACHIEVERS: Achiever[] = [
  {
    name: "ANGEL VERMA",
    exam: "ISC XII · 2025-26",
    pct: "98.00%",
    poster: img12_angel,
    avatar: img12_angel,
    rank: 1,
  },
  {
    name: "DIVYANSHU SHARMA",
    exam: "ICSE X · 2025-26",
    pct: "97.80%",
    poster: img10_divyansh,
    avatar: img10_divyansh,
    rank: 2,
  },
  {
    name: "PRIYANSHU SINGH",
    exam: "ISC XII · 2025-26",
    pct: "95.75%",
    poster: img12_priy,
    avatar: img12_priy,
    rank: 3,
  },
  {
    name: "LAXMI",
    exam: "ISC XII · 2025-26",
    pct: "95.75%",
    poster: img12_laxmi,
    avatar: img12_laxmi,
    rank: 3,
  },
  {
    name: "ADARSH BARANWAL",
    exam: "ICSE X · 2025-26",
    pct: "95.60%",
    poster: img10_adarsh,
    avatar: img10_adarsh,
    rank: 5,
  },
  {
    name: "PUTUL SHARMA",
    exam: "ISC XII · 2025-26",
    pct: "95.00%",
    poster: img12_putul,
    avatar: img12_putul,
    rank: 6,
  },
  {
    name: "SANIDHYA KUMAR GUPTA",
    exam: "ISC XII · 2025-26",
    pct: "95.00%",
    poster: img12_sanidhya,
    avatar: img12_sanidhya,
    rank: 6,
  },
  {
    name: "SAMAR GUPTA",
    exam: "ICSE X · 2025-26",
    pct: "94.40%",
    poster: img10_samar,
    avatar: img10_samar,
    rank: 8,
  },
  {
    name: "ANANYA GUPTA",
    exam: "ICSE X · 2025-26",
    pct: "94.00%",
    poster: img10_ananya,
    avatar: img10_ananya,
    rank: 9,
  },
  {
    name: "RIYA YADAV",
    exam: "ICSE X · 2025-26",
    pct: "93.60%",
    poster: img10_riya,
    avatar: img10_riya,
    rank: 10,
  },
  {
    name: "SHREYA BARANWAL",
    exam: "ISC XII · 2025-26",
    pct: "90.25%",
    poster: img12_shreya,
    avatar: img12_shreya,
    rank: 11,
  },
  {
    name: "VIKAS KUSHWAHA",
    exam: "ISC XII · 2025-26",
    pct: "89.50%",
    poster: img12_vikas,
    avatar: img12_vikas,
    rank: 12,
  },
  {
    name: "AKSHAJ SRIVASTAV",
    exam: "ISC XII · 2025-26",
    pct: "89.00%",
    poster: img12_akshaj,
    avatar: img12_akshaj,
    rank: 13,
  },
  {
    name: "SANKET TIWARI",
    exam: "ICSE X · 2025-26",
    pct: "89.00%",
    poster: img10_riya,
    avatar: img10_riya,
    rank: 13,
  },
];

function computeRanks(list: Achiever[]): Map<string, number> {
  const m = new Map<string, number>();
  let rank = 1;
  list.forEach((a, i) => {
    if (i > 0 && a.pct !== list[i - 1].pct) rank = i + 1;
    m.set(a.name, rank);
  });
  return m;
}

// Confetti Canvas
function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const COLORS = ["#FDB515", "#0B4DA2", "#ffffff", "#ff6b6b", "#a8edea", "#fed6e3"];
    const pieces = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: Math.random() * 1.8 + 0.8,
      swing: Math.random() * 1.4 - 0.7,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.12,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.8;
        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
        ctx.restore();
        p.y += p.speed;
        p.x += p.swing * 0.4;
        p.angle += p.spin;
        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
      });
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 z-[5]" />;
}



// Hero Slideshow
function HeroSlideshow({ achieversList }: { achieversList: Achiever[] }) {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const imgRef = useRef<HTMLImageElement>(null);
  const prevImgRef = useRef<HTMLImageElement>(null);

  const go = useCallback(
    (next: number, d: 1 | -1 = 1) => {
      setPrev(cur);
      setDir(d);
      setCur(next);
      clearTimeout(timerRef.current);
    },
    [cur],
  );

  useEffect(() => {
    timerRef.current = setTimeout(() => go((cur + 1) % achieversList.length, 1), 3000);
    return () => clearTimeout(timerRef.current);
  }, [cur, go]);

  // Animate on change
  useEffect(() => {
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { x: dir * 60, opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, duration: 0.55, ease: "power3.out" },
      );
    }
    if (prevImgRef.current && prev !== null) {
      gsap.to(prevImgRef.current, {
        x: dir * -60,
        opacity: 0,
        scale: 0.96,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [cur]);

  const a = achieversList[cur];
  const p = prev !== null ? achieversList[prev] : null;
  const isXII = a.exam.includes("XII");

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "2.5rem",
        overflow: "hidden",
        background:
          "linear-gradient(145deg, oklch(0.22 0.10 262) 0%, oklch(0.32 0.14 260) 50%, oklch(0.20 0.08 262) 100%)",
        boxShadow: "0 32px 80px oklch(0.20 0.10 262 / 0.55), inset 0 1px 0 oklch(1 0 0 / 0.08)",
        minHeight: "500px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Confetti />

      {/* Decorative rings */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          border: "1px solid oklch(0.82 0.15 82 / 0.12)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          border: "1px solid oklch(0.82 0.15 82 / 0.08)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          border: "1px solid oklch(0.82 0.15 82 / 0.06)",
          pointerEvents: "none",
        }}
      />

      {/* Main layout */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "3rem",
          padding: "2.5rem 3rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Poster */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          {p && (
            <img
              ref={prevImgRef}
              src={p.poster}
              alt={p.name}
              style={{
                position: "absolute",
                inset: 0,
                width: "320px",
                maxWidth: "90vw",
                borderRadius: "1.75rem",
                objectFit: "contain",
              }}
            />
          )}
          <img
            ref={imgRef}
            src={a.poster}
            alt={a.name}
            style={{
              width: "320px",
              maxWidth: "90vw",
              borderRadius: "1.75rem",
              objectFit: "contain",
              display: "block",
              filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.5))",
            }}
          />
        </div>

        {/* Info panel */}
        <div style={{ flex: "1 1 260px", minWidth: 0 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: isXII ? "oklch(0.82 0.15 82 / 0.15)" : "oklch(0.42 0.15 260 / 0.3)",
              border: `1px solid ${isXII ? "oklch(0.82 0.15 82 / 0.3)" : "oklch(0.6 0.15 260 / 0.4)"}`,
              borderRadius: "999px",
              padding: "4px 14px",
              marginBottom: "1rem",
            }}
          >
            <Trophy size={12} color={isXII ? "#FDB515" : "#93c5fd"} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: isXII ? "oklch(0.82 0.15 82)" : "oklch(0.75 0.12 240)",
              }}
            >
              {isXII ? "ISC Class XII" : "ICSE Class X"} · 2025-26
            </span>
          </div>

          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 600,
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: "0 0 0.5rem",
            }}
          >
            {a.name}
          </h3>

          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", margin: "1rem 0" }}>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1,
                background: "linear-gradient(135deg, #FDB515, #FFE066)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {a.pct}
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "oklch(0.75 0.05 260)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Aggregate
            </span>
          </div>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              color: "oklch(0.78 0.05 260)",
              lineHeight: 1.6,
              margin: "0 0 1.5rem",
            }}
          >
            Congratulations on this outstanding achievement! Your hard work and dedication have
            truly paid off.
          </p>

          {/* Progress bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  color: "oklch(0.65 0.05 260)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Score
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  color: "oklch(0.82 0.15 82)",
                }}
              >
                {a.pct}
              </span>
            </div>
            <div
              style={{
                height: "6px",
                borderRadius: "999px",
                background: "oklch(1 0 0 / 0.1)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: "999px",
                  width: a.pct,
                  background: "linear-gradient(90deg, #FDB515, #FFE066)",
                  transition: "width 0.8s cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </div>
          </div>

          {/* Slide counter */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "1.5rem" }}>
            <button
              onClick={() => go((cur - 1 + achieversList.length) % achieversList.length, -1)}
              aria-label="Previous"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "1px solid oklch(1 0 0 / 0.2)",
                background: "oklch(1 0 0 / 0.06)",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
                flexShrink: 0,
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <div style={{ display: "flex", gap: "5px", flex: 1, overflow: "hidden" }}>
              {achieversList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > cur ? 1 : -1)}
                  aria-label={`Slide ${i + 1}`}
                  style={{
                    flexShrink: 0,
                    width: i === cur ? "22px" : "6px",
                    height: "6px",
                    borderRadius: "999px",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    background: i === cur ? "oklch(0.82 0.15 82)" : "oklch(1 0 0 / 0.25)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => go((cur + 1) % achieversList.length, 1)}
              aria-label="Next"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "1px solid oklch(1 0 0 / 0.2)",
                background: "oklch(1 0 0 / 0.06)",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
                flexShrink: 0,
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Lightbox
function LightboxModal({ achiever, onClose }: { achiever: Achiever; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.4)" },
      );
    }
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(10px)",
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
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", zIndex: 10, maxWidth: "500px", width: "100%" }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "-12px",
            right: "-12px",
            zIndex: 20,
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FDB515, #FFE066)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "oklch(0.22 0.10 262)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          <X size={16} strokeWidth={2.5} />
        </button>
        <img
          src={achiever.poster}
          alt={achiever.name}
          style={{
            width: "100%",
            borderRadius: "1.75rem",
            objectFit: "contain",
            boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

// Rank Badge
function rankBadge(rank: number) {
  if (rank === 1)
    return { bg: "linear-gradient(135deg,#FFD700,#FFA500)", text: "#7c3800", label: "🥇 1st" };
  if (rank === 2)
    return { bg: "linear-gradient(135deg,#C0C0C0,#A8A8A8)", text: "#3a3a3a", label: "🥈 2nd" };
  if (rank === 3)
    return { bg: "linear-gradient(135deg,#CD7F32,#A0522D)", text: "#fff", label: "🥉 3rd" };
  return { bg: "oklch(0.42 0.15 260 / 0.09)", text: "oklch(0.42 0.15 260)", label: `#${rank}` };
}

// Achiever Card
function AchieverCard({
  a,
  displayRank,
  onClick,
}: {
  a: Achiever;
  displayRank: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const { bg, text, label } = rankBadge(displayRank);
  const isXII = a.exam.includes("XII");
  const accentColor = isXII ? "oklch(0.82 0.15 82)" : "oklch(0.52 0.18 255)";
  const accentGrad = isXII
    ? "linear-gradient(180deg, oklch(0.82 0.15 82), oklch(0.72 0.13 55))"
    : "linear-gradient(180deg, oklch(0.52 0.18 255), oklch(0.42 0.15 260))";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`View ${a.name}'s achievement card`}
      style={{
        all: "unset",
        cursor: "pointer",
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "stretch",
        borderRadius: "1.5rem",
        overflow: "hidden",
        background: "white",
        border: `1.5px solid ${hovered ? accentColor + "66" : "oklch(0.42 0.15 260 / 0.09)"}`,
        boxShadow: hovered
          ? `0 16px 48px oklch(0.28 0.12 262 / 0.14), 0 0 0 3px ${accentColor}22`
          : "0 2px 8px oklch(0.28 0.12 262 / 0.06)",
        transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)",
        transform: hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
        textAlign: "left",
        position: "relative",
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          width: "5px",
          flexShrink: 0,
          background: accentGrad,
          transition: "width 0.25s ease",
          ...(hovered ? { width: "7px" } : {}),
        }}
      />

      {/* Avatar section */}
      <div
        style={{
          padding: "1.25rem 1rem 1.25rem 1.25rem",
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div style={{ position: "relative" }}>
          {/* Glow ring */}
          {hovered && (
            <div
              style={{
                position: "absolute",
                inset: "-5px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${accentColor}33 0%, transparent 70%)`,
                animation: "lfs-glow-pulse 1.5s ease-in-out infinite",
              }}
            />
          )}
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              border: `3px solid ${hovered ? accentColor : accentColor + "88"}`,
              padding: "2px",
              overflow: "hidden",
              boxShadow: hovered ? `0 0 0 5px ${accentColor}22` : "none",
              transition: "all 0.28s ease",
              background: "white",
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
                transition: "transform 0.3s ease",
                transform: hovered ? "scale(1.05)" : "scale(1)",
              }}
            />
          </div>
          {/* Class tag */}
          <span
            style={{
              position: "absolute",
              bottom: "-2px",
              left: "50%",
              transform: "translateX(-50%)",
              background: accentGrad,
              color: isXII ? "oklch(0.22 0.10 262)" : "white",
              fontSize: "7px",
              fontWeight: 800,
              fontFamily: "'Inter', sans-serif",
              padding: "2px 7px",
              borderRadius: "999px",
              border: "2px solid white",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
            }}
          >
            {isXII ? "CLASS XII" : "CLASS X"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          padding: "1.25rem 0.5rem 1.25rem 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "1.05rem",
            fontWeight: 500,
            color: "oklch(0.18 0.04 262)",
            lineHeight: 1.25,
            wordBreak: "break-word",
          }}
        >
          {a.name}
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.68rem",
            fontWeight: 600,
            color: "oklch(0.55 0.03 260)",
            marginTop: "0.3rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {a.exam}
        </div>
        {/* Mini progress bar */}
        <div
          style={{
            marginTop: "0.6rem",
            height: "3px",
            borderRadius: "999px",
            background: "oklch(0.42 0.15 260 / 0.08)",
            overflow: "hidden",
            width: "80%",
            maxWidth: "140px",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: "999px",
              width: a.pct,
              background: accentGrad,
              transition: "width 0.6s ease",
            }}
          />
        </div>
      </div>

      {/* Right: Percentage + Rank */}
      <div
        style={{
          padding: "1.25rem 1.4rem 1.25rem 0.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: "6px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "1.4rem",
            fontWeight: 700,
            background: hovered ? accentGrad : "none",
            WebkitBackgroundClip: hovered ? "text" : "unset",
            WebkitTextFillColor: hovered ? "transparent" : "oklch(0.28 0.12 262)",
            color: hovered ? "transparent" : "oklch(0.28 0.12 262)",
            whiteSpace: "nowrap",
            transition: "all 0.25s",
          }}
        >
          {a.pct}
        </div>
        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            background: bg,
            color: text,
            padding: "3px 10px",
            borderRadius: "999px",
            fontFamily: "'Inter', sans-serif",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          {label}
        </span>
        {/* Click hint */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 500,
            color: "oklch(0.65 0.05 260)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s",
            letterSpacing: "0.05em",
          }}
        >
          View poster →
        </span>
      </div>
    </button>
  );
}

// Section Heading with GSAP
function SectionHeading({
  filter,
  onFilter,
}: {
  filter: "all" | "XII" | "X";
  onFilter: (f: "all" | "XII" | "X") => void;
}) {
  const headRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headRef.current) {
        gsap.from(headRef.current.querySelector("p"), {
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      }
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          delay: 0.1,
          ease: "power3.out",
        });
      }
      if (tabsRef.current) {
        gsap.from(tabsRef.current.children, {
          scrollTrigger: {
            trigger: tabsRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          y: 16,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.2,
          ease: "back.out(1.6)",
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const title =
    filter === "XII" ? "Class XII Toppers" : filter === "X" ? "Class X Toppers" : "All Achievers";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        marginBottom: "2rem",
      }}
    >
      <div ref={headRef}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "oklch(0.42 0.15 260)",
            margin: "0 0 0.4rem",
          }}
        >
          Honour Roll · 2025-26
        </p>
        <h2
          ref={titleRef}
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: 500,
            color: "oklch(0.18 0.04 262)",
            letterSpacing: "-0.025em",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {title}
          <Star
            size={20}
            color="oklch(0.82 0.15 82)"
            fill="oklch(0.82 0.15 82)"
            style={{ flexShrink: 0 }}
          />
        </h2>
      </div>
      <div ref={tabsRef} style={{ display: "flex", gap: "8px" }}>
        {(["all", "XII", "X"] as const).map((f) => (
          <button
            key={f}
            onClick={() => onFilter(f)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              padding: "7px 18px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              background:
                filter === f
                  ? "linear-gradient(135deg, oklch(0.42 0.15 260), oklch(0.32 0.14 260))"
                  : "white",
              color: filter === f ? "white" : "oklch(0.42 0.15 260)",
              boxShadow:
                filter === f
                  ? "0 4px 14px oklch(0.42 0.15 260 / 0.3)"
                  : "0 1px 4px oklch(0.42 0.15 260 / 0.1)",
              transition: "all 0.25s ease",
              letterSpacing: "0.05em",
            }}
          >
            {f === "all" ? "All" : `Class ${f}`}
          </button>
        ))}
      </div>
    </div>
  );
}

// Animated Cards Grid
function CardsGrid({
  filtered,
  rankMap,
  onSelect,
}: {
  filtered: Achiever[];
  rankMap: Map<string, number>;
  onSelect: (a: Achiever) => void;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const prevFilterKey = useRef<string>("");
  const filterKey = filtered.map((a) => a.name).join(",");

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".achiever-card");
    if (!cards.length) return;

    const isFilterChange = prevFilterKey.current !== "" && prevFilterKey.current !== filterKey;
    prevFilterKey.current = filterKey;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          {
            x: isFilterChange ? (fromLeft ? -50 : 50) : fromLeft ? -70 : 70,
            opacity: 0,
            scale: 0.95,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: isFilterChange ? 0.45 : 0.65,
            delay: isFilterChange ? i * 0.05 : 0,
            ease: "power3.out",
            ...(isFilterChange
              ? {}
              : {
                  scrollTrigger: {
                    trigger: card,
                    start: "top 88%",
                    toggleActions: "play none none reverse",
                  },
                }),
          },
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, [filterKey]);

  return (
    <div
      ref={gridRef}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))",
        gap: "1rem",
      }}
    >
      {filtered.map((a) => (
        <div key={a.name} className="achiever-card">
          <AchieverCard
            a={a}
            displayRank={rankMap.get(a.name) ?? a.rank}
            onClick={() => onSelect(a)}
          />
        </div>
      ))}
    </div>
  );
}

// Main Export
export function AchieversSection({ data }: { data?: Achiever[] }) {
  const [selected, setSelected] = useState<Achiever | null>(null);
  const [filter, setFilter] = useState<"all" | "XII" | "X">("all");
  const slideshowRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  const achieversList = data && data.length > 0 ? data : ALL_ACHIEVERS;

  const filtered = achieversList.filter((a) =>
    filter === "all" ? true : a.exam.includes(filter === "XII" ? "XII" : "X ·"),
  );
  const rankMap = computeRanks(filtered);

  // Slideshow scroll-in
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (slideshowRef.current) {
        gsap.from(slideshowRef.current, {
          scrollTrigger: {
            trigger: slideshowRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          scale: 0.97,
          duration: 0.9,
          ease: "power3.out",
        });
      }
      if (hintRef.current) {
        gsap.from(hintRef.current, {
          scrollTrigger: {
            trigger: hintRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
          y: 12,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {selected && <LightboxModal achiever={selected} onClose={() => setSelected(null)} />}

      <section
        style={{
          background:
            "linear-gradient(180deg, oklch(0.978 0.010 250) 0%, oklch(0.968 0.014 252) 100%)",
          padding: "4.5rem 0 5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-120px",
              right: "-180px",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, oklch(0.82 0.15 82 / 0.06) 0%, transparent 65%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-100px",
              left: "-150px",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, oklch(0.42 0.15 260 / 0.05) 0%, transparent 65%)",
            }}
          />
          {/* Subtle grid dots */}
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4 }}
          >
            <defs>
              <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="oklch(0.42 0.15 260 / 0.12)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="container-page" style={{ position: "relative" }}>
          {/* Slideshow */}
          <div ref={slideshowRef} style={{ marginBottom: "3.5rem" }}>
            <HeroSlideshow achieversList={achieversList} />
          </div>

          {/* Heading + filters */}
          <SectionHeading filter={filter} onFilter={setFilter} />

          {/* Cards */}
          <CardsGrid filtered={filtered} rankMap={rankMap} onSelect={setSelected} />

          {/* Hint */}
          <p
            ref={hintRef}
            style={{
              textAlign: "center",
              marginTop: "2rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.73rem",
              color: "oklch(0.58 0.04 260)",
              letterSpacing: "0.04em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <Trophy size={14} color="oklch(0.82 0.15 82)" />
            Tap any card to view the achievement poster
            <Trophy size={14} color="oklch(0.82 0.15 82)" />
          </p>
        </div>
      </section>

      <style>{`
        @keyframes lfs-glow-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.1); }
        }
      `}</style>
    </>
  );
}
