import { motion } from "framer-motion";
import { SCHOOL } from "@/lib/lfs-data";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { CreditCard, ExternalLink } from "lucide-react";

export function FloatingActions() {
  return (
    <aside
      aria-label="Quick Actions"
      className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6 pointer-events-none"
    >
      {/* Pay Fee Online Floating Button */}
      <motion.a
        href={SCHOOL.feePayUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Pay School Fee Online"
        className="pointer-events-auto group relative flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--navy-deep)]/90 px-4 py-2.5 text-xs font-semibold text-white shadow-xl shadow-[color:var(--navy-deep)]/30 backdrop-blur-md transition-colors hover:border-[color:var(--gold)] hover:bg-[color:var(--navy-deep)] sm:text-sm"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--gold)]/20 text-[color:var(--gold)]">
          <CreditCard className="h-3.5 w-3.5" />
        </div>
        <span className="font-medium tracking-tight">Pay Fee Online</span>
        <ExternalLink className="h-3 w-3 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </motion.a>

      {/* WhatsApp Floating Button */}
      <motion.a
        href={SCHOOL.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat with Little Flower School on WhatsApp"
        className="pointer-events-auto group relative flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-white shadow-xl shadow-[#25D366]/35 transition-all hover:bg-[#20bd5a] sm:text-sm"
      >
        {/* Pulse ping ring */}
        <span className="absolute -inset-0.5 -z-10 rounded-full bg-[#25D366]/40 animate-ping opacity-60 pointer-events-none" />

        <WhatsAppIcon className="h-5 w-5" />
        <span className="font-semibold tracking-tight">WhatsApp</span>
      </motion.a>
    </aside>
  );
}
