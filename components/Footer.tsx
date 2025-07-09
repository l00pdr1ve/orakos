import React from 'react';

interface FooterProps {
    isFixed?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isFixed = false }) => {
    const fixedClasses = 'fixed bottom-0 left-0 right-0 z-10';

    return (
        <footer className={`${isFixed ? fixedClasses : 'mt-12'} bg-card/50 backdrop-blur-sm`}>
            <div className="container mx-auto px-4 py-4 text-center text-text-secondary">
                <p className="text-sm">&copy; {new Date().getFullYear()} Orakos. Solo para fines de entretenimiento.</p>
                <p className="text-xs mt-1">Creado con cariño en España.</p>
            </div>
        </footer>
    );
};

export default Footer;