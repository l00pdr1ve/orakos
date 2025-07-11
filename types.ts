export enum View {
  HOME,
  AI_CHAT,
  ASTRAL_CHART_FORM,
  ASTRAL_CHART_DISPLAY,
  I_CHING_READING,
  NUMEROLOGY_FORM,
  NUMEROLOGY_DISPLAY,
  ENNEAGRAM_QUIZ,
  ENNEAGRAM_DISPLAY,
  DREAM_INTERPRETATION_FORM,
  DREAM_INTERPRETATION_DISPLAY,
  HUMAN_BOOKING,
  LENORMAND_READING,
  // Legal & Help Pages
  IMPRINT,
  PRIVACY,
  COOKIES,
  TERMS,
  WITHDRAWAL,
  DISPUTE,
  FAQ,
  CONTACT,
}

export type Language = 'es' | 'en';

export interface MultilingualText {
  de: string;
  es: string;
  en: string;
}

export interface LegalContent {
  title: MultilingualText;
  content: MultilingualText;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface TarotCard {
  name: string;
  arcana: 'Major' | 'Minor';
  imageName: string;
}

export interface LenormandCard {
  name: string;
  number: number;
}


export type ReadingFocus = 'General' | 'Amor' | 'Dinero';

export interface AstralChartData {
  name: string;
  email: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  focus: ReadingFocus;
}

export interface NumerologyData {
  fullName: string;
  birthDate: string;
  focus: ReadingFocus;
  email?: string;
}

export interface EnneagramData {
  name: string;
  answers: boolean[];
}

export interface DreamData {
  dream: string;
}

export type LineValue = 6 | 7 | 8 | 9; // Yin changing, Yang static, Yin static, Yang changing