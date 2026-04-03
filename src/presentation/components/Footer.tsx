import React, { useEffect, useState, useRef } from 'react';
import { useModal } from '../contexts/ModalContext';

export const Footer = () => {
    const { openModal } = useModal();

    const [showDialog, setShowDialog] = useState(false);
    const [dialogIndex, setDialogIndex] = useState(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const modalTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Ciclo de troca de imagens do balão (a cada 6s)
    useEffect(() => {
        let interval: ReturnType<typeof setTimeout> | null = null;
        if (showDialog) {
            interval = setInterval(() => {
                setDialogIndex((prev) => (prev + 1) % 3);
            }, 6000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [showDialog]);

    // Limpa timeouts ao desmontar
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
        };
    }, []);

    const showTemporaryDialog = () => {
        setShowDialog(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setShowDialog(false);
        }, 5000);
    };

    const handleClick = () => {
        if ('ontouchstart' in window) {
            showTemporaryDialog();
            if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
            modalTimeoutRef.current = setTimeout(() => {
                openModal('SUBPROJETOS');
            }, 500);
        } else {
            openModal('SUBPROJETOS');
        }
    };

    const handleMouseEnter = () => {
        if (!('ontouchstart' in window)) {
            setShowDialog(true);
        }
    };

    const handleMouseLeave = () => {
        if (!('ontouchstart' in window)) {
            setShowDialog(false);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    };

    return (
        <footer className="w-full bg-gradient-to-br from-[#001428b3] to-[#002850b3] border-t border-[#70a8ff66] mt-24 relative z-10 overflow-x-clip">
            <div className="absolute bottom-0 left-0 lg:left-4 z-30 pointer-events-none">
                <div className="relative">
                    <button
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleClick}
                        className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] lg:w-[350px] lg:h-[350px] pointer-events-auto hover:scale-105 transition-transform duration-300 cursor-pointer drop-shadow-[0_-5px_15px_rgba(0,0,0,0.3)] block"
                    >
                        <img
                            src="./images/subprojetos.png"
                            alt="Mascote"
                            className="w-full h-full object-contain object-bottom"
                        />
                    </button>

                    {showDialog && (
                        <div
                            className="absolute pointer-events-none transition-opacity duration-300 z-40"
                            style={{
                                bottom: '100%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                marginBottom: '0.5rem',
                                width: 'clamp(200px, 50vw, 320px)',
                            }}
                        >
                            <img
                                src={`./images/dialogo${dialogIndex + 1}.png`}
                                className="w-full h-auto object-contain drop-shadow-lg"
                                alt="Diálogo"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5 pl-[140px] md:pl-[250px] lg:pl-[340px] pr-4 py-4 md:py-6">
                <div className="flex gap-4 md:gap-6 items-center flex-wrap justify-center md:justify-start">
                    <img src="./images/usp.png" alt="Logo USP" className="h-8 md:h-10 lg:h-12 w-auto opacity-90 hover:opacity-100 transition-all filter drop-shadow-md" />
                    <img src="./images/eachusp.png" alt="Logo EACH-USP" className="h-8 md:h-10 lg:h-12 w-auto opacity-90 hover:opacity-100 transition-all filter drop-shadow-md" />
                    <img src="./images/capes.png" alt="Logo CAPES" className="h-8 md:h-10 lg:h-12 w-auto opacity-90 hover:opacity-100 transition-all filter drop-shadow-md" />
                    <img src="./images/fapesp.png" alt="Logo FAPESP" className="h-[14px] md:h-[18px] lg:h-[22px] w-auto opacity-90 hover:opacity-100 transition-all filter drop-shadow-md" />
                </div>

                <div className="flex flex-col items-center md:items-end text-white text-center md:text-right w-full md:w-auto">
                    <h3 className="text-[#eaf4ff] text-sm md:text-base lg:text-lg font-bold mb-2 shadow-sm">Contatos e Redes Sociais</h3>
                    <div className="flex flex-col gap-2 items-center md:items-end">
                        <div className="flex items-center gap-2 bg-white/5 p-1.5 md:p-2 rounded-lg hover:bg-white/15 transition-all w-fit">
                            <img src="./images/email.png" alt="Email" className="w-4 h-4 md:w-5 md:h-5" />
                            <a href="mailto:bancadacienciausp@gmail.com" className="text-[#d5efff] text-[11px] md:text-xs lg:text-sm">bancadacienciausp@gmail.com</a>
                        </div>
                        <div className="flex gap-2 justify-center md:justify-end">
                            <a href="https://instagram.com/bancadaciencia" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/5 p-1.5 md:p-2 rounded-lg hover:bg-white/15 transition-all">
                                <img src="./images/instagram.png" alt="Instagram" className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="text-[#d5efff] text-[11px] md:text-xs lg:text-sm hidden sm:inline">@bancadaciencia</span>
                            </a>
                            <a href="https://instagram.com/bancadacienciaeach" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/5 p-1.5 md:p-2 rounded-lg hover:bg-white/15 transition-all">
                                <img src="./images/instagram.png" alt="Instagram EACH" className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="text-[#d5efff] text-[11px] md:text-xs lg:text-sm hidden sm:inline">@bancadacienciaeach</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};