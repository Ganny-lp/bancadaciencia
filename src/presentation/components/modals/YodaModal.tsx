import React from "react";
import clsx from "clsx";
import { useFullscreen } from "../../hooks/useFullscreen";
import { MODAL_STYLES } from "../../config/modalStyles";

interface YodaModalProps {
  yodaUrl: string;
  onClose: () => void;
}

export const YodaModal: React.FC<YodaModalProps> = ({ yodaUrl, onClose }) => {
  const { isFullscreen, toggleFullscreen } = useFullscreen(onClose);

  const containerClass = clsx(
    "bg-black flex flex-col relative overflow-hidden",
    isFullscreen
      ? "w-screen h-[100dvh]"
      : "rounded-2xl sm:rounded-3xl max-w-6xl w-full h-[95dvh] sm:h-[90dvh] shadow-2xl",
  );

  return (
    <div
      className={`${MODAL_STYLES.BACKDROP} bg-black/90 z-200`}
      onClick={onClose}
    >
      <div className={containerClass} onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-2 right-2 flex gap-2 z-50 pointer-events-none">
          <button
            onClick={toggleFullscreen}
            className="pointer-events-auto bg-blue-600/90 text-white px-3 py-1.5 rounded text-xs"
          >
            {isFullscreen ? "Reduzir" : "Tela Cheia"}
          </button>
          <button
            onClick={() => window.open(yodaUrl, "_blank")}
            className="pointer-events-auto bg-gray-700 text-white px-3 py-1.5 rounded text-xs"
          >
            Nova Aba
          </button>
          <button
            onClick={onClose}
            className="pointer-events-auto bg-red-600/90 text-white px-3 py-1.5 rounded text-xs"
          >
            Fechar
          </button>
        </div>
        <div className="flex-1 w-full min-h-0">
          <iframe
            src={yodaUrl}
            title="Simulador Jedi Archive"
            className="absolute inset-0 w-full h-full border-none"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
