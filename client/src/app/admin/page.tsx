'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      router.push('/admin/dashboard');
    } catch { setError('Invalid credentials. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-card border border-accent/30 rounded flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="font-display text-3xl font-bold gradient-text">Admin Login</h1>
          <p className="text-muted font-mono text-sm mt-2">Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="glow-border bg-card rounded p-8 space-y-4">
          {error && <p className="text-red-400 font-mono text-sm bg-red-400/10 px-4 py-2 rounded">{error}</p>}
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" required
            id="admin-email"
            className="w-full bg-bg border border-border rounded px-4 py-3 text-sm text-text placeholder-muted focus:outline-none focus:border-accent transition-colors" />
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required
            id="admin-password"
            className="w-full bg-bg border border-border rounded px-4 py-3 text-sm text-text placeholder-muted focus:outline-none focus:border-accent transition-colors" />
          <button type="submit" disabled={loading} id="admin-login-btn"
            aria-label="Sign in to admin dashboard"
            className="w-full py-3 bg-accent text-bg font-mono text-sm font-bold rounded hover:bg-accent/90 transition-colors disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
