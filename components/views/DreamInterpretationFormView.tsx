import React, { useState } from 'react';
import { View, DreamData } from '../../types';
import { generateDreamInterpretation } from '../../services/geminiService';

interface DreamInterpretationFormViewProps {
    setDreamData: (data: DreamData) => void;
    navigate: (view: View) => void;
}

const DreamInterpretationFormView: React.FC<DreamInterpretationFormViewProps> = ({ setDreamData, navigate }) => {
    const [dream, setDream] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!dream.trim()) {
            setError('Por favor, describe tu sueño para poder interpretarlo.');
            return;
        }
        setError('');
        setDreamData({ dream });
        navigate(View.DREAM_INTERPRETATION_DISPLAY);
    };

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            <button onClick={() => navigate(View.HOME)} className="mb-8 text-text-primary hover:opacity-80 transition-opacity">&larr; Volver al inicio</button>
            <div 
                className="bg-card/80 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-lg border border-border"
            >
                <h1 className="text-4xl font-bold text-primary mb-2 text-center">Interpretación de Sueños</h1>
                <p className="text-text-secondary mb-8 text-center">Describe tu sueño con el mayor detalle posible. Incluye personas, lugares, emociones y cualquier símbolo que recuerdes.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="dream" className="block text-sm font-medium text-text-secondary mb-2">Tu Sueño</label>
                        <textarea
                            id="dream"
                            rows={10}
                            value={dream}
                            onChange={(e) => setDream(e.target.value)}
                            required
                            className="w-full bg-background border border-border rounded-lg p-3 focus:ring-accent focus:border-accent transition placeholder:text-text-secondary text-text-primary"
                            placeholder="Anoche soñé que volaba sobre una ciudad de cristal..."
                        />
                    </div>
                    
                    {error && <p className="text-red-600 text-center">{error}</p>}
                    
                    <div className="text-center pt-4">
                        <button type="submit" className="w-full md:w-auto bg-accent text-primary font-bold py-3 px-10 rounded-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg">
                            Interpretar mi Sueño
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DreamInterpretationFormView;