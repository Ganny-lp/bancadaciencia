import React, { useState } from "react";

export const ContactsSection: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleEmailClick = () => {
        window.location.href = "mailto:bancadacienciausp@gmail.com";
    };

    const handleWhatsAppClick = (phone: string) => {
        const message = encodeURIComponent(
            `Olá! Gostaria de saber mais sobre o projeto Bancada da Ciência.`
        );
        window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    };

    return (
        <>
            {/* 1. SEÇÃO DA PÁGINA (NOSSA MISSÃO) */}
            <div className="flex flex-col items-center justify-center w-full max-w-5xl animate-fade-in px-4 my-12">
                {/* Alterado para um azul profundo com transparência (Indigo-950/40) */}
                <div className="bg-indigo-950/40 p-8 sm:p-12 rounded-3xl backdrop-blur-md border border-blue-400/20 shadow-2xl shadow-blue-900/20 w-full">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 flex items-center gap-3">
                        <span className="text-blue-400">|</span> Nossa Missão
                    </h3>
                    <div className="space-y-4">
                        <p className="text-blue-50 text-base sm:text-lg leading-relaxed">
                            Somos um projeto de extensão universitária vinculado à iniciativa <strong>Banca da Ciência</strong>. Nosso foco é realizar oficinas interativas de divulgação científica com crianças e adolescentes, especialmente de comunidades periféricas da Zona Leste de São Paulo.
                        </p>
                        <p className="text-blue-50/90 text-base sm:text-lg leading-relaxed">
                            Nossas atividades ocorrem em escolas públicas e centros comunitários, como o CCA Jardim Keralux, e são conduzidas por estudantes da graduação da <strong>EACH-USP</strong>. Nosso objetivo é articular ciência, cultura, tecnologia e cidadania por meio de experiências práticas, criativas e acessíveis, promovendo a equidade e a formação crítica.
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. BOTÃO FLUTUANTE E MODAL DE CONTATO */}
            <div className="fixed bottom-24 right-4 sm:right-6 z-50">

                {/* Janela do Fale Conosco - Paleta baseada em Indigo/Blue */}
                {isOpen && (
                    <div className="absolute bottom-full right-0 mb-3 w-[calc(100vw-2rem)] sm:w-72 bg-blue-950/95 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-blue-400/30 shadow-[0_10px_40px_rgba(0,0,0,0.3)] animate-fade-in origin-bottom-right">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                                <span className="p-1 bg-blue-500/20 rounded-md">📞</span>
                                Fale Conosco
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-blue-200/50 hover:text-white transition-colors bg-blue-400/10 hover:bg-blue-400/20 rounded-full p-1"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-2 text-sm">

                            {/* E-mail - Agora em azul suave */}
                            <div className="bg-blue-900/30 p-2.5 rounded-xl border border-blue-400/10">
                                <p className="text-blue-300/60 mb-0.5 text-[9px] uppercase tracking-widest font-bold">E-mail</p>
                                <button
                                    onClick={handleEmailClick}
                                    className="text-sky-300 hover:text-sky-200 underline break-all transition-colors font-medium text-xs sm:text-sm"
                                >
                                    bancadacienciausp@gmail.com
                                </button>
                            </div>

                            {/* WhatsApp - Hover verde mantido pela identidade do app, mas base azul */}
                            <div className="bg-blue-900/30 p-2.5 rounded-xl border border-blue-400/10">
                                <p className="text-blue-300/60 mb-1 text-[9px] uppercase tracking-widest font-bold">WhatsApp</p>
                                <div className="space-y-1.5">
                                    <button onClick={() => handleWhatsAppClick("5511996022662")} className="flex items-center gap-2 text-blue-50 hover:text-green-400 transition-colors w-full group">
                                        <span className="text-blue-400 group-hover:text-green-400 transition-colors">📱</span>
                                        <span className="font-medium text-xs sm:text-sm">Chelsee: (11) 99602-2662</span>
                                    </button>
                                    <button onClick={() => handleWhatsAppClick("5511971072398")} className="flex items-center gap-2 text-blue-50 hover:text-green-400 transition-colors w-full group">
                                        <span className="text-blue-400 group-hover:text-green-400 transition-colors">📱</span>
                                        <span className="font-medium text-xs sm:text-sm">Samara: (11) 97107-2398</span>
                                    </button>
                                    <button onClick={() => handleWhatsAppClick("5511961311112")} className="flex items-center gap-2 text-blue-50 hover:text-green-400 transition-colors w-full group">
                                        <span className="text-blue-400 group-hover:text-green-400 transition-colors">📱</span>
                                        <span className="font-medium text-xs sm:text-sm">Lukas: (11) 96131-1112</span>
                                    </button>
                                </div>
                            </div>

                            {/* Como Participar - Destaque em Cyan/Sky */}
                            <div className="mt-1 bg-sky-500/20 p-2.5 rounded-xl border border-sky-400/30">
                                <h4 className="text-sky-300 font-bold mb-0.5 flex items-center gap-1 text-xs">
                                    <span>🎯</span> Agende uma Oficina
                                </h4>
                                <p className="text-blue-50/70 text-[10px] sm:text-xs leading-tight">
                                    Levamos ciência de forma lúdica. Entre em contato para visitas!
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Botão Flutuante - Agora com gradiente azul vibrante */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`bg-gradient-to-tr from-blue-700 to-sky-500 hover:from-blue-600 hover:to-sky-400 text-white rounded-full p-3 sm:px-5 sm:py-3.5 shadow-[0_8px_25px_rgba(37,99,235,0.4)] transition-all duration-300 flex items-center gap-2 ${
                        isOpen ? 'scale-95 brightness-90' : 'hover:scale-105 hover:-translate-y-1'
                    }`}
                >
                    <span className="text-xl leading-none">{isOpen ? '✕' : '💬'}</span>
                    {!isOpen && <span className="hidden sm:block font-bold text-sm tracking-wide">Fale Conosco</span>}
                </button>
            </div>
        </>
    );
};