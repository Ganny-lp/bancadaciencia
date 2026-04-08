import React from "react";

interface HeaderProps {
    activeTab: "ENTIDADES" | "DINAMICAS" | "SOBRE_NOS";
    // 👇 Adicionamos "SOBRE_NOS" aqui na função onTabChange
    onTabChange: (tab: "ENTIDADES" | "DINAMICAS" | "SOBRE_NOS") => void;
    mobileMenuOpen: boolean;
    onMobileMenuToggle: (open: boolean) => void;
    onHistoryClick: () => void;
    onPlansClick: () => void;
    onKitsClick: () => void;
}

export const HomeHeader: React.FC<HeaderProps> = ({
                                                      activeTab,
                                                      onTabChange,
                                                      mobileMenuOpen,
                                                      onMobileMenuToggle,
                                                      onHistoryClick,
                                                      onPlansClick,
                                                      onKitsClick,
                                                  }) => {
    const tabButtonClass = (isActive: boolean) =>
        `px-8 py-2.5 rounded-full font-bold text-lg transition-all duration-300 min-w-[140px] text-center ${
            isActive
                ? "bg-blue-200 text-blue-950 shadow-md transform scale-105"
                : "bg-transparent text-white/50 hover:text-white/90"
        }`;

    return (
        <>
            {/* Desktop Header */}
            <header className="w-full p-4 z-20">
                <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto">
                    <button
                        onClick={onHistoryClick}
                        className="w-[80px] h-[80px] rounded-full border-none bg-transparent bg-no-repeat bg-center bg-contain cursor-pointer shadow-lg hover:scale-105 transition-transform"
                        style={{ backgroundImage: "url('./images/each.png')" }}
                        aria-label="Histórico do projeto"
                    />

                    {/* Navegação Principal */}
                    <div className="flex bg-blue-950 p-1.5 rounded-full shadow-inner border border-blue-900/50 relative">
                        <button
                            onClick={() => onTabChange("ENTIDADES")}
                            className={tabButtonClass(activeTab === "ENTIDADES")}
                        >
                            Início
                        </button>
                        <button
                            onClick={() => onTabChange("DINAMICAS")}
                            className={tabButtonClass(activeTab === "DINAMICAS")}
                        >
                            Dinâmicas
                        </button>
                        {/* 👇 Novo botão Desktop: Sobre Nós */}
                        <button
                            onClick={() => onTabChange("SOBRE_NOS")}
                            className={tabButtonClass(activeTab === "SOBRE_NOS")}
                        >
                            Sobre Nós
                        </button>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onPlansClick}
                            className="text-white font-bold hover:underline"
                        >
                            Planos
                        </button>
                        <button
                            onClick={onKitsClick}
                            className="text-white font-bold hover:underline"
                        >
                            Kits
                        </button>
                    </div>
                </div>

                {/* Mobile Header */}
                <div className="md:hidden flex justify-between items-center gap-2">
                    <button
                        onClick={onHistoryClick}
                        className="w-12 h-12 rounded-full border-none bg-transparent bg-no-repeat bg-center bg-contain flex-shrink-0 cursor-pointer shadow-lg"
                        style={{ backgroundImage: "url('./images/each.png')" }}
                        aria-label="Histórico"
                    />
                    <button
                        className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 bg-banca-escuro/60 backdrop-blur-sm rounded-lg p-2"
                        onClick={() => onMobileMenuToggle(true)}
                    >
                        <span className="w-5 h-0.5 bg-white"></span>
                        <span className="w-5 h-0.5 bg-white"></span>
                        <span className="w-5 h-0.5 bg-white"></span>
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => onMobileMenuToggle(false)}
                >
                    <div
                        className="flex flex-col bg-blue-950 p-1.5 rounded-2xl shadow-inner border border-blue-900/50 w-3/4 max-w-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => {
                                onTabChange("ENTIDADES");
                                onMobileMenuToggle(false);
                            }}
                            className={`p-4 rounded-xl font-bold text-center transition-all duration-300 ${
                                activeTab === "ENTIDADES"
                                    ? "bg-blue-200 text-blue-950 shadow-md"
                                    : "bg-transparent text-white/50"
                            }`}
                        >
                            Início
                        </button>

                        <button
                            onClick={() => {
                                onTabChange("DINAMICAS");
                                onMobileMenuToggle(false);
                            }}
                            className={`p-4 rounded-xl font-bold text-center transition-all duration-300 ${
                                activeTab === "DINAMICAS"
                                    ? "bg-blue-200 text-blue-950 shadow-md"
                                    : "bg-transparent text-white/50"
                            }`}
                        >
                            Dinâmicas
                        </button>

                        {/* 👇 Novo botão Mobile: Sobre Nós */}
                        <button
                            onClick={() => {
                                onTabChange("SOBRE_NOS");
                                onMobileMenuToggle(false);
                            }}
                            className={`p-4 rounded-xl font-bold text-center transition-all duration-300 ${
                                activeTab === "SOBRE_NOS"
                                    ? "bg-blue-200 text-blue-950 shadow-md"
                                    : "bg-transparent text-white/50"
                            }`}
                        >
                            Sobre Nós
                        </button>

                        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-blue-900">
                            <button
                                onClick={() => {
                                    onPlansClick();
                                    onMobileMenuToggle(false);
                                }}
                                className="text-white font-bold p-3"
                            >
                                Planos
                            </button>
                            <button
                                onClick={() => {
                                    onKitsClick();
                                    onMobileMenuToggle(false);
                                }}
                                className="text-white font-bold p-3"
                            >
                                Kits
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};