import React, { useEffect } from "react";

export const VLibrasWidget = () => {
  useEffect(() => {
    // Separei a inicialização em uma função para podermos chamar em dois cenários
    const initVLibras = () => {
      // @ts-expect-error: O window.VLibras é injetado pelo script externo
      if (window.VLibras) {
        // @ts-expect-error: O window.VLibras é injetado pelo script externo
        new window.VLibras.Widget("https://vlibras.gov.br/app");
      }
    };

    const existingScript = document.getElementById("vlibras-script");

    if (existingScript) {
      // Se o script já existe (ex: você mudou de página e voltou, ou o Strict Mode rodou),
      // apenas reinicializa o widget para as novas divs recém-renderizadas.
      initVLibras();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.id = "vlibras-script";
    script.async = true;

    // Assim que baixar o script na primeira vez, inicia
    script.onload = initVLibras;

    document.body.appendChild(script);
  }, []);

  return (
      <div {...{ vw: "true" }} className="enabled" style={{ zIndex: 9999 }}>
        <div {...{ "vw-access-button": "true" }} className="active"></div>
        <div {...{ "vw-plugin-wrapper": "true" }}>
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>
  );
};