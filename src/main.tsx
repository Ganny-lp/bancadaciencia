import React from "react";
import ReactDOM from "react-dom/client";

// Importa o seu CSS global (onde está o Tailwind e o fundo azul)
import "./index.css";

// Importa o Contexto dos Modais que criámos
import { ModalProvider } from "./presentation/contexts/ModalContext";

// Importa componentes de infraestrutura
import { ErrorBoundary } from "./presentation/components/ErrorBoundary";

// Importa a sua página principal
import { Home } from "./presentation/pages/Home";

// Esta é a função que "injeta" o React na div id="root" do index.html
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ModalProvider>
        <Home />
      </ModalProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
