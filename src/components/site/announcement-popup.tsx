import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Sparkles, Bell } from "lucide-react";
import { getActivePopup } from "../../api/functions";
import { Link } from "@tanstack/react-router";

export function AnnouncementPopup() {
  const [popup, setPopup] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session or dismissed today
    const sessionDismissed = sessionStorage.getItem("lfs_popup_session_dismissed");
    const dismissedUntil = localStorage.getItem("lfs_popup_dismissed_until");

    if (dismissedUntil && Number(dismissedUntil) > Date.now()) {
      return;
    }

    if (sessionDismissed) {
      return;
    }

    // Fetch active popup from database
    getActivePopup()
      .then((data) => {
        if (data && data.isActive && data.imageUrl) {
          // Check if this specific popup ID was dismissed today
          const dismissedPopupId = localStorage.getItem(`lfs_popup_dismissed_${data._id}`);
          if (dismissedPopupId && Number(dismissedPopupId) > Date.now()) {
            return;
          }

          setPopup(data);
          // Slight delay so the initial page render is smooth before popup pops in
          const timer = setTimeout(() => {
            setIsOpen(true);
          }, 600);
          return () => clearTimeout(timer);
        }
      })
      .catch((err) => {
        console.error("Failed to load active popup:", err);
      });
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("lfs_popup_session_dismissed", "true");

    if (dontShowToday && popup?._id) {
      // 24 hours expiry
      const expireTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(`lfs_popup_dismissed_${popup._id}`, String(expireTime));
      localStorage.setItem("lfs_popup_dismissed_until", String(expireTime));
    }
  };

  if (!popup || !isOpen) return null;

  const hasLink = Boolean(popup.linkUrl && popup.linkUrl.trim().length > 0);
  const isInternalLink = hasLink && popup.linkUrl.startsWith("/");
  const shouldShowText = popup.showText !== false && Boolean(popup.title || popup.description);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop with Ambient Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative w-full max-w-xl md:max-w-2xl bg-white rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] overflow-hidden border border-white/20 z-10 my-auto ring-1 ring-black/10 flex flex-col"
          >
            {/* Top Floating Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close popup"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95 border border-white/20"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {/* Poster / Notice Image (Edge to edge with high clarity) */}
            <div className="relative w-full bg-slate-900 overflow-hidden group">
              {hasLink ? (
                isInternalLink ? (
                  <Link to={popup.linkUrl} onClick={handleClose} className="block cursor-pointer">
                    <img
                      src={popup.imageUrl}
                      alt={popup.title || "Announcement"}
                      className="w-full h-auto max-h-[65vh] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </Link>
                ) : (
                  <a href={popup.linkUrl} target="_blank" rel="noreferrer" onClick={handleClose} className="block cursor-pointer">
                    <img
                      src={popup.imageUrl}
                      alt={popup.title || "Announcement"}
                      className="w-full h-auto max-h-[65vh] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </a>
                )
              ) : (
                <img
                  src={popup.imageUrl}
                  alt={popup.title || "Announcement"}
                  className="w-full h-auto max-h-[65vh] object-contain mx-auto"
                />
              )}
            </div>

            {/* Title & Description Section (Shown when showText is enabled) */}
            {shouldShowText && (
              <div className="px-5 sm:px-6 py-4 bg-gradient-to-b from-white to-slate-50/50 border-t border-slate-100">
                {popup.title && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[11px] font-bold uppercase tracking-wider">
                      <Sparkles size={12} className="text-blue-600" /> Announcement
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 font-display">
                      {popup.title}
                    </h4>
                  </div>
                )}
                {popup.description && (
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1">
                    {popup.description}
                  </p>
                )}
              </div>
            )}

            {/* Bottom Bar Controls */}
            <div className="px-5 sm:px-6 py-3.5 bg-gray-50/90 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              {/* Don't show again today */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none group text-xs text-gray-600 hover:text-gray-900 transition-colors">
                <input
                  type="checkbox"
                  checked={dontShowToday}
                  onChange={(e) => setDontShowToday(e.target.checked)}
                  className="w-4 h-4 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors cursor-pointer"
                />
                <span className="font-medium text-[12px] group-hover:text-gray-900">Don't show again today</span>
              </label>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 ml-auto">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-200/70 transition-colors"
                >
                  Dismiss
                </button>

                {hasLink && (
                  isInternalLink ? (
                    <Link
                      to={popup.linkUrl}
                      onClick={handleClose}
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white shadow-md shadow-blue-900/20 hover:shadow-lg transition-all active:scale-95"
                    >
                      {popup.linkText || "View Details"}
                      <ExternalLink size={13} strokeWidth={2.5} />
                    </Link>
                  ) : (
                    <a
                      href={popup.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={handleClose}
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white shadow-md shadow-blue-900/20 hover:shadow-lg transition-all active:scale-95"
                    >
                      {popup.linkText || "View Details"}
                      <ExternalLink size={13} strokeWidth={2.5} />
                    </a>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

