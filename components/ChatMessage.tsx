import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
    message: ChatMessageType;
}

const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);

const OracleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);


const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isModel = message.role === 'model';

    return (
        <div className={`flex items-start gap-4 ${isModel ? 'justify-start' : 'justify-end'}`}>
            {isModel && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-card">
                    <OracleIcon className="w-6 h-6" />
                </div>
            )}
            <div className={`max-w-xl rounded-2xl p-4 shadow ${isModel ? 'bg-card text-text-primary rounded-tl-none' : 'bg-primary text-card rounded-br-none'}`}>
                {isModel ? (
                    <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-text-primary prose-strong:text-primary">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                )}
            </div>
            {!isModel && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-text-secondary flex items-center justify-center text-card">
                    <UserIcon className="w-6 h-6" />
                </div>
            )}
        </div>
    );
};

export default ChatMessage;