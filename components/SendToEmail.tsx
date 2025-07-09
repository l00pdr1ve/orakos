import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

interface SendToEmailProps {
  content: string;
  initialEmail?: string;
  defaultSubject?: string;
  theme?: 'light' | 'dark';
}

export const SendToEmail: React.FC<SendToEmailProps> = ({
  content,
  initialEmail = '',
  defaultSubject = 'Tu lectura de Orakos',
  theme = 'light',
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendEmail = async () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor, introduce un correo electrónico válido.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await emailjs.send(
        'service_qowcqbd',
        'template_5cz623l',
        {
          user_email: email,
          message: content,
          subject: defaultSubject
        },
        'woOISYXAoW4XUBINd'
      );
      setSent(true);
    } catch (err) {
      setError('Hubo un error al enviar el correo. Por favor, inténtalo de nuevo.');
      console.error('EmailJS Error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const isDark = theme === 'dark';
  const titleColor = isDark ? 'text-white' : 'text-primary';
  const textColor = isDark ? 'text-white/80' : 'text-text-secondary';
  const inputBg = isDark ? 'bg-deep-night/50' : 'bg-card';
  const inputBorder = isDark ? 'border-white/30' : 'border-border';
  const inputPlaceholder = isDark ? 'placeholder:text-white/60' : 'placeholder:text-text-secondary';


  if (sent) {
    return (
      <div className="mt-8 text-center">
        <p className="text-green-700 bg-green-100 p-4 rounded-lg border border-green-300 font-semibold">
          ✅ ¡Enviado! Revisa tu bandeja de entrada (y la carpeta de spam, por si acaso).
        </p>
      </div>
    );
  }

  return (
    <div className={`mt-8 border-t ${isDark ? 'border-white/20' : 'border-border'} pt-6 text-center`}>
      <h3 className={`text-xl font-bold ${titleColor} mb-2`}>¿Quieres guardar esta lectura?</h3>
      <p className={`${textColor} mb-4`}>Introduce tu correo electrónico para recibir una copia.</p>
      <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Tu correo electrónico"
          className={`flex-grow p-3 ${inputBg} border ${inputBorder} rounded-lg focus:ring-accent focus:border-accent transition ${textColor} ${inputPlaceholder}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Tu correo electrónico"
        />
        <button
          onClick={sendEmail}
          disabled={loading || !email.trim()}
          className="px-6 py-3 bg-accent text-primary rounded-lg hover:opacity-90 transition-opacity font-semibold disabled:bg-accent/50 disabled:cursor-not-allowed"
        >
          {loading ? 'Enviando...' : '📩 Enviar'}
        </button>
      </div>
      {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default SendToEmail;