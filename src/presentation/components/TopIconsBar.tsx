import React from 'react';
import { getFileUrl } from '../config/subprojectsContent';

interface TopIcon {
    id: string;
    src: string;
}

const icons: TopIcon[] = [
    { id: 'KITS', src: getFileUrl('banca/pasta.png') },
    { id: 'NEWTON', src: getFileUrl('banca/aexestrela.png') },
    { id: 'FOLDER', src: getFileUrl('banca/planos.png') },
    { id: 'TEACHER', src: getFileUrl('banca/fazenda.png') },
    { id: 'CHICKEN', src: getFileUrl('banca/alimentos.png') },
    { id: 'EYE', src: getFileUrl('banca/olho.png') },
    { id: 'TELESCOPE', src: getFileUrl('banca/telescopio.png') },
    { id: 'BULB', src: getFileUrl('banca/foton.png') },
    { id: 'SNORKEL', src: getFileUrl('banca/pressao.png') },
    { id: 'YODA', src: getFileUrl('banca/yoda.png') },
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