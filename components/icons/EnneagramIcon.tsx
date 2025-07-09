import React from 'react';

export const EnneagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v2.3" />
        <path d="m6.2 4.6 1.4 2" />
        <path d="m3.1 10.2 2.4.6" />
        <path d="m3.1 13.8 2.4-.6" />
        <path d="m6.2 19.4 1.4-2" />
        <path d="M12 22v-2.3" />
        <path d="m17.8 19.4-1.4-2" />
        <path d="m20.9 13.8-2.4-.6" />
        <path d="m20.9 10.2-2.4.6" />
        <path d="m17.8 4.6-1.4 2" />
        <path d="M12 2 6.2 19.4 17.8 7.8 6.2 7.8 17.8 19.4 12 2Z" />
    </svg>
);
