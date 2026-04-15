'use client';
import { useEffect, useState } from 'react';
import { getProjects } from '@/lib/api';

interface Project { _id: string; title: string; description: string; tags: string[]; github: string; live: string; featured: boolean; }

const fallbackProjects: Project[] = [
  {
    _id: 'fallback-1',
    title: 'AlphaMetrics',
    description: 'Indian paper trading platform focused on practical market simulation and trader-first experience.',
    tags: ['React', 'TypeScript', 'FastAPI', 'Fintech'],
    github: 'https://github.com/KrunalValvi/AlphaMetrics',
    live: '',
    featured: true,
  },
  {
    _id: 'fallback-2',
    title: 'StudyMaster',
    description: 'Modern study management app to track progress, plan sessions, and improve learning consistency.',
    tags: ['TypeScript', 'Vite', 'Tailwind CSS'],
    github: 'https://github.com/KrunalValvi/StudyMaster',
    live: '',
    featured: true,
  },
  {
    _id: 'fallback-3',
    title: 'Fastapi-Dev-Tools',
    description: 'FastAPI utility suite with practical tools including QR generation, markdown helpers, and regex testing.',
    tags: ['Python', 'FastAPI', 'Developer Tools'],
    github: 'https://github.com/KrunalValvi/Fastapi-Dev-Tools',
    live: '',
    featured: false,
  },
  {
    _id: 'fallback-4',
    title: 'Mindspark-Elearning-App',
    description: 'Android E-learning application built with Kotlin for structured learning experiences.',
    tags: ['Kotlin', 'Android', 'EdTech'],
    github: 'https://github.com/KrunalValvi/Mindspark-Elearning-App',
    live: '',
    featured: false,
  },
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects()
      .then((data: Project[]) => {
        setProjects(data.length > 0 ? data : fallbackProjects);
      })
      .catch(() => {
        setProjects(fallbackProjects);
      });
  }, []);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-accent text-xs tracking-[0.3em] mb-3">03. PROJECTS</p>
          <h2 className="text-4xl font-display font-bold">What I&apos;ve Built</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div key={p._id} className={`glow-border bg-card rounded p-6 flex flex-col justify-between ${p.featured ? 'md:col-span-2' : ''}`}>
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    {p.featured && <span className="font-mono text-xs text-accent border border-accent/30 px-2 py-0.5 rounded mb-2 inline-block">FEATURED</span>}
                    <h3 className="text-xl font-display font-bold text-text">{p.title}</h3>
                  </div>
                  <span className="font-mono text-muted text-xs">0{i+1}</span>
                </div>
                <p className="text-text-dim text-sm leading-relaxed mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map(t => (
                    <span key={t} className="font-mono text-xs px-2 py-1 bg-border/50 text-muted rounded">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 pt-4 border-t border-border">
                {p.github && <a href={p.github} target="_blank" rel="noreferrer" aria-label={`${p.title} GitHub`} className="font-mono text-xs text-muted hover:text-accent transition-colors">GitHub ↗</a>}
                {p.live && <a href={p.live} target="_blank" rel="noreferrer" aria-label={`${p.title} live demo`} className="font-mono text-xs text-accent hover:text-accent/80 transition-colors">Live Demo ↗</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
