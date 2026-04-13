import React from "react";
import { useCarousel } from "../hooks/useCarousel";
import { entidadesData } from "../config/homeConfig";
import {
  getSubprojectContent,
  getImageUrl,
} from "../config/subprojectsContent";
import { SubprojectContentRenderer } from "./SubprojectContentRenderer";

interface EntitiesSectionProps {
  onEntityClick: (id: string) => void;
}

export const EntitiesSection: React.FC<EntitiesSectionProps> = ({
  onEntityClick,
}) => {
  const { nextSlide, prevSlide, getVisibleItems } = useCarousel({
    itemsLength: entidadesData.length,
    visibleCount: 4,
  });

  const visibleEntities = getVisibleItems(entidadesData);
  const mainEntity = visibleEntities[0];
  const subEntities = visibleEntities.slice(1);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 w-full max-w-6xl animate-fade-in">
      {/* Lado Esquerdo: Carrossel com a Imagem */}
      <div className="flex items-center gap-3 sm:gap-6">
        <button
          onClick={prevSlide}
          className="z-10 bg-banca-escuro/80 hover:bg-banca-escuro text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xl border border-white/20 text-xl md:text-2xl hover:scale-110 flex-shrink-0"
          aria-label="Anterior"
        >
          &#10094;
        </button>

        <div className="flex flex-col items-center gap-4 sm:gap-6 w-[140px] sm:w-[280px]">
          {/* Imagem em Destaque */}
          <button
            onClick={() => onEntityClick(mainEntity.id)}
            className="group relative w-32 h-32 sm:w-64 sm:h-64 rounded-full border-4 border-white/30 bg-banca-escuro/40 backdrop-blur-sm p-2 sm:p-4 overflow-hidden shadow-2xl group-hover:border-white transition-all flex items-center justify-center"
            title="Clique para ver a galeria e mais infos!"
          >
            <img
              src={
                getImageUrl(
                  getSubprojectContent(mainEntity.id)?.profileImage,
                ) || mainEntity.src
              }
              alt={mainEntity.name}
              className="w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-base bg-blue-600/90 px-3 py-1 sm:px-4 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2">
                Galeria
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </button>

          {/* Próximas Entidades */}
          <div className="hidden sm:flex gap-4 justify-center w-full">
            {subEntities.slice(0, 2).map((entity) => (
              <div
                key={`sub-${entity.id}`}
                className="flex flex-col items-center gap-2 opacity-60"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white/20 bg-banca-escuro/30 p-2 overflow-hidden">
                  <img
                    src={
                      getImageUrl(
                        getSubprojectContent(entity.id)?.profileImage,
                      ) || entity.src
                    }
                    alt={entity.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="z-10 bg-banca-escuro/80 hover:bg-banca-escuro text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xl border border-white/20 text-xl md:text-2xl hover:scale-110 flex-shrink-0"
          aria-label="Próximo"
        >
          &#10095;
        </button>
      </div>

      {/* Lado Direito: Informações */}
      <div className="w-full lg:w-[500px] bg-banca-escuro/70 backdrop-blur-md border border-white/20 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl text-white text-left">
        <h2 className="text-2xl sm:text-5xl font-black mb-3 sm:mb-4 border-b border-white/20 pb-3 sm:pb-4 text-blue-200">
          {mainEntity.name}
        </h2>
        <div className="text-sm sm:text-base md:text-lg leading-relaxed space-y-2 sm:space-y-3 opacity-90 min-h-[100px] sm:min-h-[120px]">
          <SubprojectContentRenderer
            content={getSubprojectContent(mainEntity.id)}
          />
        </div>
        <button
          onClick={() => onEntityClick(mainEntity.id)}
          className="mt-5 sm:mt-6 w-full sm:w-auto bg-blue-950 text-white font-black text-xs sm:text-sm uppercase px-6 sm:px-8 py-3 rounded-full hover:bg-white hover:text-blue-950 hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          Detalhes e Fotos
        </button>
      </div>
    </div>
  );
};
