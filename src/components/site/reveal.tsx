import { motion, type MotionProps, type Variants } from "framer-motion";
import type { ReactNode, ElementType } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Reveal({
  as: As = "div",
  delay = 0,
  children,
  className,
  ...rest
}: {
  as?: ElementType;
  delay?: number;
  children: ReactNode;
  className?: string;
} & MotionProps) {
  const Comp = motion.create(As);
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.15, margin: "-5%" }}
      variants={variants}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function RevealText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em]">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "115%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: false, amount: 0.4, margin: "-5%" }}
            transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-3">
      <span className="h-px w-8 bg-[color:var(--gold)]" />
      <span className="text-eyebrow text-[color:var(--navy)]">{children}</span>
    </div>
  );
}
