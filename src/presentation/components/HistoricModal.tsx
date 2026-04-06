import React from "react";

interface HistoricModalProps {
  onClose: () => void;
  onEmailClick: () => void;
}

export const HistoricModal: React.FC<HistoricModalProps> = ({
  onClose,
  onEmailClick,
}) => {
  return (
    <div className="fixed inset-0 bg-banca-escuro/70 z-[199] flex items-center justify-center p-4">
      <div className="relative w-full max-w-[700px] bg-blue-950 rounded-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-3xl text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="text-banca-escuro mt-4 sm:mt-0 text-sm sm:text-base">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Histórico</h2>
          <p className="mb-4 leading-relaxed">
            O projeto Banca da Ciência da Escola de Artes, Ciências e
            Humanidades da Universidade de São Paulo (EACH-USP) surgiu em meados
            de 2010...
          </p>
          <h3 className="text-base sm:text-lg font-semibold mt-4 mb-2">
            Temas abordados
          </h3>
          <p>
            Experimentos de baixo custo, com explicações didáticas e propagação
            da ciência.
          </p>
          <h3 className="text-base sm:text-lg font-semibold mt-4 mb-2">
            Público Alvo
          </h3>
          <p>
            Todos os públicos, contudo principalmente e mais frequentemente
            voltado ao público infantojuvenil.
          </p>
          <h3 className="text-base sm:text-lg font-semibold mt-4 mb-2">
            Apresentações
          </h3>
          <p>
            São realizadas em escolas e na EACH-USP, a partir de solicitações.
          </p>
          <h3 className="text-base sm:text-lg font-semibold mt-4 mb-2">
            Formas de entrar em contato
          </h3>
          <p>
            <strong>E-mail:</strong>{" "}
            <button
              onClick={onEmailClick}
              className="text-blue-600 underline hover:text-blue-800 break-all"
            >
              bancadacienciausp@gmail.com
            </button>
          </p>
          <p>
            <strong>Celular (Monitora Chelsee):</strong> +55 11 99602-2662
          </p>
          <p>
            <strong>Celular (Monitora Samara):</strong> +55 11 97107-2398
          </p>
          <p>
            <strong>Celular (Monitor Lukas):</strong> +55 11 96131-1112
          </p>
        </div>
      </div>
    </div>
  );
};
