import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
    message: ChatMessageType;
}

const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const OracleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16.32 5.35a2.79 2.79 0 0 1 3.33 3.33M8 2a3 3 0 0 0-3 3v2M12 22a3 3 0 0 0 3-3v-2M2 8a3 3 0 0 0 3 3h2M22 16a3 3 0 0 0-3-3h-2M4 16a2 2 0 0 0-2 2M22 4a2 2 0 0 0-2-2M7.7 16.3a2.79 2.79 0 0 1-3.33-3.33"/><circle cx="12" cy="12" r="4"/></svg>
);


const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isModel = message.role === 'model';

    return (
        <div className={`flex items-start gap-4 ${isModel ? 'justify-start' : 'justify-end'}`}>
            {isModel && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-card">
                    <OracleIcon className="w-6 h-6"/>
                </div>
            )}
            <div className={`max-w-xl rounded-2xl px-5 py-3 shadow ${isModel ? 'bg-card text-text-primary rounded-tl-none' : 'bg-primary text-card rounded-br-none'}`}>
                 {isModel ? (
                    <div className="prose prose-sm max-w-none prose-p:text-text-primary prose-strong:text-primary">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                )}
            </div>
             { !isModel && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-text-secondary flex items-center justify-center text-card">
                    <UserIcon className="w-6 h-6"/>
                </div>
            )}
        </div>
    );
};

export default ChatMessage;