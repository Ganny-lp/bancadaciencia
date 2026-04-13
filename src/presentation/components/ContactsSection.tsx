import React from "react";

export const ContactsSection: React.FC = () => {
    const handleEmailClick = () => {
        window.location.href = "mailto:bancadacienciausp@gmail.com";
    };

    const handleWhatsAppClick = (phone: string, name: string) => {
        const message = encodeURIComponent(
            `Olá! Gostaria de saber mais sobre o projeto Banca da Ciência.`
        );
        window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-5xl animate-fade-in px-4">
            <div className="bg-black/30 p-8 sm:p-12 rounded-3xl backdrop-blur-sm border border-white/10 shadow-xl w-full">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 text-center">
                    Entre em Contato
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Histórico */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-2xl">🏛️</span>
                            Nossa História
                        </h3>
                        <p className="text-white/90 text-sm leading-relaxed mb-4">
                            O projeto <strong>Banca da Ciência</strong> surgiu em 2010 na EACH-USP 
                            com o objetivo de popularizar a ciência através de experimentos de baixo custo 
                            e atividades interativas.
                        </p>
                        <p className="text-white/90 text-sm leading-relaxed">
                            Realizamos apresentações em escolas públicas e na universidade, 
                            voltadas principalmente ao público infantojuvenil, promovendo educação 
                            científica acessível e transformadora.
                        </p>
                    </div>

                    {/* Formas de Contato */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-2xl">📞</span>
                            Fale Conosco
                        </h3>
                        <div className="space-y-4 text-sm">
                            <div>
                                <p className="text-white/70 mb-1">E-mail</p>
                                <button
                                    onClick={handleEmailClick}
                                    className="text-blue-300 hover:text-blue-200 underline break-all transition-colors"
                                >
                                    bancadacienciausp@gmail.com
                                </button>
                            </div>

                            <div>
                                <p className="text-white/70 mb-2">WhatsApp</p>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleWhatsAppClick("5511996022662", "Chelsee")}
                                        className="flex items-center gap-2 text-white/90 hover:text-green-300 transition-colors group"
                                    >
                                        <span className="text-lg group-hover:scale-110 transition-transform">📱</span>
                                        <span>Monitora Chelsee: +55 11 99602-2662</span>
                                    </button>
                                    <button
                                        onClick={() => handleWhatsAppClick("5511971072398", "Samara")}
                                        className="flex items-center gap-2 text-white/90 hover:text-green-300 transition-colors group"
                                    >
                                        <span className="text-lg group-hover:scale-110 transition-transform">📱</span>
                                        <span>Monitora Samara: +55 11 97107-2398</span>
                                    </button>
                                    <button
                                        onClick={() => handleWhatsAppClick("5511961311112", "Lukas")}
                                        className="flex items-center gap-2 text-white/90 hover:text-green-300 transition-colors group"
                                    >
                                        <span className="text-lg group-hover:scale-110 transition-transform">📱</span>
                                        <span>Monitor Lukas: +55 11 96131-1112</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Como Participar */}
                <div className="mt-8 bg-blue-500/10 p-6 rounded-xl border border-blue-400/20">
                    <h3 className="text-xl font-bold text-white mb-3 text-center">
                        🎯 Como Solicitar uma Visita ou Oficina
                    </h3>
                    <p className="text-white/80 text-center text-sm sm:text-base">
                        Entre em contato conosco para agendar apresentações em sua escola ou instituição. 
                        Levamos ciência de forma lúdica e acessível para crianças e adolescentes!
                    </p>
                </div>
            </div>
        </div>
    );
};
