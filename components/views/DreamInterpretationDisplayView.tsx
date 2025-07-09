import React, { useState, useEffect } from 'react';
import { DreamData } from '../../types';
import { generateDreamInterpretation } from '../../services/geminiService';
import ReactMarkdown from 'react-markdown';
import SendToEmail from '../SendToEmail';

interface DreamInterpretationDisplayViewProps {
    dreamData: DreamData | null;
    navigateHome: () => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
         <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
         <h2 className="text-2xl font-bold text-text-secondary animate-pulse">Descifrando tu subconsciente...</h2>
         <p className="text-text-secondary">La interpretación de tu sueño está emergiendo.</p>
    </div>
);


const DreamInterpretationDisplayView: React.FC<DreamInterpretationDisplayViewProps> = ({ dreamData, navigateHome }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reportResult, setReportResult] = useState('');

    useEffect(() => {
        const fetchReport = async () => {
            if (!dreamData || !dreamData.dream) {
                setError("No se ha proporcionado ningún sueño. Por favor, vuelve a empezar.");
                setIsLoading(false);
                return;
            }
            try {
                const result = await generateDreamInterpretation(dreamData);
                setReportResult(result);
            } catch (err) {
                setError("Ha ocurrido un error inesperado al generar tu interpretación. Por favor, inténtalo de nuevo.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReport();
    }, [dreamData]);


    const renderContent = () => {
        if (isLoading) {
            return <LoadingSpinner />;
        }

        if (error) {
            return (
                <div className="text-center text-red-800 bg-red-100 border border-red-300 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold text-red-800 mb-2">Error al generar la interpretación</h2>
                    <p>{error}</p>
                </div>
            )
        }
        
        return (
             <div className="bg-background p-6 md:p-8 rounded-lg shadow-inner">
               <div className="prose prose-lg max-w-none prose-headings:text-primary prose-p:text-text-primary prose-strong:text-primary prose-li:text-text-primary prose-ul:text-text-primary">
                    <ReactMarkdown>{reportResult}</ReactMarkdown>
               </div>
            </div>
        )
    };


    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="mb-8">
                 <button onClick={navigateHome} className="text-text-primary hover:opacity-80 transition-opacity">&larr; Volver al inicio</button>
            </div>
            
            <div className="bg-card p-4 md:p-6 rounded-xl shadow-lg border border-border">
                {renderContent()}
            </div>
             {!isLoading && !error && reportResult && (
                <div className="mt-8">
                    <SendToEmail content={reportResult} />
                    <div className="text-center mt-8">
                        <button onClick={navigateHome} className="bg-accent text-primary font-bold py-3 px-10 rounded-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg">
                            Volver a la Página Principal
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DreamInterpretationDisplayView;