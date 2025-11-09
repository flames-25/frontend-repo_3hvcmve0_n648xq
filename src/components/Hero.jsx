import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import Spline from '@splinetool/react-spline';

function MagneticButton({ children, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.4);
    y.set(dy * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y, rotateX, rotateY }}
      className="relative group inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium text-white transition-transform will-change-transform"
    >
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#0072FF] to-[#00C6FF] opacity-90 blur-[2px]" />
      <span className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.span>
      </span>
    </motion.button>
  );
}

export default function Hero({ onStartAudit }) {
  const [url, setUrl] = useState('https://');
  const [typing, setTyping] = useState(true);
  const caretRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setTyping((v) => !v), 600);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url || url.length < 8) return;
    onStartAudit(url);
  };

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0b1020] via-[#05070f] to-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_600px_at_20%_10%,rgba(0,198,255,0.15),transparent),radial-gradient(800px_500px_at_80%_30%,rgba(0,114,255,0.15),transparent),radial-gradient(1000px_600px_at_50%_90%,rgba(120,120,255,0.12),transparent)]" />

      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur"
        >
          <Zap className="h-4 w-4 text-cyan-300" />
          <span className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">AI Website Intelligence</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.8 }}
          className="text-center text-4xl font-semibold leading-tight tracking-wide text-white md:text-6xl"
        >
          WhyMySiteSuck — Find Out What’s Holding Your Website Back
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mt-4 max-w-2xl text-center text-base text-white/70 md:text-lg"
        >
          Run a free AI audit and see exactly what’s slowing your growth.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="relative mt-8 flex w-full max-w-2xl items-center gap-3"
        >
          <div className="relative w-full">
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#0072FF] to-[#00C6FF] opacity-60 blur-[6px]" />
            <div className="relative flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <input
                aria-label="Website URL"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yoursite.com"
                className="peer w-full bg-transparent text-white placeholder-white/40 outline-none"
              />
              <span
                ref={caretRef}
                className={`ml-1 h-5 w-[2px] self-stretch bg-cyan-300 ${typing ? 'opacity-100' : 'opacity-0'} transition-opacity`}
              />
            </div>
          </div>

          <MagneticButton onClick={handleSubmit}>
            Audit My Website
          </MagneticButton>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="mt-6 text-center text-sm text-white/60"
        >
          Instant preview. No credit card.
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/70 to-transparent" />
    </section>
  );
}
