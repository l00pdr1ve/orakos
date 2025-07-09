import React, { useState, useCallback } from 'react';
import { View, AstralChartData, NumerologyData, EnneagramData, DreamData } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/views/HomeView';
import AIChatView from './components/views/AIChatView';
import AstralChartFormView from './components/views/AstralChartFormView';
import AstralChartDisplayView from './components/views/AstralChartDisplayView';
import IChingView from './components/views/IChingView';
import NumerologyFormView from './components/views/NumerologyFormView';
import NumerologyDisplayView from './components/views/NumerologyDisplayView';
import EnneagramQuizView from './components/views/EnneagramQuizView';
import EnneagramDisplayView from './components/views/EnneagramDisplayView';
import DreamInterpretationFormView from './components/views/DreamInterpretationFormView';
import DreamInterpretationDisplayView from './components/views/DreamInterpretationDisplayView';
import HumanBookingView from './components/views/HumanBookingView';

// Centralized background image management
const viewBackgrounds: Partial<Record<View, string>> = {
    [View.AI_CHAT]: 'https://res.cloudinary.com/dp9yhv2p6/image/upload/v1752081387/cards_ugvzpn.png',
    [View.ASTRAL_CHART_FORM]: 'https://res.cloudinary.com/dp9yhv2p6/image/upload/v1752081387/stars_meit83.png',
    [View.I_CHING_READING]: 'https://res.cloudinary.com/dp9yhv2p6/image/upload/v1752081385/iching_sy7a8a.png',
    [View.NUMEROLOGY_FORM]: 'https://res.cloudinary.com/dp9yhv2p6/image/upload/v1752081389/numerologia_rdaerz.png',
    [View.ENNEAGRAM_QUIZ]: 'https://res.cloudinary.com/dp9yhv2p6/image/upload/v1752081385/eneagrama_txne9m.png',
    [View.DREAM_INTERPRETATION_FORM]: 'https://res.cloudinary.com/dp9yhv2p6/image/upload/v1752081387/suenos_chippc.png',
    [View.HUMAN_BOOKING]: 'https://res.cloudinary.com/dp9yhv2p6/image/upload/v1752081387/cards_ugvzpn.png',
};

// GLOBAL: Change this value to modulate the background image tint opacity (0.0 = full image, 1.0 = full tint)
const PAGE_BACKGROUND_TINT_OPACITY = 0.96;


const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>(View.HOME);
    const [astralChartData, setAstralChartData] = useState<AstralChartData | null>(null);
    const [numerologyData, setNumerologyData] = useState<NumerologyData | null>(null);
    const [enneagramData, setEnneagramData] = useState<EnneagramData | null>(null);
    const [dreamData, setDreamData] = useState<DreamData | null>(null);

    const navigate = useCallback((view: View) => {
        setCurrentView(view);
        window.scrollTo(0, 0);
    }, []);

    const renderView = () => {
        switch (currentView) {
            case View.AI_CHAT:
                return <AIChatView navigateHome={() => navigate(View.HOME)} />;
            case View.ASTRAL_CHART_FORM:
                return <AstralChartFormView setAstralChartData={setAstralChartData} navigate={navigate} />;
            case View.ASTRAL_CHART_DISPLAY:
                return <AstralChartDisplayView chartData={astralChartData} navigateHome={() => navigate(View.HOME)} />;
            case View.I_CHING_READING:
                return <IChingView navigateHome={() => navigate(View.HOME)} />;
            case View.NUMEROLOGY_FORM:
                return <NumerologyFormView setNumerologyData={setNumerologyData} navigate={navigate} />;
            case View.NUMEROLOGY_DISPLAY:
                return <NumerologyDisplayView numerologyData={numerologyData} navigateHome={() => navigate(View.HOME)} />;
            case View.ENNEAGRAM_QUIZ:
                return <EnneagramQuizView setEnneagramData={setEnneagramData} navigate={navigate} />;
            case View.ENNEAGRAM_DISPLAY:
                 return <EnneagramDisplayView enneagramData={enneagramData} navigateHome={() => navigate(View.HOME)} />;
            case View.DREAM_INTERPRETATION_FORM:
                return <DreamInterpretationFormView setDreamData={setDreamData} navigate={navigate} />;
            case View.DREAM_INTERPRETATION_DISPLAY:
                return <DreamInterpretationDisplayView dreamData={dreamData} navigateHome={() => navigate(View.HOME)} />;
            case View.HUMAN_BOOKING:
                return <HumanBookingView navigateHome={() => navigate(View.HOME)} />;
            case View.HOME:
            default:
                return <HomeView navigate={navigate} />;
        }
    };
    
    const isChatView = currentView === View.AI_CHAT;
    
    const backgroundUrl = viewBackgrounds[currentView];
    const appStyle: React.CSSProperties = backgroundUrl
      ? {
          // The background color #FDF6EE corresponds to the 'background' color in tailwind.config
          backgroundImage: `linear-gradient(rgba(253, 246, 238, ${PAGE_BACKGROUND_TINT_OPACITY}), rgba(253, 246, 238, ${PAGE_BACKGROUND_TINT_OPACITY})), url('${backgroundUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }
      : {};


    return (
        <div className="flex flex-col min-h-screen bg-background transition-all duration-500" style={appStyle}>
            <Header onTitleClick={() => navigate(View.HOME)} />
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
                {renderView()}
            </main>
            <Footer isFixed={isChatView} />
        </div>
    );
};

export default App;