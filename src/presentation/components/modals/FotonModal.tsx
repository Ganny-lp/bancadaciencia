import React from "react";
import clsx from "clsx";
import { useFullscreen } from "../../hooks/useFullscreen";
import { MODAL_STYLES } from "../../config/modalStyles";

interface FotonModalProps {
  fotonUrl: string;
  onClose: () => void;
}

export const FotonModal: React.FC<FotonModalProps> = ({
  fotonUrl,
  onClose,
}) => {
  const { isFullscreen, toggleFullscreen } = useFullscreen(onClose);

  const containerClass = clsx(
    "bg-white flex flex-col relative overflow-hidden",
    isFullscreen
      ? "w-screen h-[100dvh]"
      : "rounded-2xl sm:rounded-3xl max-w-6xl w-full h-[95dvh] sm:h-[90dvh] shadow-2xl",
  );

  return (
    <div
      className={`${MODAL_STYLES.BACKDROP} ${MODAL_STYLES.BACKDROP_DARK} z-100`}
    >
      <div className={containerClass}>
        <div className="flex justify-end gap-2 p-2 sm:p-4 absolute top-0 left-0 right-0 z-50 pointer-events-none">
          <button
            onClick={toggleFullscreen}
            className="pointer-events-auto bg-blue-600/90 text-white w-10 h-10 rounded-full flex items-center justify-center"
          >
            {isFullscreen ? "R" : "F"}
          </button>
          <button
            onClick={onClose}
            className="pointer-events-auto bg-white/60 text-gray-700 rounded-full w-10 h-10 text-2xl"
          >
            &times;
          </button>
        </div>
        {!isFullscreen && (
          <div className="shrink-0 p-4 sm:p-8 bg-blue-50 border-b-4 border-banca-claro pt-14 sm:pt-16">
            <p className="text-[#0c3d7a] text-center text-xs sm:text-base md:text-lg font-medium">
              Esta atividade interativa apresenta um{" "}
              <strong>storytelling envolvente sobre óptica</strong>.
            </p>
          </div>
        )}
        <div className="flex-1 w-full min-h-0 relative bg-black">
          <iframe
            src={fotonUrl}
            className="absolute inset-0 w-full h-full border-none"
            title="Fóton"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
