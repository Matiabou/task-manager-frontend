'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { useLanguage } from '@/context/LanguageContext';

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      await api.post('/auth/register', {
        email,
        password,
      });

      router.push('/login');
    } catch (error: any) {
      setError(error.response?.data?.message || t.registerErrorDefault);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 text-slate-100">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-slate-950/90" />
      <form
        onSubmit={handleRegister}
        className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-[0_28px_60px_rgba(15,23,42,0.55)] backdrop-blur-xl"
      >
        <div className="mb-6 space-y-3">
          <h1 className="text-3xl font-semibold text-white">{t.registerPageTitle}</h1>
        </div>

        {error && (
          <p className="mt-4 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-4">
          <input
            type="email"
            placeholder={t.emailPlaceholder}
            className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-500/30"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder={t.passwordPlaceholder}
            className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-500/30"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="inline-flex items-center gap-3">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                {t.loginLoading}
              </span>
            ) : (
              t.register
            )}
          </button>
        </div>

        {loading && (
          <p className="mt-4 text-sm text-slate-300">
            {t.loadingMessage}
          </p>
        )}

        <div className="mt-6 text-center text-sm text-slate-400">
          {t.haveAccount}{' '}
          <Link href="/login" className="font-semibold text-white hover:text-emerald-300">
            {t.loginAction}
          </Link>
        </div>
      </form>
      <div className="mt-6 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
        >
          {t.backHome}
        </Link>
      </div>
    </div>
  );
}
