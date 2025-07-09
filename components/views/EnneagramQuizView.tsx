import React, { useState } from 'react';
import { View, EnneagramData } from '../../types';
import { ENNEAGRAM_QUESTIONS } from '../../constants/enneagramQuestions';

interface EnneagramQuizViewProps {
    setEnneagramData: (data: EnneagramData) => void;
    navigate: (view: View) => void;
}

const EnneagramQuizView: React.FC<EnneagramQuizViewProps> = ({ setEnneagramData, navigate }) => {
    const [name, setName] = useState('');
    const [answers, setAnswers] = useState<boolean[]>(Array(ENNEAGRAM_QUESTIONS.length).fill(false));
    const [step, setStep] = useState(0); // 0 for name, 1 for questions
    const [error, setError] = useState('');

    const handleNameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Por favor, introduce tu nombre.');
            return;
        }
        setError('');
        setStep(1);
    };

    const handleAnswerChange = (index: number, value: boolean) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEnneagramData({ name, answers });
        navigate(View.ENNEAGRAM_DISPLAY);
    };

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            <button onClick={() => navigate(View.HOME)} className="mb-8 text-text-primary hover:opacity-80 transition-opacity">&larr; Volver al inicio</button>
            <div 
                className="bg-card/80 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-lg border border-border"
            >
                <h1 className="text-4xl font-bold text-primary mb-2 text-center">Descubre tu Eneagrama</h1>
                <p className="text-text-secondary mb-8 text-center">Responde honestamente a las siguientes afirmaciones para obtener un perfil de tu personalidad.</p>
                
                {step === 0 && (
                     <form onSubmit={handleNameSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">Primero, dinos tu nombre:</label>
                            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-background border border-border rounded-lg p-3 focus:ring-accent focus:border-accent transition placeholder:text-text-secondary text-text-primary" placeholder="Tu nombre" />
                        </div>
                        {error && <p className="text-red-600 text-center">{error}</p>}
                        <div className="text-center pt-4">
                            <button type="submit" className="w-full md:w-auto bg-accent text-primary font-bold py-3 px-10 rounded-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg">
                                Empezar Cuestionario
                            </button>
                        </div>
                    </form>
                )}

                {step === 1 && (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {ENNEAGRAM_QUESTIONS.map((question, index) => (
                            <div key={index} className="bg-background p-4 rounded-lg border border-border">
                                <p className="text-lg text-text-primary mb-4 text-center">{`"${question}"`}</p>
                                <div className="flex justify-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleAnswerChange(index, true)}
                                        className={`py-2 px-6 rounded-lg font-semibold transition-colors ${answers[index] ? 'bg-accent text-primary ring-2 ring-accent/50' : 'bg-card text-text-secondary hover:bg-card/50'}`}
                                    >
                                        Me describe
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleAnswerChange(index, false)}
                                        className={`py-2 px-6 rounded-lg font-semibold transition-colors ${!answers[index] ? 'bg-accent text-primary ring-2 ring-accent/50' : 'bg-card text-text-secondary hover:bg-card/50'}`}
                                    >
                                        No me describe
                                    </button>
                                </div>
                            </div>
                        ))}
                         <div className="text-center pt-4">
                            <button type="submit" className="w-full md:w-auto bg-accent text-primary font-bold py-3 px-10 rounded-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg">
                                Ver mi Perfil
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EnneagramQuizView;