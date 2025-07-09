import React from 'react';
import { LineValue } from '../types';

interface HexagramDisplayProps {
    lines: LineValue[];
    name: string;
    number: number;
    theme?: 'light' | 'dark';
}

const Line: React.FC<{ value: LineValue, theme: 'light' | 'dark' }> = ({ value, theme }) => {
    const isBroken = value === 6 || value === 8;
    const isChanging = value === 6 || value === 9;

    const lineBaseClasses = `h-2 transition-all duration-500 ${theme === 'dark' ? 'bg-white/80' : 'bg-text-secondary'}`;
    
    return (
        <div className="relative flex items-center justify-center h-6 group">
            {isBroken ? (
                <div className="flex justify-between w-full">
                    <div className={`${lineBaseClasses} w-[45%] group-hover:w-[40%]`}></div>
                    <div className={`${lineBaseClasses} w-[45%] group-hover:w-[40%]`}></div>
                </div>
            ) : (
                <div className={`${lineBaseClasses} w-full group-hover:w-[90%]`}></div>
            )}
             {isChanging && <div className={`absolute w-2.5 h-2.5 rounded-full animate-pulse ${theme === 'dark' ? 'bg-white' : 'bg-accent'}`}></div>}
        </div>
    );
};


const HexagramDisplay: React.FC<HexagramDisplayProps> = ({ lines, name, number, theme = 'light' }) => {
    if (!lines || lines.length !== 6) return null;

    const textColor = theme === 'dark' ? 'text-white/90' : 'text-primary';
    const secondaryTextColor = theme === 'dark' ? 'text-white/70' : 'text-text-secondary';
    const bgColor = theme === 'dark' ? 'bg-deep-night/50' : 'bg-card/50';
    const borderColor = theme === 'dark' ? 'border-white/20' : 'border-border';

    return (
        <div className={`p-4 ${bgColor} rounded-lg shadow-inner border ${borderColor} w-40 text-center`}>
            <h4 className={`font-bold text-lg ${textColor}`}>{number}</h4>
            <div className="my-3 space-y-2">
                {[...lines].reverse().map((line, index) => (
                    <Line key={index} value={line} theme={theme} />
                ))}
            </div>
            <p className={`${secondaryTextColor} text-xs truncate`}>{name}</p>
        </div>
    );
};

export default HexagramDisplay;