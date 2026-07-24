import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "@tanstack/react-router";
import { Reveal, SectionEyebrow } from "@/components/site/reveal";
import { FolderOpen } from "lucide-react";
import { getAlbums } from "@/api/functions";
import { GALLERY } from "@/lib/lfs-data";

const STATIC_ALBUMS = GALLERY.map((url, i) => ({
  _id: `static-${i}`,
  title: `School Moments ${i + 1}`,
  description: "Glimpses of life at Little Flower School.",
  coverImageUrl: url,
}));

export function GalleryStrip() {
  const [albums, setAlbums] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAlbums().then(res => {
      if (res && res.length > 0) {
        setAlbums(res);
      } else {
        setAlbums(STATIC_ALBUMS);
      }
    }).catch(() => {
      setAlbums(STATIC_ALBUMS);
    });
  }, []);

  const handleAlbumClick = (album: any) => {
    navigate({ to: `/gallery`, search: { album: album._id } });
  };

  const displayItems = albums.length > 0 ? albums : [];

  return (
    <section className="screen-fit-section bg-[color:var(--background)]">
      <div className="container-page">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionEyebrow>Life at LFS</SectionEyebrow>
            <Reveal
              as="h2"
              className="text-display text-[clamp(2.2rem,5vw,3.75rem)] text-[color:var(--ink)]"
            >
              A year in <span className="italic text-[color:var(--navy)]">moments.</span>
            </Reveal>
          </div>
          <Link to="/gallery" className="text-sm font-semibold text-[color:var(--navy)] story-link">
            Open full gallery →
          </Link>
        </div>

        {/* Perfectly Aligned Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {displayItems.slice(0, 8).map((album, i) => {
            return (
              <motion.figure
                key={album._id || i}
                initial={{ opacity: 0, scale: 0.94, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => handleAlbumClick(album)}
                className="group relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-slate-50 shadow-[var(--shadow-soft)] cursor-pointer aspect-[4/3]"
              >
                {/* Image Element */}
                {album.coverImageUrl ? (
                  <motion.img
                    src={album.coverImageUrl}
                    alt={album.title || "Little Flower School Moment"}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-300 transition-transform duration-[1200ms] ease-out group-hover:scale-105">
                     <FolderOpen size={48} />
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/90 via-[color:var(--navy-deep)]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Hover details (Slide-up card) */}
                <div className="absolute inset-x-0 bottom-0 p-6 text-white translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--gold)]/20 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[color:var(--gold)]">
                    <FolderOpen size={10} /> Album
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold leading-tight">
                    {album.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/70 line-clamp-2">{album.description}</p>
                </div>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
