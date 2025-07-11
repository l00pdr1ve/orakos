import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chat } from "@google/genai";
import { ChatMessage as ChatMessageType, TarotCard } from '../../types';
import { TAROT_DECK } from '../../constants';
import { startTarotChat } from '../../services/geminiService';
import ChatMessage from '../ChatMessage';
import TarotCardDisplay from '../TarotCardDisplay';

const shuffleDeck = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

interface AIChatViewProps {
    navigateHome: () => void;
}

const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
);

const AIChatView: React.FC<AIChatViewProps> = ({ navigateHome }) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [questionAsked, setQuestionAsked] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = () => {
            setIsLoading(true);
            try {
                const chatInstance = startTarotChat();
                setChat(chatInstance);
                setMessages([{
                    role: 'model',
                    content: `Respira hondo, concéntrate en tu situación y escribe tu pregunta a continuación.`
                }]);
            } catch (error) {
                console.error("Failed to initialize chat:", error);
                setMessages([{
                    role: 'model',
                    content: "Error de configuración: No se pudo conectar con el servicio de IA. Es posible que la clave de API no esté configurada correctamente. Por favor, contacta al administrador del sitio."
                }]);
            } finally {
                setIsLoading(false);
            }
        };
        initChat();
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || !chat || isLoading) return;

        const newUserMessage: ChatMessageType = { role: 'user', content: userInput };
        setMessages(prev => [...prev, newUserMessage]);
        const currentInput = userInput;
        setUserInput('');
        setIsLoading(true);

        let promptForModel = currentInput;

        // If this is the first question, draw cards and prepend their names to the prompt.
        if (!questionAsked) {
            const cards = shuffleDeck(TAROT_DECK).slice(0, 3);
            setDrawnCards(cards);
            setQuestionAsked(true);
            const cardNames = cards.map(c => c.name).join(', ');
            promptForModel = `Mi pregunta es: "${currentInput}".\n\nLas cartas para esta lectura son: ${cardNames}.\n\nPor favor, proporciona la interpretación.`;
        }

        try {
            const stream = await chat.sendMessageStream({ message: promptForModel });

            let currentModelMessage = '';
            setMessages(prev => [...prev, { role: 'model', content: '' }]);

            for await (const chunk of stream) {
                currentModelMessage += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = currentModelMessage;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, { role: 'model', content: "Lo siento, ha ocurrido un error al conectar con mi intuición. Por favor, intenta de nuevo más tarde." }]);
        } finally {
            setIsLoading(false);
        }
    }, [userInput, chat, isLoading, questionAsked]);

    return (
        <div className="max-w-4xl mx-auto h-full flex flex-col animate-fade-in">
            <button onClick={navigateHome} className="mb-4 text-text-primary hover:opacity-80 transition-opacity self-start">&larr; Volver al inicio</button>
            <div
                className="bg-card/80 backdrop-blur-md rounded-xl shadow-2xl border border-border flex flex-col flex-grow p-6"
            >
                {drawnCards.length > 0 && <TarotCardDisplay cards={drawnCards} />}
                <div ref={chatContainerRef} className="flex-grow overflow-y-auto space-y-6 p-4 scroll-smooth">
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} message={msg} />
                    ))}
                    {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                        <div className="flex items-start gap-4 justify-start">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-card">
                                <div className="w-2 h-2 bg-card rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-card rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-card rounded-full animate-pulse"></div>
                            </div>
                            <div className="max-w-xl rounded-2xl px-5 py-3 shadow bg-card rounded-tl-none animate-pulse">
                                <p className="text-text-secondary">Aura está consultando las cartas...</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-6 border-t border-border pt-6">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder={isLoading ? "Espera a que Aura responda..." : "Escribe tu pregunta aquí..."}
                            disabled={isLoading || !chat}
                            className="w-full bg-background border border-border rounded-lg p-3 focus:ring-accent focus:border-accent transition text-text-primary placeholder:text-text-secondary"
                        />
                        <button type="submit" disabled={isLoading || !userInput.trim() || !chat} className="bg-accent p-3 rounded-full text-primary disabled:bg-accent/50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity">
                            <SendIcon className="w-6 h-6" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AIChatView;