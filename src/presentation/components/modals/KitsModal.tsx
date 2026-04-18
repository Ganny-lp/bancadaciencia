import React from "react";
import { Material } from "../../../domain/entities/Material";
import { MODAL_STYLES } from "../../config/modalStyles";

interface KitsModalProps {
  kits: Material[];
  onClose: () => void;
  onKitClick?: (kit: Material) => void;
}

export const KitsModal: React.FC<KitsModalProps> = ({ kits, onClose, onKitClick }) => {
  return (
      <div
          className={`${MODAL_STYLES.BACKDROP} ${MODAL_STYLES.BACKDROP_DARK} z-50 p-4 backdrop-blur-md overflow-y-auto`}
          onClick={onClose}
      >
        <div
            className={`${MODAL_STYLES.CARD_BASE} ${MODAL_STYLES.CARD_WHITE} max-h-[90vh] flex flex-col`}
            onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end sticky top-0 bg-white z-10 pb-2">
            <button
                onClick={onClose}
                className={`${MODAL_STYLES.CLOSE_BTN} hover:bg-gray-100 rounded-full p-2 transition-colors`}
                aria-label="Fechar"
            >
              &times;
            </button>
          </div>

          <div className="overflow-y-auto px-2 pb-4 -mx-2">
            {kits.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Nenhum kit disponível.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                  {kits.map((kit) => (
                      <button
                          key={kit.id}
                          onClick={() => onKitClick?.(kit)}
                          className="flex flex-col items-center group focus:outline-none focus:ring-2 focus:ring-banca-claro rounded-lg"
                          aria-label={`Ver detalhes do kit ${kit.name}`}
                      >
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl group-hover:border-banca-claro border-4 border-transparent transition-all duration-300">
                          <img
                              src={kit.coverImagePath}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              alt={kit.name}
                              loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <p className="mt-3 font-semibold text-sm sm:text-base text-gray-800 text-center group-hover:text-banca-azul transition-colors">
                          {kit.name}
                        </p>
                      </button>
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>
  );
};