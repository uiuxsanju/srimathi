import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Seo } from '@/components/Seo';

export function AdminLogin() {
  const login = useAuthStore((s) => s.login);
  const isAuthed = useAuthStore((s) => s.isAuthed);
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@luxefashion.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');

  if (isAuthed) return <Navigate to="/admin" replace />;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) navigate('/admin');
    else setError('Incorrect email or password.');
  };

  return (
    <>
      <Seo title="Admin Login" />
      <div className="grid min-h-screen place-items-center bg-champagne px-5">
        <div className="w-full max-w-sm rounded-3xl bg-white/70 p-8 shadow-soft">
          <div className="text-center">
            <p className="font-display text-2xl">Maison <span className="text-gold">Admin</span></p>
            <p className="mt-1 text-sm text-ink/55">Sign in to manage your store</p>
          </div>
          <form onSubmit={submit} className="mt-7 space-y-4">
            <div className="flex items-center rounded-xl border border-ink/15 bg-white px-3">
              <Mail size={16} className="text-ink/40" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full bg-transparent px-3 py-3 text-sm outline-none" />
            </div>
            <div className="flex items-center rounded-xl border border-ink/15 bg-white px-3">
              <Lock size={16} className="text-ink/40" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full bg-transparent px-3 py-3 text-sm outline-none" />
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <Button type="submit" className="w-full" size="lg">Sign in <ArrowRight size={16} /></Button>
          </form>
          <p className="mt-5 rounded-xl bg-cream px-4 py-3 text-center text-[11px] text-ink/50">Demo · admin@luxefashion.com / Admin@123</p>
        </div>
      </div>
    </>
  );
}
