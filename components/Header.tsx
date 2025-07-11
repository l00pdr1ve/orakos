import React from 'react';
import { Language } from '../types';

interface HeaderProps {
    onTitleClick: () => void;
    language: Language;
    setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ onTitleClick, language, setLanguage }) => {

    return (
        <header className="sticky top-0 z-50 h-16 bg-background/90 backdrop-blur-[6px] border-b border-border/50">
            <div className="container mx-auto px-4 sm:px-8 h-full flex items-center justify-between">
                {/* Logo */}
                <button onClick={onTitleClick} className="flex-shrink-0" aria-label="Volver a la página de inicio">
                    <img
                        src="https://res.cloudinary.com/dp9yhv2p6/image/upload/v1752156822/orakos_logo.png"
                        alt="Orakos Logo"
                        className="h-11 w-auto"
                    />
                </button>

                {/* Language Selector */}
                <div className="flex items-center gap-4" aria-label="Selector de idioma">
                    <button
                        onClick={() => setLanguage('es')}
                        className={`font-sans text-base text-primary transition-all p-1 ${language === 'es'
                                ? 'font-bold border-b-2 border-accent'
                                : 'font-normal hover:opacity-70'
                            }`}
                        aria-pressed={language === 'es'}
                    >
                        ES
                    </button>
                    <button
                        onClick={() => setLanguage('en')}
                        className={`font-sans text-base text-primary transition-all p-1 ${language === 'en'
                                ? 'font-bold border-b-2 border-accent'
                                : 'font-normal hover:opacity-70'
                            }`}
                        aria-pressed={language === 'en'}
                    >
                        EN
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;