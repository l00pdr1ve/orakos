import React, { useState, useCallback } from 'react';
import { LineValue, ReadingFocus, View } from '../../types';
import { getIChingInterpretation } from '../../services/geminiService';
import { I_CHING_HEXAGRAMS } from '../../constants/iChingConstants';
import HexagramDisplay from '../HexagramDisplay';
import ReactMarkdown from 'react-markdown';
import SendToEmail from '../SendToEmail';

interface IChingViewProps {
    navigateHome: () => void;
}

interface HexagramInfo {
    number: number;
    name: string;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center gap-4 text-center my-8">
         <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
         <h2 className="text-2xl font-bold text-text-secondary animate-pulse">Consultando el oráculo...</h2>
         <p className="text-text-secondary">La sabiduría del I Ching se está revelando.</p>
    </div>
);

const IChingView: React.FC<IChingViewProps> = ({ navigateHome }) => {
    const [question, setQuestion] = useState('');
    const [focus, setFocus] = useState<ReadingFocus>('General');
    const [lines, setLines] = useState<LineValue[] | null>(null);
    const [mainHexagram, setMainHexagram] = useState<HexagramInfo | null>(null);
    const [futureHexagram, setFutureHexagram] = useState<HexagramInfo | null>(null);
    const [interpretation, setInterpretation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasConsulted, setHasConsulted] = useState(false);

    const tossCoins = (): LineValue => {
        let heads = 0;
        for (let i = 0; i < 3; i++) {
            if (Math.random() < 0.5) heads++;
        }
        const tails = 3 - heads;
        const value = heads * 3 + tails * 2; // Heads = 3, Tails = 2
        return value as LineValue;
    };

    const getHexagramFromLines = (lines: LineValue[]): HexagramInfo | null => {
        const binaryString = lines.map(line => (line === 6 || line === 8 ? '0' : '1')).join('');
        return I_CHING_HEXAGRAMS[binaryString] || null;
    };

    const handleConsult = useCallback(async () => {
        if (!question.trim()) {
            setError('Por favor, escribe una pregunta para consultar al oráculo.');
            return;
        }
        setError('');
        setIsLoading(true);
        setHasConsulted(true);
        setLines(null);
        setMainHexagram(null);
        setFutureHexagram(null);
        setInterpretation('');

        await new Promise(res => setTimeout(res, 500)); // Dramatic pause

        const generatedLines = Array.from({ length: 6 }, tossCoins);
        setLines(generatedLines);

        const mainHex = getHexagramFromLines(generatedLines);
        if (!mainHex) {
            setError("Error al generar el hexagrama. Por favor, inténtalo de nuevo.");
            setIsLoading(false);
            return;
        }
        setMainHexagram(mainHex);

        const changingLineIndexes = generatedLines
            .map((line, index) => (line === 6 || line === 9 ? index + 1 : -1))
            .filter(index => index !== -1);
        
        let futureHex: HexagramInfo | null = null;
        if (changingLineIndexes.length > 0) {
            const futureLines = generatedLines.map(line => {
                if (line === 6) return 7; // Yin changing becomes Yang static
                if (line === 9) return 8; // Yang changing becomes Yin static
                return line;
            }) as LineValue[];
            futureHex = getHexagramFromLines(futureLines);
            setFutureHexagram(futureHex);
        }

        try {
            const result = await getIChingInterpretation(question, mainHex, changingLineIndexes, futureHex, focus);
            setInterpretation(result);
        } catch (err) {
            console.error(err);
            setError("No se pudo obtener la interpretación del oráculo. Inténtalo más tarde.");
        } finally {
            setIsLoading(false);
        }
    }, [question, focus]);

    const handleReset = () => {
        setQuestion('');
        setFocus('General');
        setLines(null);
        setMainHexagram(null);
        setFutureHexagram(null);
        setInterpretation('');
        setError('');
        setIsLoading(false);
        setHasConsulted(false);
    };

    const isFormState = !hasConsulted;

    const wrapperClasses = `p-6 md:p-10 rounded-xl shadow-lg`;
    const dynamicWrapperClasses = isFormState 
        ? 'bg-card/80 backdrop-blur-md border border-border' 
        : 'border border-transparent'; // Transparent border for dark bg
    const titleClasses = "text-4xl font-bold mb-2 text-center";
    const dynamicTitleClasses = isFormState ? 'text-primary' : 'text-white';
    const descriptionClasses = "mb-8 text-center max-w-2xl mx-auto";
    const dynamicDescriptionClasses = isFormState ? 'text-text-secondary' : 'text-white/80';
    const formLabelClasses = "block text-sm font-medium text-text-secondary mb-2";
    const inputClasses = "w-full bg-background border border-border rounded-lg p-3 focus:ring-accent focus:border-accent transition text-text-primary";
    const buttonClasses = "w-full md:w-auto bg-accent text-primary font-bold py-3 px-10 rounded-lg hover:opacity-90 transition-opacity shadow-md disabled:bg-accent/50 disabled:cursor-not-allowed";

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
             <button onClick={navigateHome} className="mb-8 text-text-primary hover:opacity-80 transition-opacity">&larr; Volver al inicio</button>
            <div 
                className={`${wrapperClasses} ${dynamicWrapperClasses}`}
                style={!isFormState ? {
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://upload.wikimedia.org/wikipedia/commons/2/24/Gfp-blue-chinese-traditional-fabric.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                } : {}}
            >
                <h1 className={`${titleClasses} ${dynamicTitleClasses}`}>Oráculo del I Ching</h1>
                <p className={`${descriptionClasses} ${dynamicDescriptionClasses}`}>Concentra tu mente en una pregunta o situación, y deja que la antigua sabiduría te ofrezca su guía.</p>

                {!lines ? (
                    <div className="space-y-6 max-w-xl mx-auto">
                        <div>
                            <label htmlFor="focus" className={formLabelClasses}>Área de Enfoque:</label>
                            <select
                                id="focus"
                                value={focus}
                                onChange={(e) => setFocus(e.target.value as ReadingFocus)}
                                className={inputClasses}
                            >
                                <option value="General">General</option>
                                <option value="Amor">Amor</option>
                                <option value="Dinero">Dinero</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="question" className={formLabelClasses}>Tu pregunta:</label>
                             <textarea
                                id="question"
                                rows={3}
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className={`${inputClasses} placeholder:text-text-secondary`}
                                placeholder="Ej: ¿Cuál es el mejor enfoque para mi situación laboral actual?"
                            />
                        </div>
                        {error && <p className="text-red-600 text-center">{error}</p>}
                        <div className="text-center pt-2">
                            <button onClick={handleConsult} disabled={isLoading} className={buttonClasses}>
                                {isLoading ? 'Consultando...' : 'Consultar el Oráculo'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        {isLoading && <LoadingSpinner />}
                        {!isLoading && interpretation && (
                             <div className="animate-fade-in text-white">
                                <h2 className="text-2xl font-bold text-center text-white/80 mb-2">La respuesta del oráculo a tu pregunta:</h2>
                                <p className="text-center text-white/90 font-semibold mb-6 italic">"{question}"</p>

                                <div className="flex flex-wrap justify-center items-start gap-8 mb-8">
                                    {mainHexagram && <HexagramDisplay lines={lines} name={mainHexagram.name} number={mainHexagram.number} theme="dark" />}
                                    {futureHexagram && (
                                        <>
                                            <div className="self-center text-4xl text-white animate-pulse">&rarr;</div>
                                            <HexagramDisplay lines={lines.map(l => (l === 6 ? 7 : l === 9 ? 8 : l) as LineValue)} name={futureHexagram.name} number={futureHexagram.number} theme="dark"/>
                                        </>
                                    )}
                                </div>
                                
                                <div className="bg-deep-night/50 p-6 md:p-8 rounded-lg shadow-inner">
                                    <div className="prose prose-lg max-w-none text-white prose-headings:text-white prose-p:text-white/90 prose-strong:text-white prose-li:text-white/90 prose-ul:text-white/90">
                                        <ReactMarkdown>{interpretation}</ReactMarkdown>
                                    </div>
                                </div>
                                
                                <SendToEmail content={interpretation} theme="dark"/>

                                <div className="text-center mt-8">
                                    <button onClick={handleReset} className="bg-accent text-primary font-bold py-2 px-8 rounded-lg hover:opacity-80 transition-opacity">
                                        Hacer otra consulta
                                    </button>
                                </div>
                            </div>
                        )}
                         {!isLoading && error && <p className="text-red-400 text-center mt-4">{error}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default IChingView;