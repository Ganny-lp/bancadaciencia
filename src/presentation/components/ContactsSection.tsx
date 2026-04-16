import React, { useState } from "react";

export const ContactsSection: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleEmailClick = () => {
        window.location.href = "mailto:bancadacienciausp@gmail.com";
    };

    const handleWhatsAppClick = (phone: string, name: string) => {
        const message = encodeURIComponent(
            `Olá! Gostaria de saber mais sobre o projeto Bancada da Ciência.`
        );
        window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    };

    return (
        <>
            {/* 1. SEÇÃO DA PÁGINA (NOSSA MISSÃO) */}
            <div className="flex flex-col items-center justify-center w-full max-w-5xl animate-fade-in px-4 my-12">
                <div className="bg-black/30 p-8 sm:p-12 rounded-3xl backdrop-blur-sm border border-white/10 shadow-xl w-full">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 flex items-center gap-3">
                        Nossa Missão
                    </h3>
                    <div className="space-y-4">
                        <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                            Somos um projeto de extensão universitária vinculado à iniciativa <strong>Banca da Ciência</strong>. Nosso foco é realizar oficinas interativas de divulgação científica com crianças e adolescentes, especialmente de comunidades periféricas da Zona Leste de São Paulo.
                        </p>
                        <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                            Nossas atividades ocorrem em escolas públicas e centros comunitários, como o CCA Jardim Keralux, e são conduzidas por estudantes da graduação da <strong>EACH-USP</strong>. Nosso objetivo é articular ciência, cultura, tecnologia e cidadania por meio de experiências práticas, criativas e acessíveis, promovendo a equidade e a formação crítica.
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. BOTÃO FLUTUANTE E MODAL DE CONTATO ULTRA COMPACTO */}
            <div className="fixed bottom-24 right-4 sm:right-6 z-50">

                {/* Janela do Fale Conosco - Sem scroll, espaçamentos espremidos */}
                {isOpen && (
                    <div className="absolute bottom-full right-0 mb-3 w-[calc(100vw-2rem)] sm:w-72 bg-gray-900/95 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/10 shadow-2xl animate-fade-in origin-bottom-right">

                        {/* Header mais colado */}
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                                <span className="text-lg">📞</span>
                                Fale Conosco
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-1"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Container dos contatos espremido para space-y-1.5 */}
                        <div className="space-y-1.5 text-sm">

                            {/* E-mail */}
                            <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                                <p className="text-white/50 mb-0.5 text-[9px] uppercase tracking-wider font-bold">E-mail</p>
                                <button
                                    onClick={handleEmailClick}
                                    className="text-blue-400 hover:text-blue-300 underline break-all transition-colors font-medium text-xs sm:text-sm"
                                >
                                    bancadacienciausp@gmail.com
                                </button>
                            </div>

                            {/* WhatsApp */}
                            <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                                <p className="text-white/50 mb-1 text-[9px] uppercase tracking-wider font-bold">WhatsApp</p>
                                <div className="space-y-1">
                                    <button onClick={() => handleWhatsAppClick("5511996022662", "Chelsee")} className="flex items-center gap-2 text-white/90 hover:text-green-400 transition-colors w-full group">
                                        <span className="text-sm">📱</span>
                                        <span className="font-medium text-xs sm:text-sm">Chelsee: (11) 99602-2662</span>
                                    </button>
                                    <button onClick={() => handleWhatsAppClick("5511971072398", "Samara")} className="flex items-center gap-2 text-white/90 hover:text-green-400 transition-colors w-full group">
                                        <span className="text-sm">📱</span>
                                        <span className="font-medium text-xs sm:text-sm">Samara: (11) 97107-2398</span>
                                    </button>
                                    <button onClick={() => handleWhatsAppClick("5511961311112", "Lukas")} className="flex items-center gap-2 text-white/90 hover:text-green-400 transition-colors w-full group">
                                        <span className="text-sm">📱</span>
                                        <span className="font-medium text-xs sm:text-sm">Lukas: (11) 96131-1112</span>
                                    </button>
                                </div>
                            </div>

                            {/* Como Participar */}
                            <div className="mt-1 bg-blue-500/10 p-2 rounded-lg border border-blue-400/20">
                                <h4 className="text-blue-300 font-bold mb-0.5 flex items-center gap-1 text-xs">
                                    <span>🎯</span> Agende uma Oficina
                                </h4>
                                <p className="text-white/70 text-[10px] sm:text-xs leading-tight">
                                    Levamos ciência de forma lúdica. Entre em contato para visitas!
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Botão Flutuante */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`bg-blue-600 hover:bg-blue-500 text-white rounded-full p-3 sm:px-4 sm:py-3 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 flex items-center gap-2 ${
                        isOpen ? 'scale-95 bg-blue-700' : 'hover:scale-105 hover:-translate-y-1'
                    }`}
                >
                    <span className="text-xl leading-none">{isOpen ? '💬' : '💬'}</span>
                    {!isOpen && <span className="hidden sm:block font-bold text-sm tracking-wide">Fale Conosco</span>}
                </button>
            </div>
        </>
    );
};