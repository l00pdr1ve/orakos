import React, { useState } from 'react';
import { View } from '../../types';

interface AstralChartPaymentViewProps {
    navigate: (view: View) => void;
}

const CreditCardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
    </svg>
);

const AstralChartPaymentView: React.FC<AstralChartPaymentViewProps> = ({ navigate }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate payment processing delay
        setTimeout(() => {
            navigate(View.ASTRAL_CHART_DISPLAY);
        }, 1500);
    };

    return (
        <div className="max-w-md mx-auto animate-fade-in">
             <button onClick={() => navigate(View.ASTRAL_CHART_FORM)} className="mb-8 text-text-primary hover:opacity-80 transition-opacity">&larr; Volver a mis datos</button>
            <div className="bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl font-bold text-primary mb-4 text-center">Finalizar Compra</h1>
                
                <div className="bg-background p-4 rounded-lg mb-6 border border-border">
                    <div className="flex justify-between items-center">
                        <span className="text-text-primary">Carta Astral Personalizada</span>
                        <span className="font-bold text-primary text-lg">25,00 €</span>
                    </div>
                </div>

                <form onSubmit={handlePayment} className="space-y-4">
                    <div>
                        <label htmlFor="card-number" className="block text-sm font-medium text-text-secondary mb-2">Número de Tarjeta</label>
                        <input type="text" id="card-number" required className="w-full bg-background border border-border rounded-lg p-3 text-text-primary" placeholder="**** **** **** ****" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label htmlFor="expiry" className="block text-sm font-medium text-text-secondary mb-2">Caducidad</label>
                            <input type="text" id="expiry" required className="w-full bg-background border border-border rounded-lg p-3 text-text-primary" placeholder="MM/AA" />
                        </div>
                        <div>
                            <label htmlFor="cvc" className="block text-sm font-medium text-text-secondary mb-2">CVC</label>
                            <input type="text" id="cvc" required className="w-full bg-background border border-border rounded-lg p-3 text-text-primary" placeholder="123" />
                        </div>
                    </div>
                    <div className="pt-6">
                         <button type="submit" disabled={isProcessing} className="w-full flex items-center justify-center gap-3 bg-accent text-primary font-bold py-3 px-10 rounded-lg hover:opacity-90 transition-opacity shadow-md disabled:bg-accent/50 disabled:cursor-wait">
                            {isProcessing ? (
                                <>
                                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                Procesando...
                                </>
                            ) : (
                                <>
                                <CreditCardIcon className="w-5 h-5" />
                                Pagar 25,00 € de forma segura
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AstralChartPaymentView;