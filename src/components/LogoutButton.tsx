'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function LogoutButton() {
  const router = useRouter();
  const { t } = useLanguage();

  const handleLogout = () => {
    localStorage.removeItem('token');

    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-400"
    >
      {t.logout}
    </button>
  );
}