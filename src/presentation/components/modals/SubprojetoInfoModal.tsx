import React from "react";
import { entidadesData } from "../../config/homeConfig";
import { getSubprojectContent, getImageUrl } from "../../config/subprojectsContent";
import { SubprojectContentRenderer } from "../SubprojectContentRenderer";
import { MODAL_STYLES } from "../../config/modalStyles";

interface SubprojetoInfoModalProps {
  payload: string;
  onClose: () => void;
}

export const SubprojetoInfoModal: React.FC<SubprojetoInfoModalProps> = ({
  payload,
  onClose,
}) => {
  return (
    <div
      className={`${MODAL_STYLES.BACKDROP} ${MODAL_STYLES.BACKDROP_DARK} z-60 p-4`}
      onClick={onClose}
    >
      <div
        className="bg-[#032a4c] text-[#e1f0ff] rounded-2xl sm:rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col relative shadow-2xl border border-blue-500/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`${MODAL_STYLES.HEADER} border-blue-800 bg-banca-escuro`}
        >
          <h2 className={`${MODAL_STYLES.HEADER_TITLE} text-white`}>
            {entidadesData.find((e) => e.id === payload)?.name || payload}
          </h2>
          <button onClick={onClose} className={MODAL_STYLES.CLOSE_BTN_DARK}>
            &times;
          </button>
        </div>
        <div className={MODAL_STYLES.CONTENT_SCROLL}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6">
              <div className="text-sm sm:text-lg leading-relaxed bg-blue-900/20 p-5 sm:p-6 rounded-2xl border border-blue-500/20">
                <SubprojectContentRenderer
                  content={getSubprojectContent(payload)}
                />
              </div>
              <div className="bg-blue-950/50 p-5 sm:p-6 rounded-2xl border border-blue-800/50 text-sm sm:text-base opacity-80">
                <p>
                  <strong>Mais detalhes:</strong> Aqui você pode incluir os
                  links de inscrição, horários detalhados, professores
                  responsáveis ou o histórico específico deste braço do projeto.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg sm:text-xl text-blue-200">
                Galeria de Ações
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[1, 2, 3, 4].map((fotoIndex) => (
                  <div
                    key={fotoIndex}
                    className="aspect-square bg-blue-950 rounded-xl border border-blue-800 flex items-center justify-center overflow-hidden group"
                  >
                    {fotoIndex === 1 ? (
                      <img
                        src={
                          getImageUrl(
                            getSubprojectContent(payload)?.profileImage
                          ) ||
                          entidadesData.find((e) => e.id === payload)?.src
                        }
                        alt="Galeria"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-blue-800/50 font-black text-xs sm:text-sm">
                        FOTO {fotoIndex}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
