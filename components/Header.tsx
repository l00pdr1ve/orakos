import React from 'react';

interface HeaderProps {
    onTitleClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onTitleClick }) => {
    return (
        <header className="bg-card/80 backdrop-blur-sm shadow-lg shadow-black/10 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-center">
                 <button onClick={onTitleClick} className="text-2xl md:text-3xl font-bold text-primary hover:opacity-80 transition-opacity">
                    Orakos
                </button>
            </div>
        </header>
    );
};

export default Header;