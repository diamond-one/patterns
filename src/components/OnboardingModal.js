'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function OnboardingModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { language } = useLanguage();

    useEffect(() => {
        if (!language) return; // Don't show if no language selected (e.g. on landing page)

        const storageKey = `patterns-visited-${language.id}`;
        const hasVisited = localStorage.getItem(storageKey);

        if (!hasVisited) {
            setIsOpen(true);
        }
    }, [language]);

    const handleStart = () => {
        if (!language) return;
        setIsOpen(false);
        const storageKey = `patterns-visited-${language.id}`;
        localStorage.setItem(storageKey, 'true');

        // Play a welcome sound?
        import('../utils/SoundManager').then(m => m.default.playClick());
    };

    if (!isOpen || !language) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center border-4 border-brand-blue transform transition-all scale-100">
                <div className="w-24 h-24 mx-auto mb-6">
                    <img src="/icons/icon.png" alt="App Icon" className="w-full h-full object-contain" />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">{language.welcome_title} (Welcome)</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    {language.welcome_intro}
                    <br /><br />
                    <strong>1. Speak Aloud:</strong> You must actually say the phrases.
                    <br />
                    <strong>2. Be Honest:</strong> You grade yourself.
                    <br />
                    <strong>3. Patterns First:</strong> You'll learn grammar by use, not rules.
                </p>

                <button
                    onClick={handleStart}
                    className="w-full py-3 bg-brand-blue text-white font-bold rounded-xl shadow-lg hover:bg-opacity-90 hover:scale-[1.02] transition-all"
                >
                    Let's Start Speaking
                </button>
            </div>
        </div>
    );
}
