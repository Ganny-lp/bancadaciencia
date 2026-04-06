import React from "react";
import { MODAL_STYLES } from "../../config/modalStyles";

interface PressaoModalProps {
  onClose: () => void;
}

export const PressaoModal: React.FC<PressaoModalProps> = ({ onClose }) => {
  const handleVerify = () => {
    const val = (document.getElementById("ex-pressao") as HTMLInputElement)
      .value;
    alert(
      val === "2" ? "Correto! 1 atm (ar) + 1 atm (água)" : "Tente novamente!",
    );
  };

  return (
    <div
      className={`${MODAL_STYLES.BACKDROP} ${MODAL_STYLES.BACKDROP_DARK} z-100 p-2 sm:p-4`}
    >
      <div
        className={`bg-[#e1f0ff] p-4 sm:p-8 rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto relative text-banca-escuro shadow-2xl`}
      >
        <button onClick={onClose} className={MODAL_STYLES.CLOSE_BTN}>
          &times;
        </button>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-0">
          <div className="flex flex-col items-center w-full">
            <h2 className="text-xl sm:text-2xl font-black mb-4 uppercase text-center">
              Simulador de Pressão
            </h2>
            <iframe
              src="https://scratch.mit.edu/projects/1239452553/embed"
              className="rounded-xl shadow-lg w-full aspect-video max-w-sm"
              allowFullScreen
            />
          </div>
          <div className="space-y-4">
            <h3 className="font-bold border-b border-blue-300 pb-2">
              Desafio de Física
            </h3>
            <p className="text-sm">
              Sabendo que a cada 10m de profundidade a pressão aumenta 1 atm,
              responda:
            </p>
            <div className="bg-white p-4 rounded-xl shadow-inner">
              <p className="text-sm font-semibold">
                Qual a pressão total a 10m de profundidade?
              </p>
              <input
                type="number"
                id="ex-pressao"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
                placeholder="Resposta em atm..."
              />
              <button
                onClick={handleVerify}
                className="mt-3 bg-blue-600 text-white px-4 py-1.5 rounded text-sm w-full hover:bg-blue-700 transition-colors"
              >
                Verificar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
