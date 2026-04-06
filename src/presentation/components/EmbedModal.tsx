import React, { useState } from "react";
import { GetExternalLinksUseCase } from "../../domain/usecases/GetExternalLinksUseCase";

interface EmbedModalProps {
  embedUrl: string | null;
  onClose: () => void;
  isFullscreen: boolean;
  onFullscreenChange: (value: boolean) => void;
}

const links = new GetExternalLinksUseCase().execute();

export const EmbedModal: React.FC<EmbedModalProps> = ({
  embedUrl,
  onClose,
  isFullscreen,
  onFullscreenChange,
}) => {
  if (!embedUrl) return null;

  const containerClass = isFullscreen
    ? "bg-black w-screen h-[100dvh] flex flex-col relative overflow-hidden"
    : "bg-black rounded-2xl sm:rounded-3xl max-w-6xl w-full h-[95dvh] sm:h-[90dvh] flex flex-col relative overflow-hidden shadow-2xl";

  return (
    <div
      className={`fixed inset-0 bg-black/90 z-[200] flex items-center justify-center ${
        isFullscreen ? "" : "p-2 sm:p-4"
      }`}
      onClick={onClose}
    >
      <div className={containerClass} onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-end gap-2 p-2 sm:p-4 absolute top-0 left-0 right-0 z-50 pointer-events-none">
          <button
            onClick={() => onFullscreenChange(!isFullscreen)}
            className="pointer-events-auto bg-blue-600/90 hover:bg-blue-800 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors"
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? "R" : "F"}
          </button>
          <button
            onClick={onClose}
            className="pointer-events-auto bg-red-600/90 hover:bg-red-800 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl shadow-lg transition-colors"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 w-full min-h-0 relative">
          <iframe
            src={embedUrl}
            title="Visualização"
            className="absolute inset-0 w-full h-full border-none"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
