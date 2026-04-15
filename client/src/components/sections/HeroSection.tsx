export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(#00d4ff 1px, transparent 1px), linear-gradient(90deg, #00d4ff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent2/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="font-mono text-accent text-sm tracking-[0.3em] mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          HELLO, I AM
        </p>
        <h1 className="font-display text-6xl md:text-8xl font-bold mb-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <span className="gradient-text">Krunal Valvi</span>
        </h1>
        <p className="text-text-dim text-lg md:text-xl font-mono mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          Backend + Full Stack Developer
        </p>
        <p className="text-muted max-w-xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          Turning ideas into working products. Currently building <span className="text-accent">AlphaMetrics</span> — an Indian paper trading platform.
        </p>
        <div className="flex gap-4 justify-center opacity-0 animate-fade-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <a href="#projects" className="px-8 py-3 bg-accent text-bg font-mono text-sm font-bold rounded-sm hover:bg-accent/90 transition-colors animate-pulse-glow">
            View Projects
          </a>
          <a href="#contact" className="px-8 py-3 border border-border font-mono text-sm hover:border-accent hover:text-accent transition-all rounded-sm">
            Contact Me
          </a>
        </div>

        <div className="flex gap-6 justify-center mt-12 opacity-0 animate-fade-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          <a href="https://github.com/krunalvalvi" target="_blank" rel="noreferrer"
            aria-label="GitHub profile"
            className="text-muted hover:text-accent transition-colors font-mono text-xs tracking-widest">
            GitHub ↗
          </a>
          <span className="text-border">|</span>
          <span className="text-muted font-mono text-xs tracking-widest">📍 Gujarat, India</span>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent mx-auto" />
      </div>
    </section>
  );
}
