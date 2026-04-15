'use client';
import { useState } from 'react';
import { sendMessage } from '@/lib/api';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await sendMessage(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch { setStatus('error'); }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-surface">
      <div className="max-w-2xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-accent text-xs tracking-[0.3em] mb-3">04. CONTACT</p>
          <h2 className="text-4xl font-display font-bold">Get In Touch</h2>
          <p className="text-text-dim mt-4">Have a project in mind or want to collaborate? Drop a message.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              placeholder="Your Name" required id="contact-name"
              className="bg-card border border-border rounded px-4 py-3 text-sm text-text placeholder-muted focus:outline-none focus:border-accent transition-colors" />
            <input value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              placeholder="Your Email" type="email" required id="contact-email"
              className="bg-card border border-border rounded px-4 py-3 text-sm text-text placeholder-muted focus:outline-none focus:border-accent transition-colors" />
          </div>
          <input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
            placeholder="Subject" required id="contact-subject"
            className="w-full bg-card border border-border rounded px-4 py-3 text-sm text-text placeholder-muted focus:outline-none focus:border-accent transition-colors" />
          <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
            placeholder="Your Message" required rows={5} id="contact-message"
            className="w-full bg-card border border-border rounded px-4 py-3 text-sm text-text placeholder-muted focus:outline-none focus:border-accent transition-colors resize-none" />

          <button type="submit" disabled={status === 'loading'} id="contact-submit"
            aria-label="Send message"
            className="w-full py-3 bg-accent text-bg font-mono text-sm font-bold rounded hover:bg-accent/90 transition-colors disabled:opacity-50">
            {status === 'loading' ? 'Sending...' : 'Send Message →'}
          </button>

          {status === 'success' && <p className="text-green-400 font-mono text-sm text-center">Message sent! I&apos;ll get back to you soon.</p>}
          {status === 'error' && <p className="text-red-400 font-mono text-sm text-center">Something went wrong. Try again.</p>}
        </form>
      </div>
    </section>
  );
}
