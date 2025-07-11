import React from 'react';
import ReactMarkdown from 'react-markdown';
import { LegalContent, Language } from '../../types';

interface LegalViewProps {
    legalItem: LegalContent;
    language: Language;
    onBack: () => void;
}

const LegalView: React.FC<LegalViewProps> = ({ legalItem, language, onBack }) => {
    // Select the title for the current language, with fallbacks to English then German
    const titleToShow = legalItem.title[language] || legalItem.title.en || legalItem.title.de;
    // Select the content for the current language, with fallbacks to English then German
    const contentToShow = legalItem.content[language] || legalItem.content.en || legalItem.content.de;

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <button onClick={onBack} className="mb-8 text-text-primary hover:opacity-80 transition-opacity">&larr; Volver</button>
            <div className="bg-card/80 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-lg border border-border">
                <h1 className="font-serif text-4xl font-bold text-primary mb-6">{titleToShow}</h1>
                <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-text-primary prose-strong:text-primary prose-li:text-text-primary prose-ul:text-text-primary">
                    <ReactMarkdown>{contentToShow}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default LegalView;