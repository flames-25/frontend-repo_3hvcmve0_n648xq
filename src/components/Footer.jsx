import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full bg-black py-10 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_120px_at_80%_10%,rgba(0,114,255,0.25),transparent)]" />
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0072FF] to-[#00C6FF] shadow-[0_0_40px_rgba(0,198,255,0.4)]"
          >
            <Sparkles className="h-4 w-4 text-black" />
          </motion.div>
          <p className="text-sm text-white/70">Built by WhyMySiteSuck · Audit Smarter, Build Better.</p>
        </div>
        <div className="text-xs text-white/50">© {new Date().getFullYear()} WhyMySiteSuck</div>
      </div>
    </footer>
  );
}
