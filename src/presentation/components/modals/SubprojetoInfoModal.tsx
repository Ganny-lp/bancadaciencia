import React, { useState, useEffect } from "react";
import { entidadesData } from "../../config/homeConfig";
import {
  getSubprojectContent,
  getImageUrl,
} from "../../config/subprojectsContent";
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
  const [galeryIndex, setGaleryIndex] = useState(0);
  const galleryImages = [
    ...(getSubprojectContent(payload)?.galleryImages || []),
  ].reverse();

  // Auto-play slideshow a cada 5 segundos
  useEffect(() => {
    if (galleryImages.length === 0) return;

    const interval = setInterval(() => {
      setGaleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [galleryImages.length]);
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
              <div className="space-y-4 flex flex-col items-center">
                {/* Imagem Grande - Vertical (Instagram Post) */}
                <div className="w-full max-w-xs aspect-[3/4] bg-blue-950 rounded-xl border border-blue-800 overflow-hidden group">
                  {galleryImages && galleryImages.length > 0 ? (
                    <img
                      src={getImageUrl(galleryImages[galeryIndex])}
                      alt={`Galeria ${galeryIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-blue-800/50">
                      <span className="text-center">
                        Nenhuma imagem disponível
                      </span>
                    </div>
                  )}
                </div>

                {/* Miniaturas */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {galleryImages && galleryImages.length > 0 ? (
                    galleryImages.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setGaleryIndex(idx)}
                        className={`aspect-square rounded-lg border-2 overflow-hidden transition-all ${
                          galeryIndex === idx
                            ? "border-blue-400 ring-2 ring-blue-300"
                            : "border-blue-800 hover:border-blue-600"
                        }`}
                      >
                        <img
                          src={getImageUrl(img)}
                          alt={`Foto ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                        />
                      </button>
                    ))
                  ) : (
                    <div className="col-span-4 text-center text-blue-800/50 text-sm">
                      Sem imagens neste projeto
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
