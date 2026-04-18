import React, { useState, useRef, useEffect } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // TAMANHO BLINDADO: 1100x800 é o espaço ideal para o p5.js não engolir os próprios botões.
  // Nunca mudamos isso, apenas aplicamos o zoom (scale).
  const SAFE_WIDTH = 1100;
  const SAFE_HEIGHT = 800;

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;

        // Calcula a redução necessária para caber exatamente na tela, centralizado.
        const newScale = Math.min(width / SAFE_WIDTH, height / SAFE_HEIGHT);
        setScale(newScale);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!embedUrl) return null;

  const modalClass = isFullscreen
      ? "bg-black w-screen h-[100dvh] flex flex-col"
      : "bg-zinc-950 rounded-2xl sm:rounded-3xl max-w-6xl w-[95vw] h-[90dvh] flex flex-col shadow-2xl overflow-hidden border border-zinc-800";

  return (
      <div
          className={`fixed inset-0 bg-black/95 z-[200] flex items-center justify-center transition-all ${
              isFullscreen ? "" : "p-2 sm:p-4"
          }`}
          onClick={onClose}
      >
        <div className={modalClass} onClick={(e) => e.stopPropagation()}>

          {/* HEADER */}
          <div className="flex justify-end gap-3 p-3 bg-zinc-900 border-b border-zinc-800 shrink-0 z-10">
            <button
                onClick={() => onFullscreenChange(!isFullscreen)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg px-4 py-2 transition-colors text-sm font-medium"
            >
              {isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
            </button>
            <button
                onClick={onClose}
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 transition-colors text-sm font-medium"
            >
              Fechar
            </button>
          </div>

          {/* ÁREA DO IFRAME: Mantém tudo perfeitamente centralizado */}
          <div
              ref={containerRef}
              className="flex-1 w-full bg-black relative overflow-hidden flex items-center justify-center"
          >
            {/* A CAIXA FORTE: O iframe sempre achará que está num monitor grande */}
            <div
                style={{
                  width: `${SAFE_WIDTH}px`,
                  height: `${SAFE_HEIGHT}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: "center center",
                }}
                className="relative flex-shrink-0"
            >
              <iframe
                  src={embedUrl}
                  title="Visualização"
                  className="absolute inset-0 w-full h-full border-none"
                  scrolling="no"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
              />
            </div>
          </div>

        </div>
      </div>
  );
};