import React from "react";
import { entidadesData } from "../../config/homeConfig";
import { MODAL_STYLES } from "../../config/modalStyles";

interface SubprojetosModalProps {
  onClose: () => void;
  onSelectSubproject: (id: string) => void;
}

export const SubprojetosModal: React.FC<SubprojetosModalProps> = ({
  onClose,
  onSelectSubproject,
}) => {
  return (
    <div
      className={`${MODAL_STYLES.BACKDROP} bg-banca-escuro/90 z-50 p-4`}
      onClick={onClose}
    >
      <div
        className={`${MODAL_STYLES.CARD_BASE} ${MODAL_STYLES.CARD_WHITE}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className={MODAL_STYLES.CLOSE_BTN}>
          &times;
        </button>
        <h2 className="text-2xl font-black text-banca-escuro mb-6 text-center">
          Conheça nossas Entidades
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
          {entidadesData.map((sub) => (
            <button
              key={sub.id}
              onClick={() => {
                onSelectSubproject(sub.id);
                onClose();
              }}
              className="p-4 sm:p-6 bg-gray-100 rounded-2xl font-black text-xs sm:text-base text-banca-escuro hover:bg-banca-claro hover:text-white transition-all"
            >
              {sub.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
