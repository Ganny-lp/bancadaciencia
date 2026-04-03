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
            {/* Mascote (boi) - absolute posicionado */}
            <div className="absolute bottom-0 left-0 z-30 pointer-events-none">
                <div className="relative">
                    <button
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleClick}
                        className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] lg:w-[340px] lg:h-[340px] pointer-events-auto hover:scale-105 transition-transform duration-300 cursor-pointer drop-shadow-[0_-5px_15px_rgba(0,0,0,0.3)] block"
                    >
                        <img
                            src="./images/subprojetos.png"
                            alt="Mascote"
                            className="w-full h-full object-contain object-bottom"
                        />
                    </button>

                    {/* Balão de diálogo - ajustado para ficar mais próximo */}
                    {showDialog && (
                        <div
                            className="absolute pointer-events-none transition-opacity duration-300 z-40"
                            style={{
                                bottom: 'calc(100% - 0.75rem)', // mais próximo: antes 100% + margin-bottom
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 'clamp(180px, 45vw, 300px)',
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

            {/* Conteúdo do footer - com padding-left responsivo para não sobrepor o boi */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pl-[130px] sm:pl-[160px] md:pl-[240px] lg:pl-[320px] pr-4 py-3 md:py-5">
                {/* Logos institucionais */}
                <div className="flex gap-3 md:gap-5 items-center flex-wrap justify-center md:justify-start">
                    <img src="./images/usp.png" alt="Logo USP" className="h-7 md:h-10 lg:h-11 w-auto opacity-90 hover:opacity-100 transition-all filter drop-shadow-md" />
                    <img src="./images/eachusp.png" alt="Logo EACH-USP" className="h-7 md:h-10 lg:h-11 w-auto opacity-90 hover:opacity-100 transition-all filter drop-shadow-md" />
                    <img src="./images/capes.png" alt="Logo CAPES" className="h-7 md:h-10 lg:h-11 w-auto opacity-90 hover:opacity-100 transition-all filter drop-shadow-md" />
                    <img src="./images/fapesp.png" alt="Logo FAPESP" className="h-[12px] md:h-[18px] lg:h-[20px] w-auto opacity-90 hover:opacity-100 transition-all filter drop-shadow-md" />
                </div>

                {/* Contatos e redes sociais */}
                <div className="flex flex-col items-center md:items-end text-white text-center md:text-right w-full md:w-auto">
                    <h3 className="text-[#eaf4ff] text-xs md:text-base lg:text-lg font-bold mb-1 shadow-sm">Contatos e Redes Sociais</h3>
                    <div className="flex flex-col gap-1.5 items-center md:items-end">
                        <div className="flex items-center gap-2 bg-white/5 p-1 md:p-2 rounded-lg hover:bg-white/15 transition-all w-fit">
                            <img src="./images/email.png" alt="Email" className="w-3 h-3 md:w-5 md:h-5" />
                            <a href="mailto:bancadacienciausp@gmail.com" className="text-[#d5efff] text-[10px] md:text-xs lg:text-sm">
                                bancadacienciausp@gmail.com
                            </a>
                        </div>
                        <div className="flex gap-2 justify-center md:justify-end">
                            <a href="https://instagram.com/bancadaciencia" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/5 p-1 md:p-2 rounded-lg hover:bg-white/15 transition-all">
                                <img src="./images/instagram.png" alt="Instagram" className="w-3 h-3 md:w-5 md:h-5" />
                                <span className="text-[#d5efff] text-[10px] md:text-xs lg:text-sm hidden sm:inline">@bancadaciencia</span>
                            </a>
                            <a href="https://instagram.com/bancadacienciaeach" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/5 p-1 md:p-2 rounded-lg hover:bg-white/15 transition-all">
                                <img src="./images/instagram.png" alt="Instagram EACH" className="w-3 h-3 md:w-5 md:h-5" />
                                <span className="text-[#d5efff] text-[10px] md:text-xs lg:text-sm hidden sm:inline">@bancadacienciaeach</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};