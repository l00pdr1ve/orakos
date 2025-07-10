import React from 'react';
import { StarIcon } from './icons/StarIcon';

interface HeaderProps {
    onTitleClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onTitleClick }) => {
    return (
        <header className="bg-card/80 backdrop-blur-sm shadow-lg shadow-black/10 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-center">
                 <button onClick={onTitleClick} className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-primary hover:opacity-80 transition-opacity">
                    <StarIcon className="w-5 h-5 md:w-6 md:h-6 opacity-70" />
                    <span className="tracking-wide">Orakos</span>
                    <StarIcon className="w-5 h-5 md:w-6 md:h-6 opacity-70" />
                </button>
            </div>
        </header>
    );
};

export default Header;