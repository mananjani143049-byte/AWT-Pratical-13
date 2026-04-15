'use client';
import { useEffect, useState } from 'react';
import { getSkills } from '@/lib/api';

interface Skill { _id: string; name: string; level: number; category: string; }

const fallbackSkills: Skill[] = [
  { _id: 'skill-1', name: 'JavaScript', level: 86, category: 'Languages' },
  { _id: 'skill-2', name: 'TypeScript', level: 84, category: 'Languages' },
  { _id: 'skill-3', name: 'Python', level: 82, category: 'Languages' },
  { _id: 'skill-4', name: 'Java', level: 76, category: 'Languages' },
  { _id: 'skill-5', name: 'Kotlin', level: 74, category: 'Languages' },
  { _id: 'skill-6', name: 'HTML5', level: 92, category: 'Languages' },
  { _id: 'skill-7', name: 'CSS3', level: 90, category: 'Languages' },
  { _id: 'skill-8', name: 'React', level: 88, category: 'Frameworks & Libraries' },
  { _id: 'skill-9', name: 'FastAPI', level: 82, category: 'Frameworks & Libraries' },
  { _id: 'skill-10', name: 'Vite', level: 80, category: 'Frameworks & Libraries' },
  { _id: 'skill-11', name: 'Tailwind CSS', level: 90, category: 'Frameworks & Libraries' },
  { _id: 'skill-12', name: 'Android', level: 72, category: 'Frameworks & Libraries' },
  { _id: 'skill-13', name: 'Git', level: 90, category: 'Tools & Platforms' },
  { _id: 'skill-14', name: 'GitHub', level: 90, category: 'Tools & Platforms' },
  { _id: 'skill-15', name: 'VS Code', level: 93, category: 'Tools & Platforms' },
  { _id: 'skill-16', name: 'Postman', level: 87, category: 'Tools & Platforms' },
  { _id: 'skill-17', name: 'Vercel', level: 78, category: 'Tools & Platforms' },
];

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [active, setActive] = useState('All');

  useEffect(() => {
    getSkills()
      .then((data: Skill[]) => {
        setSkills(data.length > 0 ? data : fallbackSkills);
      })
      .catch(() => {
        setSkills(fallbackSkills);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))];
  const filtered = active === 'All' ? skills : skills.filter(s => s.category === active);

  return (
    <section id="skills" className="py-24 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-accent text-xs tracking-[0.3em] mb-3">02. SKILLS</p>
          <h2 className="text-4xl font-display font-bold">Tech Stack</h2>
        </div>

        <div className="flex gap-3 flex-wrap mb-10">
          {categories.map(c => (
            <button key={c} onClick={() => setActive(c)}
              aria-label={`Filter by ${c}`}
              className={`px-4 py-1.5 rounded font-mono text-xs tracking-wider transition-all ${active === c ? 'bg-accent text-bg font-bold' : 'border border-border text-muted hover:border-accent hover:text-accent'}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((s) => (
            <div key={s._id} className="glow-border bg-card rounded p-5 group">
              <div className="flex justify-between items-start mb-3">
                <span className="font-mono text-sm font-medium text-text">{s.name}</span>
                <span className="font-mono text-xs text-accent">{s.level}%</span>
              </div>
              <div className="h-1 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full transition-all duration-700"
                  style={{ width: `${s.level}%` }} />
              </div>
              <p className="font-mono text-xs text-muted mt-2">{s.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
