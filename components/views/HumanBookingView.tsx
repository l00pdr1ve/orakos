import React, { useState } from 'react';

interface HumanBookingViewProps {
    navigateHome: () => void;
}

const HumanBookingView: React.FC<HumanBookingViewProps> = ({ navigateHome }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle form submission, e.g., send to an API.
        // For this demo, we'll just show a confirmation message.
        if (name && email) {
            setSubmitted(true);
        }
    };

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
             <button onClick={navigateHome} className="mb-8 text-text-primary hover:opacity-80 transition-opacity">&larr; Volver al inicio</button>
            <div 
                className="bg-card/80 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-lg border border-border"
            >
                <div className="flex flex-col md:flex-row gap-8 items-center">

                <img src="https://res.cloudinary.com/dp9yhv2p6/image/upload/v1752081967/tarotista_beazuq.png" alt="Foto de Elena, la tarotista"
                // Para ajustar el tamaño, cambia los valores de w- y h- (ej: w-32, h-32 o w-48, h-48)
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full shadow-xl border-4 border-accent/70 flex-shrink-0"
                />

                    <div>
                        <h1 className="text-4xl font-bold text-primary mb-2">Agenda tu Sesión Personal</h1>
                        <p className="text-text-secondary mb-4">
                            Conecta con Elena, nuestra tarotista residente. Con años de experiencia y una profunda empatía, Elena te guiará a través de una lectura personalizada para explorar tus preguntas más importantes.
                        </p>
                    </div>
                </div>

                <div className="mt-10">
                    {submitted ? (
                        <div className="text-center bg-green-100 border border-green-300 p-8 rounded-lg">
                            <h2 className="text-2xl font-bold text-green-800">¡Gracias, {name}!</h2>
                            <p className="text-green-700 mt-2">Hemos recibido tu solicitud. Nos pondremos en contacto contigo a través de tu correo electrónico ({email}) en las próximas 24 horas para confirmar los detalles y agendar tu sesión.</p>
                            <button
                                onClick={navigateHome}
                                className="mt-6 bg-accent text-primary font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Volver al Inicio
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">Tu Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full bg-background border border-border rounded-lg p-3 focus:ring-accent focus:border-accent transition text-text-primary"
                                    placeholder="Ej: Sofía"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">Tu Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-background border border-border rounded-lg p-3 focus:ring-accent focus:border-accent transition text-text-primary"
                                    placeholder="Ej: sofia@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-text-secondary mb-2">¿Hay algo que te gustaría compartir antes de la sesión? (Opcional)</label>
                                <textarea
                                    id="notes"
                                    rows={4}
                                    className="w-full bg-background border border-border rounded-lg p-3 focus:ring-accent focus:border-accent transition placeholder:text-text-secondary text-text-primary"
                                    placeholder="Puedes contarnos el área de tu vida sobre la que te gustaría preguntar: amor, trabajo, crecimiento personal..."
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="w-full md:w-auto bg-accent text-primary font-bold py-3 px-10 rounded-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg">
                                    Solicitar Sesión
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HumanBookingView;