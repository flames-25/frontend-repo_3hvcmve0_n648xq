import { motion, useScroll, useTransform } from 'framer-motion';
import { Fragment, useRef } from 'react';

const sections = [
  {
    title: 'You built your site. But something feels off.',
    desc: 'Glitchy layouts, confusing flows, and missed opportunities.',
    bg: 'from-cyan-500/10 to-purple-500/10',
  },
  {
    title: 'We fix what others can’t see.',
    desc: 'Signal over noise — AI surfaces the silent killers of conversion.',
    bg: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    title: 'From chaos to clarity — modern design meets performance.',
    desc: 'A focused, cinematic blueprint that turns browsers into buyers.',
    bg: 'from-purple-500/10 to-blue-500/10',
  },
];

export default function StoryScroll() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const glow = useTransform(scrollYProgress, [0, 1], [0.1, 0.35]);

  return (
    <section ref={ref} className="relative w-full bg-gradient-to-b from-black via-[#070b16] to-black py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ opacity: glow }}
          className="absolute inset-0 bg-[radial-gradient(600px_200px_at_50%_20%,rgba(0,198,255,0.25),transparent)]"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {sections.map((s, i) => (
          <Fragment key={i}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.05 * i }}
              className="relative mb-16 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl"
            >
              <div className={`pointer-events-none absolute -inset-px bg-gradient-to-r ${s.bg} opacity-40 blur-2xl`} />

              <div className="relative">
                <h3 className="text-2xl font-semibold tracking-wide md:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-2xl text-white/70">{s.desc}</p>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 1.2 }}
                  className="mt-8 h-48 w-full rounded-2xl bg-gradient-to-br from-white/10 to-white/0 ring-1 ring-inset ring-white/10"
                >
                  <div className="h-full w-full animate-pulse bg-[linear-gradient(110deg,rgba(255,255,255,0.05),rgba(255,255,255,0.12),rgba(255,255,255,0.05))] bg-[length:200%_100%]" />
                </motion.div>
              </div>
            </motion.div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
