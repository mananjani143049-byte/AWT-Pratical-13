'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const links = ['About', 'Skills', 'Projects', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-bg/90 backdrop-blur border-b border-border' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-mono text-accent font-bold text-lg tracking-widest">&lt;KV /&gt;</Link>
        
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="text-text-dim hover:text-accent text-sm font-mono tracking-wider transition-colors">
              {l}
            </a>
          ))}
          <Link href="/admin" className="text-xs font-mono px-3 py-1.5 border border-border text-muted hover:border-accent hover:text-accent transition-all rounded">
            Admin
          </Link>
        </div>

        <button
          className="md:hidden text-accent"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-current transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-surface border-b border-border px-6 py-4 space-y-4">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
              className="block text-text-dim hover:text-accent font-mono text-sm">
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
