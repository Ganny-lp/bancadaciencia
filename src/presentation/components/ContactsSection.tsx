import React, { useState } from "react";

const CONTACTS = [
    { name: "Chelsee", phone: "5511996022662" },
    { name: "Samara", phone: "5511971072398" },
    { name: "Lukas", phone: "5511961311112" },
];

export const ContactsSection: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const sendMessage = (phone?: string) => {
        if (!phone) {
            window.location.href = "mailto:bancadacienciausp@gmail.com";
            return;
        }
        const msg = encodeURIComponent("Olá! Gostaria de saber mais sobre o projeto Bancada da Ciência.");
        window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
    };

    const WppIcon = () => (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.628 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
    );

    return (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 flex flex-col items-end">
            {isOpen && (
                <div className="mb-4 w-[310px] bg-blue-500/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.2)] animate-in fade-in zoom-in duration-200 origin-bottom-right text-slate-800 dark:text-white">
                    {/* Overlay de fundo leve para garantir leitura se o site for muito claro */}
                    <div className="absolute inset-0 bg-blue-900/60 -z-10 rounded-3xl"></div>

                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-xs uppercase tracking-widest opacity-80">Contato</h3>
                        <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform p-1">✕</button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        {/* Bloco Email */}
                        <button
                            onClick={() => sendMessage()}
                            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 border border-white/10 hover:bg-blue-400/30 transition-all group"
                        >
                            <span className="text-xl mb-1">✉️</span>
                            <span className="text-[10px] font-bold uppercase text-blue-200">E-mail</span>
                        </button>

                        {/* Bloco WhatsApp */}
                        <div className="flex flex-col p-3 rounded-2xl bg-white/10 border border-white/10">
                            <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-2">
                                <WppIcon />
                                <span className="text-[10px] font-bold uppercase">WhatsApp</span>
                            </div>
                            <div className="flex flex-col gap-1.5 items-center">
                                {CONTACTS.map((c) => (
                                    <button
                                        key={c.phone}
                                        onClick={() => sendMessage(c.phone)}
                                        className="text-[11px] text-white/90 hover:text-emerald-400 transition-colors font-medium"
                                    >
                                        {c.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <p className="text-blue-200 font-bold text-[10px] mb-1">🎯 Agende uma Oficina</p>
                        <p className="text-white/60 text-[10px] leading-tight italic">
                            "Levamos ciência de forma lúdica."
                        </p>
                    </div>
                </div>
            )}

            {/* Botão Flutuante */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg hover:shadow-blue-500/40 transition-all active:scale-95"
            >
                <span className="text-lg transition-transform group-hover:rotate-12">{isOpen ? "✕" : "💬"}</span>
                <span className="font-bold text-sm tracking-tight">Fale Conosco</span>
            </button>
        </div>
    );
};