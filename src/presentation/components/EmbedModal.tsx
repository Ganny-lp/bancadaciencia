import React, { useState, useRef, useEffect } from "react";
import { GetExternalLinksUseCase } from "../../domain/usecases/GetExternalLinksUseCase";

interface EmbedModalProps {
  embedUrl: string | null;
  onClose: () => void;
  isFullscreen: boolean;
  onFullscreenChange: (value: boolean) => void;
}

// Inicialização fora do componente
const links = new GetExternalLinksUseCase().execute();

// Estas são as dimensões onde o site interno "respira" bem sem os elementos colidirem.
// Se notar que os elementos do p5.js ainda estão próximos, basta aumentar o TARGET_WIDTH.
const TARGET_WIDTH = 1100;
const TARGET_HEIGHT = 800;

export const EmbedModal: React.FC<EmbedModalProps> = ({
                                                        embedUrl,
                                                        onClose,
                                                        isFullscreen,
                                                        onFullscreenChange,
                                                      }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Pega o tamanho REAL e ATUAL da área preta disponível na tela
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;

        // Calcula a proporção exata para caber na tela sem distorcer (object-fit: contain)
        const scaleX = width / TARGET_WIDTH;
        const scaleY = height / TARGET_HEIGHT;

        // Aplica o menor fator de escala para garantir que nada seja cortado
        setScale(Math.min(scaleX, scaleY));
      }
    });

    resizeObserver.observe(wrapperRef.current);
    return () => resizeObserver.disconnect();
  }, [isFullscreen]); // Re-calcula se o usuário clicar no botão de tela cheia

  if (!embedUrl) return null;

  const containerClass = isFullscreen
      ? "bg-black w-screen h-[100dvh] flex flex-col"
      : "bg-zinc-950 rounded-2xl sm:rounded-3xl max-w-6xl w-[95vw] h-[90dvh] flex flex-col shadow-2xl overflow-hidden border border-zinc-800";

  return (
      <div
          className={`fixed inset-0 bg-black/90 z-[200] flex items-center justify-center transition-all ${
              isFullscreen ? "" : "p-2 sm:p-4"
          }`}
          onClick={onClose}
      >
        <div className={containerClass} onClick={(e) => e.stopPropagation()}>

          {/* CABEÇALHO */}
          <div className="flex justify-end gap-3 p-3 bg-zinc-900 border-b border-zinc-800 z-50 shrink-0 relative">
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

          {/* ÁREA DO IFRAME (Onde a mágica acontece) */}
          <div
              ref={wrapperRef}
              className="flex-1 w-full bg-black relative overflow-hidden"
          >
            {/* O SEGREDO DESTA SOLUÇÃO ESTÁ AQUI:
            1. position: absolute + top: 50% + left: 50% garante que o ponto central do iframe
               fique EXATAMENTE no meio da tela, ignorando margins e padding do React.
            2. translate(-50%, -50%) corrige o eixo, centralizando perfeitamente.
            3. scale() aplica o zoom out sem criar Bounding Boxes fantasmas na tela.
          */}
            <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: `${TARGET_WIDTH}px`,
                  height: `${TARGET_HEIGHT}px`,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  transformOrigin: "center center",
                }}
            >
              <iframe
                  src={embedUrl}
                  title="Visualização"
                  className="w-full h-full border-none pointer-events-auto"
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