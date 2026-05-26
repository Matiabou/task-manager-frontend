'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16 sm:px-8">
        <div className="w-full rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl ring-1 ring-white/10">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-300">
              {t.homeCallout}
            </span>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              {t.homeTitle}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              <a
                href={t.homeDescription}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-300 hover:text-emerald-200 transition"
              >
                {t.viewGitHub}
              </a>
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                {t.login}
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-slate-900/70 px-8 py-3 text-base font-semibold text-white transition hover:border-white/40 hover:bg-slate-900"
              >
                {t.createAccount}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
