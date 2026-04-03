import React, { createContext, useContext, useState, ReactNode } from 'react';

// Adicionamos os outros IDs que os ícones do topo usam para não dar erro
// Adicione todos os IDs que usamos no Home.tsx aqui:
type ModalType = 'NONE' | 'ASTRO'| 'KITS' | 'SUBPROJETOS' | 'SUBPROJETO_INFO' | 'DRIVE_VIEWER' | 'NEWTON' | 'FOLDER' | 'TEACHER' | 'CHICKEN' | 'EYE' | 'TELESCOPE' | 'BULB' | 'SNORKEL' | 'FOTON' | 'PRESSAO'| 'YODA' | 'HISTORICO';
interface ModalContextData {
    activeModal: ModalType;
    payload: string | null;
    openModal: (type: ModalType, payload?: string | null) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export const ModalProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [activeModal, setActiveModal] = useState<ModalType>('NONE');
    const [payload, setPayload] = useState<string | null>(null);

    const openModal = (type: ModalType, payload: string | null = null) => {
        setActiveModal(type);
        setPayload(payload);
        // Bloqueia o scroll da página quando um modal está aberto
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setActiveModal('NONE');
        setPayload(null);
        // Restaura o scroll
        document.body.style.overflow = 'unset';
    };

    return (
        <ModalContext.Provider value={{ activeModal, payload, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);