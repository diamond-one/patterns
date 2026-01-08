'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES } from '../data/languages/registry';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load persist selection
        const saved = localStorage.getItem('patterns-active-lang');
        if (saved && LANGUAGES[saved]) {
            setLanguage(LANGUAGES[saved]);
        }
        setIsLoaded(true);
    }, []);

    const selectLanguage = (langId) => {
        const lang = LANGUAGES[langId];
        if (lang) {
            setLanguage(lang);
            localStorage.setItem('patterns-active-lang', langId);
        }
    };

    const clearLanguage = () => {
        setLanguage(null);
        localStorage.removeItem('patterns-active-lang');
    };

    return (
        <LanguageContext.Provider value={{ language, selectLanguage, clearLanguage, isLoaded }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
