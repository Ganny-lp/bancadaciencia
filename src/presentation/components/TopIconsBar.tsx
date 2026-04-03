import React from 'react';

interface TopIcon {
    id: string;
    src: string;
}

const icons: TopIcon[] = [
    { id: 'KITS', src: './images/pasta.png' },
    { id: 'NEWTON', src: './images/aexestrela.png' },
    { id: 'FOLDER', src: './images/planos.png' },
    { id: 'TEACHER', src: './images/fazenda.png' },
    { id: 'CHICKEN', src: './images/alimentos.png' },
    { id: 'EYE', src: './images/olho.png' },
    { id: 'TELESCOPE', src: './images/telescopio.png' },
    { id: 'BULB', src: './images/foton.png' },
    { id: 'SNORKEL', src: './images/pressao.png' },
    { id: 'YODA', src: './images/yoda.png' },
];

interface TopIconsBarProps {
    onIconClick: (id: string) => void;
}

export const TopIconsBar: React.FC<TopIconsBarProps> = ({ onIconClick }) => {
    return (
        <div className="flex bg-banca-escuro/40 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-2xl overflow-x-auto no-scrollbar">
            {icons.map((icon) => (
                <button
                    key={icon.id}
                    onClick={() => onIconClick(icon.id)}
                    className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 p-2 hover:bg-banca-medio/50 rounded-xl transition-all hover:scale-110"
                >
                    <img src={icon.src} className="w-full h-full object-contain filter drop-shadow-md" alt={icon.id} />
                </button>
            ))}
        </div>
    );
};