'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
  const { locale, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="rounded-full border border-white/15 bg-slate-900/90 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
    >
      {locale === 'en' ? 'Español' : 'English'}
    </button>
  );
}
