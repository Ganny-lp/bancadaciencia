import React, { useState } from "react";
import { useAccessibility } from "../hooks/useAccessibility";

export const AccessibilityToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    settings,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleReduceMotion,
    resetSettings,
  } = useAccessibility();

  return (
    <div className="fixed bottom-4 right-4" style={{ zIndex: 9998 }}>
      {/* Botão de toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-full shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
        aria-label="Abrir ferramentas de acessibilidade"
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>

      {/* Painel de acessibilidade */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white text-gray-800 rounded-lg shadow-2xl p-4 w-80 max-w-[calc(100vw-2rem)] animate-fade-in-scale">
          <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Acessibilidade
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
              aria-label="Fechar ferramentas de acessibilidade"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Tamanho da Fonte */}
            <div>
              <label className="text-sm font-semibold mb-2 block">
                Tamanho da Fonte
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseFontSize}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded font-bold transition focus:ring-2 focus:ring-yellow-400"
                  aria-label="Diminuir tamanho da fonte"
                  disabled={settings.fontSize <= 80}
                >
                  A-
                </button>
                <span className="flex-1 text-center font-semibold bg-gray-100 py-2 rounded">
                  {settings.fontSize}%
                </span>
                <button
                  onClick={increaseFontSize}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded font-bold transition focus:ring-2 focus:ring-yellow-400"
                  aria-label="Aumentar tamanho da fonte"
                  disabled={settings.fontSize >= 150}
                >
                  A+
                </button>
                <button
                  onClick={resetFontSize}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition focus:ring-2 focus:ring-yellow-400"
                  aria-label="Resetar tamanho da fonte"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Alto Contraste */}
            <div className="flex items-center justify-between">
              <label htmlFor="high-contrast" className="text-sm font-semibold">
                Alto Contraste
              </label>
              <button
                id="high-contrast"
                onClick={toggleHighContrast}
                role="switch"
                aria-checked={settings.highContrast}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition focus:ring-2 focus:ring-yellow-400 border-2 ${
                  settings.highContrast
                    ? "bg-black border-white"
                    : "bg-gray-400 border-gray-400"
                }`}
              >
                <span
                  className={`absolute left-1 text-[9px] font-bold transition-opacity ${
                    settings.highContrast
                      ? "opacity-100 text-white"
                      : "opacity-0"
                  }`}
                >
                  ON
                </span>
                <span
                  className={`absolute right-1 text-[9px] font-bold transition-opacity ${
                    !settings.highContrast
                      ? "opacity-100 text-white"
                      : "opacity-0"
                  }`}
                >
                  OFF
                </span>
                <span
                  className={`inline-block h-5 w-5 transform rounded-full transition border-2 ${
                    settings.highContrast
                      ? "translate-x-7 bg-white border-white"
                      : "translate-x-1 bg-white border-gray-400"
                  }`}
                />
              </button>
            </div>

            {/* Reduzir Movimento */}
            <div className="flex items-center justify-between">
              <label htmlFor="reduce-motion" className="text-sm font-semibold">
                Reduzir Animações
              </label>
              <button
                id="reduce-motion"
                onClick={toggleReduceMotion}
                role="switch"
                aria-checked={settings.reduceMotion}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition focus:ring-2 focus:ring-yellow-400 border-2 ${
                  settings.reduceMotion
                    ? "bg-black border-white"
                    : "bg-gray-400 border-gray-400"
                }`}
              >
                <span
                  className={`absolute left-1 text-[9px] font-bold transition-opacity ${
                    settings.reduceMotion
                      ? "opacity-100 text-white"
                      : "opacity-0"
                  }`}
                >
                  ON
                </span>
                <span
                  className={`absolute right-1 text-[9px] font-bold transition-opacity ${
                    !settings.reduceMotion
                      ? "opacity-100 text-white"
                      : "opacity-0"
                  }`}
                >
                  OFF
                </span>
                <span
                  className={`inline-block h-5 w-5 transform rounded-full transition border-2 ${
                    settings.reduceMotion
                      ? "translate-x-7 bg-white border-white"
                      : "translate-x-1 bg-white border-gray-400"
                  }`}
                />
              </button>
            </div>

            {/* Botão de Reset */}
            <button
              onClick={resetSettings}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded font-semibold transition focus:ring-2 focus:ring-yellow-400 mt-4"
            >
              Restaurar Padrões
            </button>
          </div>

          {/* Informação */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              Use estas ferramentas para ajustar a visualização do site às suas
              necessidades.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
