import React from "react";
import { dinamicasData } from "../config/homeConfig";

interface DynamicsSectionProps {
  onGameClick: (id: string) => void;
}

export const DynamicsSection: React.FC<DynamicsSectionProps> = ({
  onGameClick,
}) => {
  return (
    <div className="w-full max-w-6xl animate-fade-in">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
        {dinamicasData.map((jogo) => (
          <button
            key={`jogo-${jogo.id}`}
            onClick={() => onGameClick(jogo.id)}
            className="group relative aspect-square bg-banca-escuro/80 backdrop-blur-md rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-banca-escuro hover:border-white overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_5px_15px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center p-3 sm:p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

            <img
              src={jogo.src}
              alt={jogo.label}
              className="w-3/5 h-3/5 sm:w-3/4 sm:h-3/4 object-contain filter drop-shadow-2xl z-10 group-hover:-translate-y-2 sm:group-hover:-translate-y-4 transition-transform duration-300"
            />

            {/* Botão "Jogar" que sobe no hover */}
            <div className="absolute bottom-[-40px] group-hover:bottom-3 sm:bottom-[-50px] sm:group-hover:bottom-4 transition-all duration-300 z-20">
              <span className="bg-blue-950 text-banca-escuro font-black text-[10px] sm:text-sm uppercase px-4 py-1.5 sm:px-6 sm:py-2 rounded-full shadow-lg flex items-center gap-1 sm:gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Jogar
              </span>
            </div>

            {/* Título */}
            <h3 className="absolute bottom-2 sm:bottom-4 text-white font-black text-xs sm:text-lg tracking-wide opacity-100 group-hover:opacity-0 transition-opacity z-10">
              {jogo.label}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
};
