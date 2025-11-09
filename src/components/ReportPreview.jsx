import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gauge, Shield, Eye, Rocket } from 'lucide-react';

export default function ReportPreview() {
  const [scores, setScores] = useState({ seo: 0, performance: 0, security: 0, design: 0 });

  useEffect(() => {
    const target = { seo: 82, performance: 74, security: 92, design: 88 };
    const duration = 1200; // ms
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setScores({
        seo: Math.round(target.seo * p),
        performance: Math.round(target.performance * p),
        security: Math.round(target.security * p),
        design: Math.round(target.design * p),
      });
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  const items = [
    { label: 'SEO', value: scores.seo, icon: Eye },
    { label: 'Performance', value: scores.performance, icon: Gauge },
    { label: 'Security', value: scores.security, icon: Shield },
    { label: 'Design', value: scores.design, icon: Rocket },
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-black via-[#05070f] to-black py-20 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_300px_at_50%_0%,rgba(0,198,255,0.2),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-wide md:text-3xl">Your AI Audit Preview</h2>
          <button className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-0" />
            Fix My Site
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map(({ label, value, icon: Icon }) => (
            <motion.div
              key={label}
              whileHover={{ rotateX: 5, rotateY: -5, translateZ: 10 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xl"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(200px_120px_at_50%_0%,rgba(0,114,255,0.2),transparent)]" />
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Icon className="h-5 w-5 text-cyan-300" />
              </div>
              <div className="text-3xl font-bold">{value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-white/60">{label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_200px_at_20%_20%,rgba(0,198,255,0.15),transparent)]" />
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-medium">Visual Insights</h3>
              <span className="text-xs text-white/60">Live Preview</span>
            </div>
            <div className="relative h-64 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
              <div className="relative grid h-full grid-cols-3 gap-2 p-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="rounded-lg border border-cyan-400/40 bg-cyan-300/10 p-2 text-center text-[10px] text-cyan-200">
                    Weak spot #{i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_200px_at_80%_20%,rgba(0,114,255,0.18),transparent)]" />
            <h3 className="text-lg font-medium">How We’ll Transform Your Site</h3>
            <div className="mt-4 space-y-3">
              {["Clarify above-the-fold message", "Optimize image loading & caching", "Rewire navigation for flow", "Refactor CTA hierarchy"].map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-white/10 to-transparent p-3"
                >
                  <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#0072FF] to-[#00C6FF]" />
                  <div className="pl-3 text-sm text-white/80">{s}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
