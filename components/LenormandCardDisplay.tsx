import React from 'react';
import { LenormandCard } from '../types';

interface LenormandCardDisplayProps {
    cards: LenormandCard[];
}

const LenormandCardDisplay: React.FC<LenormandCardDisplayProps> = ({ cards }) => {
    if (!cards || cards.length === 0) {
        return null;
    }

    return (
        <div className="mb-10 p-6 bg-card/50 rounded-lg shadow-inner border border-border">
            <h3 className="text-center text-text-secondary text-base mb-4">Tus cartas para esta lectura:</h3>
            <div className="flex justify-center items-center gap-4 md:gap-8">
                {cards.map((card, index) => (
                    <div key={index} className="text-center transform transition-transform duration-500 hover:scale-105 group">
                        <img
                            src={card.imageUrl}
                            alt={`Una carta de Lenormand: ${card.name}`}
                            className="w-20 md:w-24 h-auto rounded-lg shadow-lg border-2 border-accent/50 group-hover:border-accent"
                        />
                        <p className="mt-2 text-base text-text-primary">{card.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LenormandCardDisplay;