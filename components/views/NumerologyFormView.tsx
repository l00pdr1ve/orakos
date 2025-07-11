import React, { useState } from 'react';
import { View, NumerologyData, ReadingFocus } from '../../types';

interface NumerologyFormViewProps {
    setNumerologyData: (data: NumerologyData) => void;
    navigate: (view: View) => void;
}

const NumerologyFormView: React.FC<NumerologyFormViewProps> = ({ setNumerologyData, navigate }) => {
    const [formData, setFormData] = useState<NumerologyData>({
        fullName: '',
        birthDate: '',
        focus: 'General',
        email: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fullName || !formData.birthDate) {
            setError('Por favor, completa todos los campos para generar tu perfil.');
            return;
        }
        setError('');
        setNumerologyData(formData);
        navigate(View.NUMEROLOGY_DISPLAY);
    };

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <button onClick={() => navigate(View.HOME)} className="mb-8 text-text-primary hover:opacity-80 transition-opacity">&larr; Volver al inicio</button>
            <div
                className="bg-card/80 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-lg border border-border"
            >
                <h1 className="font-serif text-4xl font-bold text-primary mb-2 text-center">Tu Perfil Numerológico</h1>
                <p className="text-text-secondary mb-8 text-center">Introduce tu nombre y fecha de nacimiento para desvelar la vibración de tus números.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="focus" className="block text-base font-medium text-text-secondary mb-2">Área de Enfoque</label>
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
                        <label htmlFor="fullName" className="block text-base font-medium text-text-secondary mb-2">Nombre Completo</label>
                        <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} required className="w-full bg-background border border-border rounded-lg p-3 focus:ring-accent focus:border-accent transition placeholder:text-text-secondary text-text-primary" placeholder="Tal como aparece en tu certificado de nacimiento" />
                    </div>
                    <div>
                        <label htmlFor="birthDate" className="block text-base font-medium text-text-secondary mb-2">Fecha de Nacimiento</label>
                        <input type="date" name="birthDate" id="birthDate" value={formData.birthDate} onChange={handleChange} required className="w-full bg-background border border-border rounded-lg p-3 focus:ring-accent focus:border-accent transition text-text-primary" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-base font-medium text-text-secondary mb-2">Correo Electrónico (Opcional)</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full bg-background border border-border rounded-lg p-3 focus:ring-accent focus:border-accent transition placeholder:text-text-secondary text-text-primary" placeholder="Para enviarte una copia de tu perfil" />
                    </div>

                    {error && <p className="text-red-600 text-center">{error}</p>}

                    <div className="text-center pt-4">
                        <button type="submit" className="w-full md:w-auto bg-accent text-primary font-bold py-3 px-10 rounded-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg">
                            Calcular mis Números
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NumerologyFormView;