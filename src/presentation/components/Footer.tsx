import React, { useEffect, useState } from 'react';
import { useModal } from '../contexts/ModalContext';

export const Footer = () => {
    const { openModal } = useModal();

    const [isHoveringBoi, setIsHoveringBoi] = useState(false);
    const [dialogIndex, setDialogIndex] = useState(0);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (isHoveringBoi) {
            timer = setInterval(() => setDialogIndex((prev) => (prev + 1) % 3), 6000);
        }
        return () => clearInterval(timer);
    }, [isHoveringBoi]);

    return (
        <footer className="w-full bg-gradient-to-br from-[#001428b3] to-[#002850b3] border-t border-[#70a8ff66] mt-24 relative z-10">

            {/* CONTAINER DO MASCOTE (BOI) - Alturas e Larguras FIXAS para evitar bugs de scroll */}
            <div className="absolute bottom-0 left-0 lg:left-4 z-30 pointer-events-none">
                <div className="relative">
                    <button
                        onMouseEnter={() => setIsHoveringBoi(true)}
                        onMouseLeave={() => setIsHoveringBoi(false)}
                        onClick={() => openModal('SUBPROJETOS')}
                        // Dimensões cravadas garantem que ele sempre será maior que o footer
                        className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] lg:w-[350px] lg:h-[350px] pointer-events-auto hover:scale-105 transition-transform duration-300 cursor-pointer drop-shadow-[0_-5px_15px_rgba(0,0,0,0.3)] block"
                    >
                        <img
                            src="./images/subprojetos.png"
                            alt="Mascote"
                            className="w-full h-full object-contain object-bottom"
                        />
                    </button>

                    {/* Balões de diálogo ajustados para não causarem barra de rolagem horizontal */}
                    {isHoveringBoi && (
                        <div className="absolute bottom-[85%] left-20 md:left-28 lg:left-44 w-48 md:w-64 lg:w-96 pointer-events-none transition-opacity duration-300">
                            <img
                                src={`./images/dialogo${dialogIndex + 1}.png`}
                                className="w-full object-contain animate-bounce"
                                alt="Diálogo"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* CONTEÚDO DO FOOTER - Reduzimos o padding vertical no mobile para o footer ficar mais "fino" */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5 pl-[140px] md:pl-[250px] lg:pl-[340px] pr-4 py-4 md:py-6">

                {/* LOGOS INSTITUCIONAIS */}
                <div className="flex gap-4 md:gap-6 items-center flex-wrap justify-center md:justify-start">
                    <img
                        src="./images/usp.png"
                        alt="Logo USP"
                        className="h-8 md:h-10 lg:h-12 w-auto opacity-90 hover:opacity-100 transition-all filter drop-shadow-md"
                    />
                    <img
                        src="./images/eachusp.png"
                        alt="Logo EACH-USP"
                        className="h-8 md:h-10 lg:h-12 w-auto opacity-90 hover:opacity-100 transition-all filter drop-shadow-md"
                    />
                    <img
                        src="./images/capes.png"
                        alt="Logo CAPES"
                        className="h-8 md:h-10 lg:h-12 w-auto opacity-90 hover:opacity-100 transition-all filter drop-shadow-md"
                    />
                    <img
                        src="./images/fapesp.png"
                        alt="Logo FAPESP"
                        className="h-[14px] md:h-[18px] lg:h-[22px] w-auto opacity-90 hover:opacity-100 transition-all filter drop-shadow-md"
                    />
                </div>

                {/* CONTATOS E REDES SOCIAIS */}
                <div className="flex flex-col items-center md:items-end text-white text-center md:text-right w-full md:w-auto">
                    <h3 className="text-[#eaf4ff] text-sm md:text-base lg:text-lg font-bold mb-2 shadow-sm">Contatos e Redes Sociais</h3>

                    <div className="flex flex-col gap-2 items-center md:items-end">
                        <div className="flex items-center gap-2 bg-white/5 p-1.5 md:p-2 rounded-lg hover:bg-white/15 transition-all w-fit">
                            <img src="./images/email.png" alt="Email" className="w-4 h-4 md:w-5 md:h-5" />
                            <a href="mailto:bancadacienciausp@gmail.com" className="text-[#d5efff] text-[11px] md:text-xs lg:text-sm">
                                bancadacienciausp@gmail.com
                            </a>
                        </div>

                        <div className="flex gap-2 justify-center md:justify-end">
                            <a href="https://instagram.com/bancadaciencia" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/5 p-1.5 md:p-2 rounded-lg hover:bg-white/15 transition-all">
                                <img src="./images/instagram.png" alt="Instagram" className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="text-[#d5efff] text-[11px] md:text-xs lg:text-sm hidden sm:inline">@bancadaciencia</span>
                            </a>
                            <a href="https://instagram.com/bancadacienciaeach" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/5 p-1.5 md:p-2 rounded-lg hover:bg-white/15 transition-all">
                                <img src="./instagram.png" alt="Instagram EACH" className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="text-[#d5efff] text-[11px] md:text-xs lg:text-sm hidden sm:inline">@bancadacienciaeach</span>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};