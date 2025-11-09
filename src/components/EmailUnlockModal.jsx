import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EmailUnlockModal({ open, onClose, onUnlock }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-6 text-white backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute -inset-px bg-[conic-gradient(from_120deg,rgba(0,114,255,0.25),rgba(0,198,255,0.25),transparent)] opacity-40 blur-xl" />
            <div className="relative">
              <h3 className="text-xl font-semibold tracking-wide">Unlock Your Report</h3>
              <p className="mt-1 text-sm text-white/70">Enter your email to view the full AI breakdown.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const email = form.email.value;
                  if (!email) return;
                  onUnlock(email);
                }}
                className="mt-5 flex gap-2"
              >
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className="flex-1 rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white placeholder-white/40 outline-none"
                />
                <button className="rounded-xl bg-gradient-to-r from-[#0072FF] to-[#00C6FF] px-4 text-sm font-medium text-white">
                  View Report
                </button>
              </form>
              <button onClick={onClose} className="mt-3 text-xs text-white/50 underline-offset-2 hover:underline">
                Not now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
