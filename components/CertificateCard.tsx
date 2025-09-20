import React from 'react';

interface CertificateCardProps {
    imageUrl: string;
    title: string;
    onClick: () => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ imageUrl, title, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="group block w-full text-left overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 shadow-lg hover:shadow-emerald-500/20 hover:border-emerald-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 p-3"
            aria-label={`View certificate for ${title}`}
        >
            <p className="mt-3 text-center text-sm font-semibold text-neutral-200">
                {title}
            </p>
        </button>
    );
};

export default CertificateCard;
