import React, { useState } from 'react';
import { View, AstralChartData, ReadingFocus } from '../../types';

interface AstralChartFormViewProps {
    setAstralChartData: (data: AstralChartData) => void;
    navigate: (view: View) => void;
}

const AstralChartFormView: React.FC<AstralChartFormViewProps> = ({ setAstralChartData, navigate }) => {
    const [formData, setFormData] = useState<AstralChartData>({
        name: '',
        email: '',
        birthDate: '',
        birthTime: '',
        birthPlace: '',
        focus: 'General',
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.birthDate || !formData.birthTime || !formData.birthPlace) {
            setError('Por favor, completa todos los campos para generar tu carta astral.');
            return;
        }
        setError('');
        setAstralChartData(formData);
        navigate(View.ASTRAL_CHART_DISPLAY);
    };

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <button onClick={() => navigate(View.HOME)} className="mb-8 text-text-primary hover:opacity-80 transition-opacity">&larr; Volver al inicio</button>
            <div 
                className="bg-card/80 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-lg border border-border"
            >
                <h1 className="text-4xl font-bold text-primary mb-2 text-center">Crea tu Carta Astral</h1>
                <p className="text-text-secondary mb-8 text-center">Introduce tus datos de nacimiento para que el universo nos revele tu mapa estelar.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="focus" className="block text-sm font-medium text-text-secondary mb-2">Área de Enfoque</label>
                        <select
                            name="focus"
                            id="focus"
                            value={formData.focus}
                            onChange={handleChange}
                            className="w-full bg-background border border-border rounded-lg p-3 focus:ring-accent focus:border-accent transition text-text-primary"
                        >
                            <option value="General">General</option>
                            <option value="Amor">Amor</option>
                            <option value="Dinero">Dinero</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">Nombre Completo</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full bg-background border border-border rounded-lg p-3 focus:ring-accent focus:border-accent transition placeholder:text-text-secondary text-text-primary" placeholder="Tu nombre y apellidos" />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">Correo Electrónico</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full bg-background border border-border rounded-lg p-3 focus:ring-accent focus:border-accent transition placeholder:text-text-secondary text-text-primary" placeholder="Para enviarte una copia de tu carta" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="birthDate" className="block text-sm font-medium text-text-secondary mb-2">Fecha de Nacimiento</label>
                            <input type="date" name="birthDate" id="birthDate" value={formData.birthDate} onChange={handleChange} required className="w-full bg-background border border-border rounded-lg p-3 focus:ring-accent focus:border-accent transition text-text-primary" />
                        </div>
                        <div>
                            <label htmlFor="birthTime" className="block text-sm font-medium text-text-secondary mb-2">Hora de Nacimiento</label>
                            <input type="time" name="birthTime" id="birthTime" value={formData.birthTime} onChange={handleChange} required className="w-full bg-background border border-border rounded-lg p-3 focus:ring-accent focus:border-accent transition text-text-primary" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="birthPlace" className="block text-sm font-medium text-text-secondary mb-2">Lugar de Nacimiento</label>
                        <input type="text" name="birthPlace" id="birthPlace" value={formData.birthPlace} onChange={handleChange} required className="w-full bg-background border border-border rounded-lg p-3 focus:ring-accent focus:border-accent transition placeholder:text-text-secondary text-text-primary" placeholder="Ciudad y País" />
                    </div>
                    
                    {error && <p className="text-red-600 text-center">{error}</p>}
                    
                    <div className="text-center pt-4">
                        <button type="submit" className="w-full md:w-auto bg-accent text-primary font-bold py-3 px-10 rounded-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg">
                            Generar mi Carta Astral
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AstralChartFormView;