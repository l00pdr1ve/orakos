import React from 'react';
import { View } from '../../types';
import { SparklesIcon as TarotIcon } from '../icons/SparklesIcon';
import { IChingIcon } from '../icons/IChingIcon';
import { NumerologyIcon } from '../icons/NumerologyIcon';
import { DreamIcon } from '../icons/DreamIcon';
import { EnneagramIcon } from '../icons/EnneagramIcon';
import { UserCircleIcon } from '../icons/UserCircleIcon';
import { AstralIcon } from '../icons/AstralIcon';

interface ServiceCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, onClick }) => (
  <div
    className="bg-card rounded-xl shadow-lg border border-border p-6 w-full text-center cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 transform"
    onClick={onClick}
  >
    <div className="flex items-center justify-center mb-4 text-secondary">
      <Icon className="w-10 h-10" strokeWidth={1.5}/>
    </div>
    <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
    <p className="text-sm text-text-secondary">{description}</p>
  </div>
);

const HomeView: React.FC<{ navigate: (view: View) => void }> = ({ navigate }) => {
  const services = [
    {
      icon: TarotIcon,
      title: 'Lectura de Tarot con IA',
      description: 'Una lectura directa, intuitiva y disponible al instante con Aura.',
      view: View.AI_CHAT,
    },
    {
      icon: AstralIcon,
      title: 'Carta Astral',
      description: 'Descubre tu signo solar, lunar y ascendente con un enfoque claro.',
      view: View.ASTRAL_CHART_FORM,
    },
    {
      icon: IChingIcon,
      title: 'Oráculo del I Ching',
      description: 'Sabiduría milenaria para tus decisiones presentes y futuras.',
      view: View.I_CHING_READING,
    },
    {
      icon: NumerologyIcon,
      title: 'Perfil Numerológico',
      description: 'Tu informe completo basado en tu nombre y fecha de nacimiento.',
      view: View.NUMEROLOGY_FORM,
    },
    {
      icon: EnneagramIcon,
      title: 'Test de Eneagrama',
      description: 'Conoce tu eneatipo de personalidad con un breve cuestionario.',
      view: View.ENNEAGRAM_QUIZ,
    },
    {
      icon: DreamIcon,
      title: 'Interpretación de Sueños',
      description: 'Desvela el significado simbólico de lo que tu subconsciente te dice.',
      view: View.DREAM_INTERPRETATION_FORM,
    },
    {
      icon: UserCircleIcon,
      title: 'Agenda tu Sesión',
      description: 'Conecta con una tarotista experta para una lectura humana y personal.',
      view: View.HUMAN_BOOKING,
    }
  ];

  return (
    <div className="animate-fade-in text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
        Tú preguntas, Orakos responde
      </h1>
      <p className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto">
        Respuestas rápidas, precisas y asequibles. Tarot, carta astral, numerología, y más. Todo en un solo lugar y sin juicios.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            icon={service.icon}
            title={service.title}
            description={service.description}
            onClick={() => navigate(service.view)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeView;