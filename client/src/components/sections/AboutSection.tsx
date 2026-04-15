const stats = [
  { label: 'Projects Shipped', value: '4+' },
  { label: 'Tech Stack', value: '12+' },
  { label: 'Goal: Prod Apps by 2026', value: '3' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-accent text-xs tracking-[0.3em] mb-3">01. ABOUT</p>
          <h2 className="text-4xl font-display font-bold">Who I Am</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-text-dim leading-relaxed text-lg">
              I&apos;m a <span className="text-text font-medium">Backend &amp; Full Stack Developer</span> from Gujarat, India — focused on building real-world products, not just completing tutorials.
            </p>
            <p className="text-text-dim leading-relaxed">
              Currently in my second year at <span className="text-accent">Marwadi University</span> (B.Tech Computer Engineering, 2028), I spend my time outside class shipping actual products and learning system design.
            </p>
            <p className="text-text-dim leading-relaxed">
              My current focus: <span className="text-text">AlphaMetrics</span> — an Indian paper trading platform. I&apos;m also actively exploring AI/ML integration and FastAPI patterns.
            </p>
            <div className="pt-4 space-y-2">
              <p className="text-text-dim text-sm font-mono">🎯 Open to: <span className="text-accent">Freelance &amp; Collaborations</span></p>
              <p className="text-text-dim text-sm font-mono">📚 Learning: <span className="text-text">AI/ML, System Design, FastAPI</span></p>
            </div>
          </div>

          <div className="space-y-4">
            {stats.map((s) => (
              <div key={s.label} className="glow-border bg-card rounded p-6 flex items-center justify-between">
                <span className="text-text-dim font-mono text-sm">{s.label}</span>
                <span className="text-3xl font-display font-bold gradient-text">{s.value}</span>
              </div>
            ))}
            <div className="glow-border bg-card rounded p-6">
              <p className="font-mono text-xs text-muted mb-3 tracking-widest">EDUCATION</p>
              <div className="space-y-3">
                <div>
                  <p className="text-text font-medium">Marwadi University</p>
                  <p className="text-text-dim text-sm">B.Tech Computer Engineering · 2024–2028</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
