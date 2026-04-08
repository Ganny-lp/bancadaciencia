import React, { useEffect } from "react";

export const VLibrasWidget = () => {
    useEffect(() => {
        // Verifica se o script já foi adicionado para não duplicar
        const existingScript = document.getElementById("vlibras-script");
        if (existingScript) return;

        // Cria o script do VLibras dinamicamente
        const script = document.createElement("script");
        script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
        script.id = "vlibras-script";
        script.async = true;

        // Assim que baixar o script, ele inicia o bonequinho
        script.onload = () => {
            // @ts-expect-error: O window.VLibras é injetado pelo script externo
            if (window.VLibras) {
                // @ts-expect-error: O window.VLibras é injetado pelo script externo
                new window.VLibras.Widget("https://vlibras.gov.br/app");
            }
        };

        document.body.appendChild(script);
    }, []);

    return (
        /* O truque {...{ atributo: "valor" }} engana o TypeScript de forma segura,
          permitindo que passemos os atributos customizados do VLibras sem erros.
        */
        <div {...{ vw: "true" }} className="enabled">
            <div {...{ "vw-access-button": "true" }} className="active"></div>
            <div {...{ "vw-plugin-wrapper": "true" }}>
                <div className="vw-plugin-top-wrapper"></div>
            </div>
        </div>
    );
};