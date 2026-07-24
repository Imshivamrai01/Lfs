import { createFileRoute } from "@tanstack/react-router";
import { getAlbums, getPhotosByAlbum } from "../api/functions";
import { FolderOpen } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { GALLERY } from "@/lib/lfs-data";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  X,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Play,
  ZoomIn,
  Download,
  Maximize2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Enrich gallery data with captions
const PHOTOS = [
  {
    src: GALLERY[0],
    title: "Welcome & Orientation",
    desc: "Start of the new academic session",
    tag: "Events",
  },
  {
    src: GALLERY[1],
    title: "Investiture Ceremony",
    desc: "Oath taking of the student council",
    tag: "Events",
  },
  {
    src: GALLERY[2],
    title: "Cultural Dance Performance",
    desc: "Students performing at the Independence evening",
    tag: "Cultural",
  },
  {
    src: GALLERY[3],
    title: "Rowing & Water Drills",
    desc: "Annual sports field trip drill",
    tag: "Sports",
  },
  {
    src: GALLERY[4],
    title: "Independence Day Parade",
    desc: "March past on the school grounds",
    tag: "Events",
  },
  {
    src: GALLERY[5],
    title: "Yoga & Group Drill",
    desc: "Morning fitness and assembly drill",
    tag: "Sports",
  },
  {
    src: GALLERY[6],
    title: "School Choir Performance",
    desc: "Patriotic group singing performance",
    tag: "Cultural",
  },
  {
    src: GALLERY[7],
    title: "Ruby Jubilee Celebrations",
    desc: "Commemorating 40 years of service",
    tag: "Celebrations",
  },
  // second pass for more items
  {
    src: GALLERY[0],
    title: "Morning Assembly",
    desc: "Students gather for the daily assembly",
    tag: "Academic",
  },
  {
    src: GALLERY[1],
    title: "Prize Distribution",
    desc: "Recognising academic excellence",
    tag: "Events",
  },
  {
    src: GALLERY[2],
    title: "Sports Day Finals",
    desc: "Track & field finals — Annual Sports Day",
    tag: "Sports",
  },
  {
    src: GALLERY[3],
    title: "Science Exhibition",
    desc: "Innovative student projects on display",
    tag: "Academic",
  },
  {
    src: GALLERY[4],
    title: "Annual Day Celebration",
    desc: "Cultural programmes and award ceremony",
    tag: "Celebrations",
  },
  {
    src: GALLERY[5],
    title: "Art & Craft Show",
    desc: "Creative works by students of all grades",
    tag: "Cultural",
  },
  {
    src: GALLERY[6],
    title: "Teacher's Day",
    desc: "Students honour their teachers",
    tag: "Events",
  },
  {
    src: GALLERY[7],
    title: "Christmas Celebration",
    desc: "Festive joy shared across the campus",
    tag: "Celebrations",
  },
];

const TAGS = ["All", "Events", "Sports", "Cultural", "Academic", "Celebrations"];
type Layout = "grid" | "list" | "slideshow";

// Tag Badge
const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Events: { bg: "oklch(0.42 0.15 260 / 0.12)", text: "oklch(0.42 0.15 260)" },
  Sports: { bg: "oklch(0.55 0.18 145 / 0.12)", text: "oklch(0.40 0.18 145)" },
  Cultural: { bg: "oklch(0.70 0.18 40  / 0.15)", text: "oklch(0.55 0.18 40)" },
  Academic: { bg: "oklch(0.60 0.18 300 / 0.12)", text: "oklch(0.45 0.18 300)" },
  Celebrations: { bg: "oklch(0.82 0.15 82  / 0.18)", text: "oklch(0.58 0.15 60)" },
};

// Premium Lightbox
function Lightbox({
  photos,
  startIdx,
  onClose,
}: {
  photos: typeof PHOTOS;
  startIdx: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIdx);
  const [zoomed, setZoomed] = useState(false);
  const filmRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const thumbRef = useRef<HTMLButtonElement[]>([]);

  const go = useCallback(
    (next: number) => {
      setZoomed(false);
      setIdx((next + photos.length) % photos.length);
    },
    [photos.length],
  );

  // Keyboard nav
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(idx + 1);
      if (e.key === "ArrowLeft") go(idx - 1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [idx, go, onClose]);

  // Scroll active thumbnail into view
  useEffect(() => {
    thumbRef.current[idx]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" },
      );
    }
  }, [idx]);

  const photo = photos[idx];
  const tc = TAG_COLORS[photo.tag] ?? TAG_COLORS.Events;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[9000] flex flex-col"
      style={{ background: "rgba(4, 6, 20, 0.96)", backdropFilter: "blur(16px)" }}
    >
      {/* Top bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {idx + 1} / {photos.length}
        </div>
        <div className="flex items-center gap-3">
          {/* Tag */}
          <span
            style={{
              background: tc.bg,
              color: tc.text,
              borderRadius: "999px",
              padding: "3px 12px",
              fontSize: "0.65rem",
              fontWeight: 700,
              fontFamily: "'Inter',sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {photo.tag}
          </span>
          {/* Download */}
          <a
            href={photo.src}
            download
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white/60 hover:text-white hover:bg-white/8 transition-all"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              fontSize: "0.72rem",
              fontFamily: "'Inter',sans-serif",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <Download size={13} />
            Save
          </a>
          {/* Zoom */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoomed((z) => !z);
            }}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white/60 hover:text-white transition-all"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              fontSize: "0.72rem",
              fontFamily: "'Inter',sans-serif",
              fontWeight: 600,
            }}
          >
            <ZoomIn size={13} />
            {zoomed ? "Fit" : "Zoom"}
          </button>
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main image area */}
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden"
        onClick={onClose}
      >
        {/* Prev */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            go(idx - 1);
          }}
          className="absolute left-4 z-10 rounded-full p-3 text-white/70 hover:text-white hover:bg-white/10 transition-all"
          style={{ border: "1px solid rgba(255,255,255,0.15)" }}
          aria-label="Previous"
        >
          <ChevronLeft size={22} />
        </button>

        <img
          ref={imgRef}
          key={idx}
          src={photo.src}
          alt={photo.title}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxHeight: zoomed ? "none" : "68vh",
            maxWidth: zoomed ? "none" : "82vw",
            width: zoomed ? "auto" : undefined,
            objectFit: "contain",
            borderRadius: zoomed ? "0" : "1.25rem",
            boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
            cursor: zoomed ? "zoom-out" : "zoom-in",
            transition: "border-radius 0.3s, box-shadow 0.3s",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setZoomed((z) => !z);
          }}
        />

        {/* Next */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            go(idx + 1);
          }}
          className="absolute right-4 z-10 rounded-full p-3 text-white/70 hover:text-white hover:bg-white/10 transition-all"
          style={{ border: "1px solid rgba(255,255,255,0.15)" }}
          aria-label="Next"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Caption */}
      <div className="text-center pb-3 px-6 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            fontFamily: "'Fraunces',serif",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "white",
          }}
        >
          {photo.title}
        </div>
        <div
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.5)",
            marginTop: "3px",
          }}
        >
          {photo.desc}
        </div>
      </div>

      {/* Filmstrip */}
      <div
        ref={filmRef}
        onClick={(e) => e.stopPropagation()}
        className="flex gap-2 px-4 pb-4 overflow-x-auto flex-shrink-0"
        style={{
          scrollbarWidth: "none",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "0.75rem",
        }}
      >
        {photos.map((p, i) => (
          <button
            key={i}
            ref={(el) => {
              if (el) thumbRef.current[i] = el;
            }}
            onClick={() => go(i)}
            aria-label={`Go to photo ${i + 1}`}
            style={{
              flexShrink: 0,
              width: "64px",
              height: "48px",
              borderRadius: "8px",
              overflow: "hidden",
              padding: 0,
              border: `2px solid ${i === idx ? "oklch(0.82 0.15 82)" : "transparent"}`,
              transition: "border-color 0.2s, opacity 0.2s, transform 0.2s",
              opacity: i === idx ? 1 : 0.45,
              transform: i === idx ? "scale(1.08)" : "scale(1)",
              cursor: "pointer",
              background: "none",
            }}
          >
            <img
              src={p.src}
              alt={p.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// Grid Card
function GridCard({
  photo,
  idx,
  onClick,
}: {
  photo: (typeof PHOTOS)[0];
  idx: number;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const tc = TAG_COLORS[photo.tag] ?? TAG_COLORS.Events;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={photo.title}
      className="gallery-card"
      style={{
        all: "unset",
        cursor: "pointer",
        display: "block",
        borderRadius: "1.25rem",
        overflow: "hidden",
        position: "relative",
        aspectRatio: idx % 5 === 0 ? "4/3" : "3/4",
        border: `1.5px solid ${hov ? "oklch(0.82 0.15 82 / 0.4)" : "rgba(0,0,0,0.07)"}`,
        boxShadow: hov ? "0 16px 48px rgba(0,0,0,0.14)" : "0 2px 8px rgba(0,0,0,0.06)",
        transition: "border-color 0.25s, box-shadow 0.25s",
        width: "100%",
      }}
    >
      <img
        src={photo.src}
        alt={photo.title}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 1s ease",
          transform: hov ? "scale(1.07)" : "scale(1)",
        }}
      />
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(4,6,20,0.85) 0%, rgba(4,6,20,0.2) 50%, transparent 100%)",
          opacity: hov ? 1 : 0,
          transition: "opacity 0.35s",
        }}
      />
      {/* Expand icon */}
      <div
        style={{
          position: "absolute",
          top: "0.75rem",
          right: "0.75rem",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          opacity: hov ? 1 : 0,
          transition: "opacity 0.3s",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <Maximize2 size={13} />
      </div>
      {/* Caption slide-up */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1rem",
          color: "white",
          transform: hov ? "translateY(0)" : "translateY(8px)",
          transition: "transform 0.35s",
          opacity: hov ? 1 : 0,
        }}
      >
        <span
          style={{
            background: tc.bg,
            color: tc.text,
            borderRadius: "999px",
            padding: "2px 10px",
            fontSize: "0.6rem",
            fontWeight: 700,
            fontFamily: "'Inter',sans-serif",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "6px",
            display: "inline-block",
          }}
        >
          {photo.tag}
        </span>
        <div
          style={{
            fontFamily: "'Fraunces',serif",
            fontSize: "0.95rem",
            fontWeight: 600,
            lineHeight: 1.25,
          }}
        >
          {photo.title}
        </div>
        <div
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.65)",
            marginTop: "2px",
          }}
        >
          {photo.desc}
        </div>
      </div>
    </button>
  );
}

// List Row
function ListRow({
  photo,
  num,
  onClick,
}: {
  photo: (typeof PHOTOS)[0];
  num: number;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const tc = TAG_COLORS[photo.tag] ?? TAG_COLORS.Events;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={photo.title}
      className="gallery-card"
      style={{
        all: "unset",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        padding: "0.85rem 1.1rem",
        borderRadius: "1rem",
        width: "100%",
        boxSizing: "border-box",
        background: hov ? "white" : "transparent",
        border: `1.5px solid ${hov ? "oklch(0.42 0.15 260 / 0.12)" : "transparent"}`,
        boxShadow: hov ? "0 4px 24px rgba(0,0,0,0.07)" : "none",
        transition: "all 0.22s ease",
        transform: hov ? "translateX(4px)" : "translateX(0)",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: "72px",
          height: "54px",
          borderRadius: "0.625rem",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={photo.src}
          alt={photo.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s",
            transform: hov ? "scale(1.08)" : "scale(1)",
          }}
        />
      </div>
      {/* Number */}
      <div
        style={{
          width: "28px",
          flexShrink: 0,
          fontFamily: "'Inter',sans-serif",
          fontSize: "0.72rem",
          fontWeight: 700,
          color: "oklch(0.65 0.04 260)",
          fontFeatureSettings: "'tnum'",
          textAlign: "right",
        }}
      >
        {String(num).padStart(2, "0")}
      </div>
      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "'Fraunces',serif",
            fontSize: "1rem",
            fontWeight: 500,
            color: hov ? "oklch(0.22 0.08 262)" : "oklch(0.22 0.04 262)",
            lineHeight: 1.3,
          }}
        >
          {photo.title}
        </div>
        <div
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "0.67rem",
            color: "oklch(0.58 0.03 260)",
            marginTop: "2px",
          }}
        >
          {photo.desc}
        </div>
      </div>
      {/* Tag */}
      <span
        style={{
          background: tc.bg,
          color: tc.text,
          borderRadius: "999px",
          padding: "3px 12px",
          fontSize: "0.62rem",
          fontWeight: 700,
          fontFamily: "'Inter',sans-serif",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          flexShrink: 0,
        }}
      >
        {photo.tag}
      </span>
      {/* Arrow */}
      <ChevronRight
        size={16}
        color="oklch(0.65 0.04 260)"
        style={{ flexShrink: 0, opacity: hov ? 1 : 0, transition: "opacity 0.2s" }}
      />
    </button>
  );
}

// Slideshow View
function SlideshowView({
  photos,
  onOpenLightbox,
}: {
  photos: typeof PHOTOS;
  onOpenLightbox: (i: number) => void;
}) {
  const [cur, setCur] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const go = useCallback(
    (next: number) => {
      setCur((next + photos.length) % photos.length);
      clearTimeout(timerRef.current);
    },
    [photos.length],
  );

  useEffect(() => {
    timerRef.current = setTimeout(() => go(cur + 1), 4000);
    return () => clearTimeout(timerRef.current);
  }, [cur, go]);

  useEffect(() => {
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" },
      );
    }
  }, [cur]);

  const photo = photos[cur];
  const tc = TAG_COLORS[photo.tag] ?? TAG_COLORS.Events;

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "2rem",
        overflow: "hidden",
        background: "oklch(0.14 0.06 262)",
        minHeight: "520px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Big image */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <img
          ref={imgRef}
          src={photo.src}
          alt={photo.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            minHeight: "400px",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(4,6,20,0.88) 0%, rgba(4,6,20,0.2) 60%, transparent 100%)",
          }}
        />
        {/* Caption */}
        <div
          style={{
            position: "absolute",
            bottom: "1.5rem",
            left: "2rem",
            right: "5rem",
            color: "white",
          }}
        >
          <span
            style={{
              background: tc.bg,
              color: tc.text,
              borderRadius: "999px",
              padding: "3px 12px",
              fontSize: "0.65rem",
              fontWeight: 700,
              fontFamily: "'Inter',sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "8px",
              display: "inline-block",
            }}
          >
            {photo.tag}
          </span>
          <div
            style={{
              fontFamily: "'Fraunces',serif",
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            {photo.title}
          </div>
          <div
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.6)",
              marginTop: "4px",
            }}
          >
            {photo.desc}
          </div>
        </div>
        {/* Expand */}
        <button
          onClick={() => onOpenLightbox(cur)}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            cursor: "pointer",
          }}
        >
          <Maximize2 size={16} />
        </button>
        {/* Prev/Next */}
        <button
          onClick={() => go(cur - 1)}
          aria-label="Prev"
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => go(cur + 1)}
          aria-label="Next"
          style={{
            position: "absolute",
            right: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            cursor: "pointer",
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Thumbnail filmstrip */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          padding: "1rem 1.25rem",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {photos.map((p, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            style={{
              flexShrink: 0,
              width: "80px",
              height: "56px",
              borderRadius: "8px",
              overflow: "hidden",
              padding: 0,
              cursor: "pointer",
              border: `2px solid ${i === cur ? "oklch(0.82 0.15 82)" : "transparent"}`,
              opacity: i === cur ? 1 : 0.45,
              transition: "all 0.22s",
              transform: i === cur ? "scale(1.06)" : "scale(1)",
              background: "none",
            }}
          >
            <img
              src={p.src}
              alt={p.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// Main Gallery Page
function GalleryPage() {
  const [layout, setLayout] = useState<Layout>("grid");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [albums, setAlbums] = useState<any[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<any | null>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAlbums().then(res => {
      setAlbums(res);
      // Auto-open album if ID is in URL
      const searchParams = new URLSearchParams(window.location.search);
      const albumIdParam = searchParams.get('album');
      if (albumIdParam) {
        const found = res.find((a: any) => a._id === albumIdParam);
        if (found) {
          handleAlbumClick(null, found);
        }
      }
    });
  }, []);

  const handleAlbumClick = async (e: React.MouseEvent | null, album: any) => {
    if (e) e.preventDefault();
    setLoading(true);
    setSelectedAlbum(album);
    try {
      const p = await getPhotosByAlbum({ data: album._id });
      setPhotos(p.map((img: any) => ({
        src: img.imageUrl,
        title: album.title,
        desc: img.caption || album.description,
        tag: "Gallery"
      })));
    } catch (err) {
      console.error("Failed to fetch photos", err);
    }
    setLoading(false);
  };

  const filtered = selectedAlbum ? photos : albums;

  // GSAP scroll animations for grid/list
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".gallery-card");
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            delay: (i % 4) * 0.07,
          },
        );
      });
    }, gridRef);
    return () => ctx.revert();
  }, [layout, filtered.length, selectedAlbum]);

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title={
          <>
            A year in <span className="italic text-[color:var(--gold)]">quiet frames.</span>
          </>
        }
        subtitle="Assemblies, sports days, science exhibitions, cultural evenings — a small window into the daily life of the school."
      />

      <section className="bg-[color:var(--background)]" style={{ padding: "4rem 0 5rem" }}>
        <div className="container-page">
          {/* Controls bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "2.5rem",
            }}
          >
            {/* Count & Back Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {selectedAlbum && (
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition bg-blue-50 px-3 py-1.5 rounded-full"
                >
                  <ChevronLeft size={16} /> Back to Albums
                </button>
              )}
              <div
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "oklch(0.55 0.03 260)",
                  letterSpacing: "0.04em",
                }}
              >
                Showing{" "}
                <span style={{ color: "oklch(0.22 0.08 262)", fontWeight: 700 }}>
                  {filtered.length}
                </span>{" "}
                {selectedAlbum ? "photos" : "albums"}
              </div>
            </div>

            {/* Layout toggle (only for photos) */}
            {selectedAlbum && (
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  background: "white",
                  borderRadius: "999px",
                  padding: "4px",
                  border: "1.5px solid oklch(0.42 0.15 260 / 0.10)",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}
              >
                {(
                  [
                    { id: "grid", icon: <LayoutGrid size={15} />, label: "Grid" },
                    { id: "list", icon: <List size={15} />, label: "List" },
                    { id: "slideshow", icon: <Play size={14} />, label: "Slideshow" },
                  ] as const
                ).map(({ id, icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setLayout(id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      border: "none",
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.22s ease",
                      background:
                        layout === id
                          ? "linear-gradient(135deg, oklch(0.42 0.15 260), oklch(0.32 0.14 260))"
                          : "transparent",
                      color: layout === id ? "white" : "oklch(0.55 0.03 260)",
                      boxShadow: layout === id ? "0 2px 10px oklch(0.42 0.15 260 / 0.25)" : "none",
                    }}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}

          {/* Views */}
          {!loading && (
            <AnimatePresence mode="wait">
              {!selectedAlbum && (
                <motion.div
                  key="albums-grid"
                  ref={gridRef}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
                >
                  {albums.map((album, i) => (
                    <button
                      key={i}
                      onClick={(e) => handleAlbumClick(e, album)}
                      className="gallery-card group text-left"
                      style={{
                        all: "unset",
                        cursor: "pointer",
                        display: "block",
                        borderRadius: "1.25rem",
                        overflow: "hidden",
                        position: "relative",
                        background: "white",
                        border: "1.5px solid rgba(0,0,0,0.07)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                        transition: "all 0.3s",
                      }}
                    >
                      <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                        {album.coverImageUrl ? (
                          <img
                            src={album.coverImageUrl}
                            alt={album.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <FolderOpen size={48} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-1">
                          <FolderOpen size={16} className="text-[color:var(--gold)]" />
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {new Date(album.date).getFullYear()}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold font-serif text-gray-900">{album.title}</h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{album.description}</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}

              {selectedAlbum && layout === "grid" && (
                <motion.div
                  key="grid"
                  ref={gridRef}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ columns: "2", gap: "1rem", columnFill: "balance" }}
                  className="sm:columns-3 lg:columns-4"
                >
                  {photos.map((photo, i) => (
                    <div key={i} style={{ breakInside: "avoid", marginBottom: "1rem" }}>
                      <GridCard photo={photo} idx={i} onClick={() => setLightbox(i)} />
                    </div>
                  ))}
                </motion.div>
              )}

              {selectedAlbum && layout === "list" && (
                <motion.div
                  key="list"
                  ref={gridRef}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: "white",
                    borderRadius: "1.5rem",
                    overflow: "hidden",
                    border: "1.5px solid oklch(0.42 0.15 260 / 0.09)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    padding: "0.5rem",
                  }}
                >
                  {photos.map((photo, i) => (
                    <div
                      key={i}
                      style={{
                        borderBottom:
                          i < photos.length - 1 ? "1px solid oklch(0.42 0.15 260 / 0.07)" : "none",
                      }}
                    >
                      <ListRow photo={photo} num={i + 1} onClick={() => setLightbox(i)} />
                    </div>
                  ))}
                </motion.div>
              )}

              {selectedAlbum && layout === "slideshow" && (
                <motion.div
                  key="slideshow"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                >
                  <SlideshowView photos={photos} onOpenLightbox={(i) => setLightbox(i)} />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && selectedAlbum && (
          <Lightbox photos={photos} startIdx={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Little Flower School, Salempur" },
      {
        name: "description",
        content:
          "Moments from campus life, events, sports and celebrations at Little Flower School, Salempur.",
      },
      { property: "og:title", content: "Gallery — Little Flower School, Salempur" },
      { property: "og:description", content: "Moments from campus life at LFS Salempur." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});
