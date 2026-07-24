import { useEffect, useState } from "react";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out after 1.8s, then unmount after 2.4s
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800);
    const hideTimer = setTimeout(() => setVisible(false), 2500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-label="Loading Little Flower School"
      aria-live="polite"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "oklch(0.28 0.12 262)",
        transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1)",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      {/* Radial glow behind logo */}
      <div
        style={{
          position: "absolute",
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          background: "radial-gradient(circle, oklch(0.82 0.15 82 / 0.18) 0%, transparent 70%)",
          animation: "lfs-glow-expand 1.8s ease-out forwards",
        }}
      />

      {/* Logo container */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          animation: "lfs-rise 0.9s cubic-bezier(0.22,1,0.36,1) forwards",
          opacity: 0,
        }}
      >
        {/* Logo with ring */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Spinning gold ring */}
          <div
            style={{
              position: "absolute",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: "2px solid transparent",
              borderTopColor: "oklch(0.82 0.15 82)",
              borderRightColor: "oklch(0.82 0.15 82 / 0.4)",
              animation: "lfs-spin 1.2s linear infinite",
            }}
          />
          {/* Outer subtle ring */}
          <div
            style={{
              position: "absolute",
              width: "136px",
              height: "136px",
              borderRadius: "50%",
              border: "1px solid oklch(0.82 0.15 82 / 0.15)",
            }}
          />
          {/* Logo image */}
          <img
            src="/lfs-logo.png"
            alt="Little Flower School Logo"
            style={{
              width: "88px",
              height: "88px",
              objectFit: "contain",
              borderRadius: "50%",
              background: "white",
              padding: "6px",
              boxShadow: "0 0 0 2px oklch(0.82 0.15 82 / 0.3), 0 8px 32px oklch(0 0 0 / 0.4)",
              animation: "lfs-logo-pulse 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* School name */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "1.35rem",
              fontWeight: 500,
              color: "oklch(0.98 0.005 85)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Little Flower School
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "oklch(0.82 0.15 82)",
              margin: "0.35rem 0 0",
            }}
          >
            Salempur
          </p>
        </div>

        {/* Loading dots */}
        <div style={{ display: "flex", gap: "6px", marginTop: "0.25rem" }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "oklch(0.82 0.15 82)",
                display: "inline-block",
                animation: `lfs-dot-bounce 1.2s ease-in-out ${i * 0.18}s infinite`,
                opacity: 0.85,
              }}
            />
          ))}
        </div>
      </div>

      {/* Vivekananda Quote */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "440px",
          animation: "lfs-rise 1.2s cubic-bezier(0.22,1,0.36,1) 0.3s forwards",
          opacity: 0,
        }}
      >
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "0.88rem",
            fontWeight: 400,
            fontStyle: "italic",
            color: "oklch(0.88 0.01 85 / 0.75)",
            lineHeight: 1.6,
            margin: 0,
            letterSpacing: "0.01em",
          }}
        >
          "Arise, awake, and stop not till the goal is reached."
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "oklch(0.82 0.15 82 / 0.55)",
            margin: "0.5rem 0 0",
          }}
        >
          — Swami Vivekananda
        </p>
      </div>

      <style>{`
        @keyframes lfs-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes lfs-rise {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lfs-glow-expand {
          from { transform: scale(0.4); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes lfs-logo-pulse {
          0%, 100% { box-shadow: 0 0 0 2px oklch(0.82 0.15 82 / 0.3), 0 8px 32px oklch(0 0 0 / 0.4); }
          50%       { box-shadow: 0 0 0 6px oklch(0.82 0.15 82 / 0.15), 0 8px 32px oklch(0 0 0 / 0.4); }
        }
        @keyframes lfs-dot-bounce {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.5; }
          40%           { transform: translateY(-8px); opacity: 1;   }
        }
      `}</style>
    </div>
  );
}
