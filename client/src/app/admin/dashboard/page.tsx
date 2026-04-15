'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getStats, getProjects, getMessages, getSkills, createProject, deleteProject, createSkill, deleteSkill, deleteMessage } from '@/lib/api';

type Tab = 'dashboard' | 'projects' | 'skills' | 'messages';

export default function Dashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState({ projects: 0, skills: 0, messages: 0, unreadMessages: 0 });
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', tags: '', github: '', live: '', featured: false });
  const [newSkill, setNewSkill] = useState({ name: '', level: 80, category: 'Frontend' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/admin'); return; }
    loadAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAll = async () => {
    try {
      const [s, p, m, sk] = await Promise.all([getStats(), getProjects(), getMessages(), getSkills()]);
      setStats(s); setProjects(p); setMessages(m); setSkills(sk);
    } catch { router.push('/admin'); }
  };

  const logout = () => { localStorage.removeItem('token'); router.push('/admin'); };

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProject({ ...newProject, tags: newProject.tags.split(',').map(t => t.trim()) });
    setNewProject({ title: '', description: '', tags: '', github: '', live: '', featured: false });
    loadAll();
  };

  const addSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    await createSkill(newSkill);
    setNewSkill({ name: '', level: 80, category: 'Frontend' });
    loadAll();
  };

  const tabs: Tab[] = ['dashboard', 'projects', 'skills', 'messages'];

  return (
    <div className="min-h-screen bg-bg">
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between">
        <span className="font-mono text-accent font-bold">&lt;KV /&gt;</span>
        <div className="flex items-center gap-6">
          <span className="font-mono text-xs text-muted hidden md:block">Admin Dashboard</span>
          <button onClick={logout} aria-label="Logout" className="font-mono text-xs border border-border px-3 py-1.5 text-muted hover:border-red-400 hover:text-red-400 transition-all rounded">
            ← Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} aria-label={`Switch to ${t} tab`}
              className={`px-4 py-2 font-mono text-xs tracking-widest capitalize rounded transition-all ${tab === t ? 'bg-accent text-bg font-bold' : 'border border-border text-muted hover:border-accent hover:text-accent'}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total Projects', value: stats.projects, color: 'from-accent to-cyan-400' },
              { label: 'Total Skills', value: stats.skills, color: 'from-accent2 to-purple-400' },
              { label: 'Total Messages', value: stats.messages, color: 'from-pink-500 to-rose-400' },
            ].map(s => (
              <div key={s.label} className={`bg-gradient-to-br ${s.color} p-px rounded`}>
                <div className="bg-card rounded p-6">
                  <p className="text-muted font-mono text-xs tracking-widest mb-2">{s.label}</p>
                  <p className="text-5xl font-display font-bold text-text">{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'projects' && (
          <div className="space-y-8">
            <form onSubmit={addProject} className="glow-border bg-card rounded p-6 space-y-4">
              <h3 className="font-mono text-accent text-sm tracking-widest">+ ADD PROJECT</h3>
              <div className="grid grid-cols-2 gap-4">
                <input value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})}
                  placeholder="Title" required className="col-span-2 bg-bg border border-border rounded px-4 py-2.5 text-sm text-text placeholder-muted focus:outline-none focus:border-accent" />
                <textarea value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})}
                  placeholder="Description" required rows={3} className="col-span-2 bg-bg border border-border rounded px-4 py-2.5 text-sm text-text placeholder-muted focus:outline-none focus:border-accent resize-none" />
                <input value={newProject.tags} onChange={e => setNewProject({...newProject, tags: e.target.value})}
                  placeholder="Tags (comma separated)" className="bg-bg border border-border rounded px-4 py-2.5 text-sm text-text placeholder-muted focus:outline-none focus:border-accent" />
                <input value={newProject.github} onChange={e => setNewProject({...newProject, github: e.target.value})}
                  placeholder="GitHub URL" className="bg-bg border border-border rounded px-4 py-2.5 text-sm text-text placeholder-muted focus:outline-none focus:border-accent" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={newProject.featured} onChange={e => setNewProject({...newProject, featured: e.target.checked})}
                  className="accent-accent w-4 h-4" />
                <span className="font-mono text-xs text-muted">Mark as Featured</span>
              </label>
              <button type="submit" className="px-6 py-2 bg-accent text-bg font-mono text-sm font-bold rounded hover:bg-accent/90">Add Project</button>
            </form>

            <div className="space-y-3">
              {projects.map(p => (
                <div key={p._id} className="glow-border bg-card rounded p-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-text">{p.title}</p>
                      {p.featured && <span className="font-mono text-xs text-accent border border-accent/30 px-1.5 py-0.5 rounded">FEATURED</span>}
                    </div>
                    <p className="text-muted text-xs font-mono mt-1">{p.tags?.join(', ')}</p>
                  </div>
                  <button onClick={async () => { await deleteProject(p._id); loadAll(); }}
                    aria-label={`Delete project ${p.title}`}
                    className="text-red-400 hover:text-red-300 font-mono text-xs border border-red-400/20 hover:border-red-400 px-3 py-1 rounded transition-all">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'skills' && (
          <div className="space-y-8">
            <form onSubmit={addSkill} className="glow-border bg-card rounded p-6 space-y-4">
              <h3 className="font-mono text-accent text-sm tracking-widest">+ ADD SKILL</h3>
              <div className="grid grid-cols-3 gap-4">
                <input value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})}
                  placeholder="Skill Name" required className="bg-bg border border-border rounded px-4 py-2.5 text-sm text-text placeholder-muted focus:outline-none focus:border-accent" />
                <input type="number" value={newSkill.level} onChange={e => setNewSkill({...newSkill, level: +e.target.value})}
                  min="1" max="100" aria-label="Skill level percentage"
                  className="bg-bg border border-border rounded px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent" />
                <select value={newSkill.category} onChange={e => setNewSkill({...newSkill, category: e.target.value})}
                  aria-label="Skill category"
                  className="bg-bg border border-border rounded px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent">
                  {['Frontend', 'Backend', 'Mobile', 'Database', 'Tools'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <button type="submit" className="px-6 py-2 bg-accent text-bg font-mono text-sm font-bold rounded hover:bg-accent/90">Add Skill</button>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skills.map(s => (
                <div key={s._id} className="glow-border bg-card rounded p-4 flex items-center justify-between">
                  <div>
                    <p className="font-mono text-sm text-text">{s.name}</p>
                    <p className="font-mono text-xs text-accent">{s.level}% · {s.category}</p>
                  </div>
                  <button onClick={async () => { await deleteSkill(s._id); loadAll(); }}
                    aria-label={`Delete skill ${s.name}`}
                    className="text-red-400 hover:text-red-300 font-mono text-xs ml-2">✕</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'messages' && (
          <div className="space-y-3">
            {messages.length === 0 && <p className="text-muted font-mono text-sm text-center py-12">No messages yet.</p>}
            {messages.map(m => (
              <div key={m._id} className={`glow-border bg-card rounded p-5 ${!m.read ? 'border-accent/30' : ''}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-medium text-text">{m.subject}</p>
                      {!m.read && <span className="text-xs font-mono bg-accent/20 text-accent px-2 py-0.5 rounded">NEW</span>}
                    </div>
                    <p className="text-muted text-xs font-mono">From: {m.name} ({m.email})</p>
                    <p className="text-text-dim text-sm mt-2">{m.message}</p>
                    <p className="text-muted text-xs font-mono mt-2">{new Date(m.createdAt).toLocaleDateString()}</p>
                  </div>
                  <button onClick={async () => { await deleteMessage(m._id); loadAll(); }}
                    aria-label={`Delete message from ${m.name}`}
                    className="text-red-400 hover:text-red-300 font-mono text-xs border border-red-400/20 hover:border-red-400 px-3 py-1 rounded transition-all shrink-0">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
