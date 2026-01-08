'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { LANGUAGES } from '../data/languages/registry';

export default function HomePage() {
  const { language, selectLanguage, isLoaded } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && language) {
      router.replace('/learn');
    }
  }, [isLoaded, language, router]);

  const handleSelect = (langId) => {
    selectLanguage(langId);
  };

  if (!isLoaded || language) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400">Loading...</div>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white">
      <h1 className="text-4xl font-bold mb-2">Spoken Patterns</h1>
      <p className="text-white/80 mb-12 text-center text-lg">Choose a language to start speaking.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {Object.values(LANGUAGES).map((lang) => (
          <button
            key={lang.id}
            onClick={() => handleSelect(lang.id)}
            className="bg-white/20 hover:bg-white/30 border border-white/40 p-8 rounded-2xl hover:scale-105 transition-all flex flex-col items-center gap-4 group shadow-xl"
          >
            <div className="w-32 h-32 group-hover:scale-110 transition-transform duration-300">
              <img src={lang.flag} alt={lang.name} className="w-full h-full object-contain drop-shadow-md" />
            </div>
            <span className="text-3xl font-bold text-white drop-shadow-sm">{lang.name}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
