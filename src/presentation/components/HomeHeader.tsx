import React from "react";
import { getFileUrl } from "../config/subprojectsContent";

interface HeaderProps {
  activeTab: "ENTIDADES" | "DINAMICAS";
  onTabChange: (tab: "ENTIDADES" | "DINAMICAS") => void;
  mobileMenuOpen: boolean;
  onMobileMenuToggle: (open: boolean) => void;
  onPlansClick: () => void;
  onKitsClick: () => void;
}

export const HomeHeader: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  mobileMenuOpen,
  onMobileMenuToggle,
  onPlansClick,
  onKitsClick,
}) => {
  const handleEachLogoClick = () => {
    window.open("https://www5.each.usp.br/", "_blank");
  };
  const tabButtonClass = (isActive: boolean) =>
    `px-8 py-2.5 rounded-full font-bold text-lg transition-all duration-300 min-w-[140px] text-center ${
      isActive
        ? "bg-blue-200 text-blue-950 shadow-md transform scale-105"
        : "bg-transparent text-white/50 hover:text-white/90"
    }`;

  // Handler para navegação por teclado
  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="w-full p-4 z-20" role="banner">
        <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto">
          <button
            onClick={handleEachLogoClick}
            onKeyDown={(e) => handleKeyDown(e, handleEachLogoClick)}
            className="w-[80px] h-[80px] rounded-full border-none bg-transparent bg-no-repeat bg-center bg-contain cursor-pointer shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-yellow-400"
            style={{ backgroundImage: `url('${getFileUrl("banca/each.png")}')` }}
            aria-label="Visitar site da EACH-USP"
            title="EACH-USP - Escola de Artes, Ciências e Humanidades"
            tabIndex={0}
          />

          {/* Navegação Principal */}
          <nav
            className="flex bg-blue-950 p-1.5 rounded-full shadow-inner border border-blue-900/50 relative"
            role="navigation"
            aria-label="Navegação principal"
          >
            <button
              onClick={() => onTabChange("ENTIDADES")}
              onKeyDown={(e) =>
                handleKeyDown(e, () => onTabChange("ENTIDADES"))
              }
              className={tabButtonClass(activeTab === "ENTIDADES")}
              aria-current={activeTab === "ENTIDADES" ? "page" : undefined}
              role="tab"
              aria-selected={activeTab === "ENTIDADES"}
              tabIndex={0}
            >
              Início
            </button>
            <button
              onClick={() => onTabChange("DINAMICAS")}
              onKeyDown={(e) =>
                handleKeyDown(e, () => onTabChange("DINAMICAS"))
              }
              className={tabButtonClass(activeTab === "DINAMICAS")}
              aria-current={activeTab === "DINAMICAS" ? "page" : undefined}
              role="tab"
              aria-selected={activeTab === "DINAMICAS"}
              tabIndex={0}
            >
              Dinâmicas
            </button>
          </nav>

          <div
            className="flex gap-4"
            role="navigation"
            aria-label="Ações rápidas"
          >
            <button
              onClick={onPlansClick}
              onKeyDown={(e) => handleKeyDown(e, onPlansClick)}
              className="text-white font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-2 py-1"
              aria-label="Ver planos de aula"
              tabIndex={0}
            >
              Planos
            </button>
            <button
              onClick={onKitsClick}
              onKeyDown={(e) => handleKeyDown(e, onKitsClick)}
              className="text-white font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-2 py-1"
              aria-label="Ver kits educacionais"
              tabIndex={0}
            >
              Kits
            </button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center gap-2">
          <button
            onClick={handleEachLogoClick}
            onKeyDown={(e) => handleKeyDown(e, handleEachLogoClick)}
            className="w-12 h-12 rounded-full border-none bg-transparent bg-no-repeat bg-center bg-contain flex-shrink-0 cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            style={{ backgroundImage: `url('${getFileUrl("banca/each.png")}')` }}
            aria-label="Visitar EACH-USP"
            title="EACH-USP"
            tabIndex={0}
          />
          <button
            className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 bg-banca-escuro/60 backdrop-blur-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={() => onMobileMenuToggle(true)}
            onKeyDown={(e) => handleKeyDown(e, () => onMobileMenuToggle(true))}
            aria-label="Abrir menu de navegação"
            aria-expanded={mobileMenuOpen}
            tabIndex={0}
          >
            <span className="w-5 h-0.5 bg-white" aria-hidden="true"></span>
            <span className="w-5 h-0.5 bg-white" aria-hidden="true"></span>
            <span className="w-5 h-0.5 bg-white" aria-hidden="true"></span>
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => onMobileMenuToggle(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação mobile"
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
              onKeyDown={(e) =>
                handleKeyDown(e, () => {
                  onTabChange("ENTIDADES");
                  onMobileMenuToggle(false);
                })
              }
              className={`p-4 rounded-xl font-bold text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                activeTab === "ENTIDADES"
                  ? "bg-blue-200 text-blue-950 shadow-md"
                  : "bg-transparent text-white/50"
              }`}
              aria-current={activeTab === "ENTIDADES" ? "page" : undefined}
              tabIndex={0}
            >
              Início
            </button>

            <button
              onClick={() => {
                onTabChange("DINAMICAS");
                onMobileMenuToggle(false);
              }}
              onKeyDown={(e) =>
                handleKeyDown(e, () => {
                  onTabChange("DINAMICAS");
                  onMobileMenuToggle(false);
                })
              }
              className={`p-4 rounded-xl font-bold text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                activeTab === "DINAMICAS"
                  ? "bg-blue-200 text-blue-950 shadow-md"
                  : "bg-transparent text-white/50"
              }`}
              aria-current={activeTab === "DINAMICAS" ? "page" : undefined}
              tabIndex={0}
            >
              Dinâmicas
            </button>

            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-blue-900">
              <button
                onClick={() => {
                  onPlansClick();
                  onMobileMenuToggle(false);
                }}
                onKeyDown={(e) =>
                  handleKeyDown(e, () => {
                    onPlansClick();
                    onMobileMenuToggle(false);
                  })
                }
                className="text-white font-bold p-3 hover:bg-white/10 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Ver planos de aula"
                tabIndex={0}
              >
                Planos
              </button>
              <button
                onClick={() => {
                  onKitsClick();
                  onMobileMenuToggle(false);
                }}
                onKeyDown={(e) =>
                  handleKeyDown(e, () => {
                    onKitsClick();
                    onMobileMenuToggle(false);
                  })
                }
                className="text-white font-bold p-3 hover:bg-white/10 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Ver kits educacionais"
                tabIndex={0}
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
