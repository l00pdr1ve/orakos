import React, { useState, useCallback } from 'react';
import { View, AstralChartData, NumerologyData, EnneagramData, DreamData, Language } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/views/HomeView';
import AIChatView from './components/views/AIChatView';
import LenormandChatView from './components/views/LenormandChatView';
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
import LegalView from './components/views/LegalView';
import { legalContent } from './constants/legalContent';


// Centralized background image management
const viewBackgrounds: Partial<Record<View, string>> = {
    [View.AI_CHAT]: 'https://res.cloudinary.com/dp9yhv2p6/image/upload/v1752081387/cards_ugvzpn.png',
    [View.LENORMAND_READING]: 'https://res.cloudinary.com/dp9yhv2p6/image/upload/v1752309121/lenormand_bg_ucmow3.png',
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
    const [viewStack, setViewStack] = useState<View[]>([View.HOME]);
    const [language, setLanguage] = useState<Language>('es');
    const [astralChartData, setAstralChartData] = useState<AstralChartData | null>(null);
    const [numerologyData, setNumerologyData] = useState<NumerologyData | null>(null);
    const [enneagramData, setEnneagramData] = useState<EnneagramData | null>(null);
    const [dreamData, setDreamData] = useState<DreamData | null>(null);

    const currentView = viewStack[viewStack.length - 1];

    const navigate = useCallback((view: View) => {
        setViewStack(prevStack => [...prevStack, view]);
        window.scrollTo(0, 0);
    }, []);

    const navigateBack = useCallback(() => {
        setViewStack(prevStack => {
            if (prevStack.length > 1) {
                return prevStack.slice(0, -1);
            }
            return prevStack; // Should not pop the last view (HOME)
        });
        window.scrollTo(0, 0);
    }, []);

    const navigateHome = useCallback(() => {
        setViewStack([View.HOME]);
        window.scrollTo(0, 0);
    }, []);


    const renderView = () => {
        const legalViewKeys = Object.keys(legalContent).map(key => parseInt(key, 10));
        if (legalViewKeys.includes(currentView)) {
            const legalItem = legalContent[currentView];
            return <LegalView legalItem={legalItem} language={language} onBack={navigateBack} />;
        }

        switch (currentView) {
            case View.AI_CHAT:
                return <AIChatView navigateHome={navigateHome} />;
            case View.LENORMAND_READING:
                return <LenormandChatView navigateHome={navigateHome} />;
            case View.ASTRAL_CHART_FORM:
                return <AstralChartFormView setAstralChartData={setAstralChartData} navigate={navigate} />;
            case View.ASTRAL_CHART_DISPLAY:
                return <AstralChartDisplayView chartData={astralChartData} navigateHome={navigateHome} />;
            case View.I_CHING_READING:
                return <IChingView navigateHome={navigateHome} />;
            case View.NUMEROLOGY_FORM:
                return <NumerologyFormView setNumerologyData={setNumerologyData} navigate={navigate} />;
            case View.NUMEROLOGY_DISPLAY:
                return <NumerologyDisplayView numerologyData={numerologyData} navigateHome={navigateHome} />;
            case View.ENNEAGRAM_QUIZ:
                return <EnneagramQuizView setEnneagramData={setEnneagramData} navigate={navigate} />;
            case View.ENNEAGRAM_DISPLAY:
                return <EnneagramDisplayView enneagramData={enneagramData} navigateHome={navigateHome} />;
            case View.DREAM_INTERPRETATION_FORM:
                return <DreamInterpretationFormView setDreamData={setDreamData} navigate={navigate} />;
            case View.DREAM_INTERPRETATION_DISPLAY:
                return <DreamInterpretationDisplayView dreamData={dreamData} navigateHome={navigateHome} />;
            case View.HUMAN_BOOKING:
                return <HumanBookingView navigateHome={navigateHome} />;
            case View.HOME:
            default:
                return <HomeView navigate={navigate} />;
        }
    };

    const backgroundUrl = viewBackgrounds[currentView];
    const appStyle: React.CSSProperties = backgroundUrl
        ? {
            // The background color #FFF7F1 corresponds to the 'background' color in tailwind.config
            backgroundImage: `linear-gradient(rgba(255, 247, 241, ${PAGE_BACKGROUND_TINT_OPACITY}), rgba(255, 247, 241, ${PAGE_BACKGROUND_TINT_OPACITY})), url('${backgroundUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
        }
        : {};


    return (
        <div className="flex flex-col min-h-screen bg-background transition-all duration-500" style={appStyle}>
            <Header onTitleClick={navigateHome} language={language} setLanguage={setLanguage} />
            <main className="flex-grow container mx-auto px-4 sm:px-8 py-10">
                {renderView()}
            </main>
            <Footer navigate={navigate} />
        </div>
    );
};

export default App;