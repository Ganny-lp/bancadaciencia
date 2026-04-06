import React from "react";
import { Material } from "../../../domain/entities/Material";
import { MODAL_STYLES } from "../../config/modalStyles";

interface KitsModalProps {
  kits: Material[];
  onClose: () => void;
}

export const KitsModal: React.FC<KitsModalProps> = ({ kits, onClose }) => {
  return (
    <div
      className={`${MODAL_STYLES.BACKDROP} ${MODAL_STYLES.BACKDROP_DARK} z-50 p-4 backdrop-blur-md`}
    >
      <div className={`${MODAL_STYLES.CARD_BASE} ${MODAL_STYLES.CARD_WHITE}`}>
        <button onClick={onClose} className={MODAL_STYLES.CLOSE_BTN}>
          &times;
        </button>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 mt-6">
          {kits.map((kit) => (
            <button
              key={kit.id}
              onClick={() => {}} // será tratado pelo parent
              className="flex flex-col items-center group"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl group-hover:border-banca-claro border-4 border-transparent transition-all">
                <img
                  src={kit.coverImagePath}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={kit.name}
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <p className="mt-3 font-semibold text-sm sm:text-base text-gray-700 text-center">
                {kit.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
