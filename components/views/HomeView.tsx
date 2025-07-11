import React from 'react';
import { View } from '../../types';
import { SparklesIcon as TarotIcon } from '../icons/SparklesIcon';
import { IChingIcon } from '../icons/IChingIcon';
import { NumerologyIcon } from '../icons/NumerologyIcon';
import { DreamIcon } from '../icons/DreamIcon';
import { EnneagramIcon } from '../icons/EnneagramIcon';
import { UserCircleIcon } from '../icons/UserCircleIcon';
import { AstralIcon } from '../icons/AstralIcon';
import { KeyIcon } from '../icons/KeyIcon';

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, onClick }) => (
  <button
    onClick={onClick}
    aria-label={`Abrir ${title}`}
    className="group flex flex-col items-center gap-3 py-8 px-6 bg-card rounded-2xl text-primary w-full text-center transition-all duration-200 cursor-pointer shadow-[0_4px_14px_rgba(27,29,59,0.07)] border border-[rgba(27,29,59,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 md:hover:-translate-y-1 md:hover:shadow-[0_8px_22px_rgba(27,29,59,0.10)] md:hover:border-[rgba(27,29,59,0.12)] focus-visible:border-[rgba(27,29,59,0.12)]"
  >
    <span className="w-16 h-16 rounded-full bg-background flex items-center justify-center">
      <Icon className="w-10 h-10 text-primary" />
    </span>
    <h3 className="text-lg font-bold text-center">{title}</h3>
    <p className="text-base text-text-secondary text-center leading-normal">
      {description}
    </p>
  </button>
);


const HomeView: React.FC<{ navigate: (view: View) => void }> = ({ navigate }) => {
  const services = [
    {
      icon: TarotIcon,
      title: 'Lectura de Tarot',
      description: 'Una lectura directa, intuitiva y disponible al instante con Aura.',
      view: View.AI_CHAT,
    },
    {
      icon: KeyIcon,
      title: 'Lectura de Lenormand',
      description: 'Respuestas prácticas y concretas con el famoso oráculo francés.',
      view: View.LENORMAND_READING,
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
    <div className="animate-fade-in">
      {/* New Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 md:py-20 min-h-[40vh] gap-6">
        <h1 className="font-serif text-primary text-4xl md:text-5xl font-bold max-w-2xl">
          Tú preguntas, Orakos responde
        </h1>
        <p className="text-text-secondary max-w-xl text-lg">
          Respuestas rápidas, precisas y asequibles. Tarot, carta astral, numerología y más. Todo en un solo lugar y sin juicios.
        </p>
      </section>

      {/* Services Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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