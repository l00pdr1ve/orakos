import React from 'react';
import { View } from '../types';

interface FooterProps {
    navigate: (view: View) => void;
}

const FooterLinkButton: React.FC<{ onClick: () => void; children: React.ReactNode; lang?: string }> = ({ onClick, children, lang }) => (
    <button onClick={onClick} lang={lang} className="text-left no-underline border-b border-transparent hover:border-accent focus:border-accent focus:outline-none transition-colors duration-200">
        {children}
    </button>
);


const Footer: React.FC<FooterProps> = ({ navigate }) => {
    return (
        <footer className="bg-primary text-background font-sans text-base leading-relaxed pt-12 px-6 pb-8 mt-auto">
            <div className="container mx-auto max-w-4xl">
                <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8 mb-8">
                    {/* Legal Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-3">Legal</h4>
                        <ul className="space-y-2 text-sm sm:text-base mt-2">
                            <li>
                                <FooterLinkButton onClick={() => navigate(View.IMPRINT)} lang="de">Impressum</FooterLinkButton> / <FooterLinkButton onClick={() => navigate(View.IMPRINT)} lang="en">Imprint</FooterLinkButton>
                            </li>
                            <li>
                                <FooterLinkButton onClick={() => navigate(View.PRIVACY)} lang="de">Datenschutzerklärung</FooterLinkButton> / <FooterLinkButton onClick={() => navigate(View.PRIVACY)} lang="en">Privacy&nbsp;Policy</FooterLinkButton>
                            </li>
                            <li>
                                <FooterLinkButton onClick={() => navigate(View.COOKIES)}>Cookie-Einstellungen</FooterLinkButton>
                            </li>
                            <li>
                                <FooterLinkButton onClick={() => navigate(View.TERMS)} lang="de">AGB</FooterLinkButton> / <FooterLinkButton onClick={() => navigate(View.TERMS)} lang="en">Terms&nbsp;&amp;&nbsp;Conditions</FooterLinkButton>
                            </li>
                            <li>
                                <FooterLinkButton onClick={() => navigate(View.WITHDRAWAL)} lang="de">Widerrufsbelehrung</FooterLinkButton> / <FooterLinkButton onClick={() => navigate(View.WITHDRAWAL)} lang="en">Right&nbsp;of&nbsp;Withdrawal</FooterLinkButton>
                            </li>
                            <li>
                                <FooterLinkButton onClick={() => navigate(View.DISPUTE)}>Hinweis Verbraucherstreitbeilegung</FooterLinkButton>
                            </li>
                        </ul>
                    </div>

                    {/* Ayuda Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-3">Ayuda</h4>
                        <ul className="space-y-2 text-sm sm:text-base mt-2">
                            <li>
                                <FooterLinkButton onClick={() => navigate(View.FAQ)}>Preguntas frecuentes</FooterLinkButton>
                            </li>
                            <li>
                                <FooterLinkButton onClick={() => navigate(View.CONTACT)}>Contacto</FooterLinkButton>
                            </li>
                        </ul>
                    </div>
                </div>

                <p className="text-center text-sm opacity-80">
                    © {new Date().getFullYear()} Orakos. Solo para fines de entretenimiento.
                </p>
            </div>
        </footer>
    );
};

export default Footer;