import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Reveal, SectionEyebrow } from "@/components/site/reveal";
import { getManagement } from "@/api/functions";
import sabuImg from "@/assets/Rev. Fr. Sabu Varkey CST.jpg";
import johnImg from "@/assets/Rev. Fr. John Joseph CST.jpg";
import benoyImg from "@/assets/Fr. Benoy Mathew CST.png";

const FALLBACK_MANAGEMENT: Record<string, string> = {
  "Rev. Fr. Sabu Varkey CST": sabuImg,
  "Rev. Fr. John Joseph CST": johnImg,
  "Fr. Benoy Mathew CST": benoyImg,
  "Fr. Jubish Thomas CST": "https://res.cloudinary.com/dulns8qug/image/upload/v1741775455/LFS/Management_images/qdfo3prndmmcezmdgdkb.jpg"
};

const STATIC_MEMBERS = [
  {
    name: "Rev. Fr. Sabu Varkey CST",
    role: "President",
    details: "Little Flower Mission Education Society, Gorakhpur",
    image: sabuImg,
  },
  {
    name: "Rev. Fr. John Joseph CST",
    role: "Secretary",
    details: "Little Flower Mission Education Society, Gorakhpur",
    image: johnImg,
  },
  {
    name: "Fr. Benoy Mathew CST",
    role: "Manager",
    details: "Little Flower School, Salempur",
    image: benoyImg,
  },
  {
    name: "Fr. Jubish Thomas CST",
    role: "Principal",
    details: "Little Flower School, Salempur",
    image:
      "https://res.cloudinary.com/dulns8qug/image/upload/v1741775455/LFS/Management_images/qdfo3prndmmcezmdgdkb.jpg",
  },
];

export function Management() {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    getManagement().then(res => {
      if (res && res.length > 0) {
        const mapped = res.map((m) => ({
          ...m,
          details: m.details || m.message || '',
          image: m.imageUrl || FALLBACK_MANAGEMENT[m.name] || sabuImg,
        }));
        setMembers(mapped);
      } else {
        setMembers(STATIC_MEMBERS);
      }
    }).catch(() => {
      setMembers(STATIC_MEMBERS);
    });
  }, []);

  return (
    <section className="screen-fit-section bg-[color:var(--section)] overflow-hidden">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <SectionEyebrow>Leadership</SectionEyebrow>
          <Reveal
            as="h2"
            className="text-display text-[clamp(2.2rem,5vw,3.75rem)] text-[color:var(--ink)]"
          >
            Our <span className="italic text-[color:var(--navy)]">Management</span>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m, i) => (
            <motion.div
              key={m.name || i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-white p-4 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              {/* Image Frame with Floating and Scale Animations */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-50">
                <motion.img
                  src={m.imageUrl || m.image}
                  alt={m.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Floating particle design inside image card */}
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* Text details */}
              <div className="mt-4 px-1 text-center">
                <div className="inline-block rounded-full bg-[color:var(--gold)]/20 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[color:var(--navy)]">
                  {m.role}
                </div>
                <h3 className="mt-2.5 font-display text-lg font-semibold leading-tight text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--navy)]">
                  {m.name}
                </h3>
                <p className="mt-1 text-[11px] leading-relaxed text-[color:var(--ink-muted)]">
                  {m.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
