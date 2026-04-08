// VLibrasWidget.tsx - Versão mais robusta contra FOUC usando inline styles

import React, { useEffect, useState } from "react";

export const VLibrasWidget = () => {
    // Estado para rastrear o estado de carregamento e posicionamento
    // Começa como 'loading' (carregando/invisível), muda para 'ready' para fade-in
    const [loadingState, setLoadingState] = useState<'loading' | 'ready'>('loading');

    useEffect(() => {
        // 1. Verificação de Script Duplicado
        const existingScript = document.getElementById("vlibras-script");
        if (existingScript) return;

        // 2. Criação do Script
        const script = document.createElement("script");
        script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
        script.id = "vlibras-script";
        script.async = true;

        script.onload = () => {
            // 3. Inicialização e Monitoramento de Posicionamento
            // @ts-expect-error: O window.VLibras é injetado pelo script externo
            if (window.VLibras) {
                // @ts-expect-error: O window.VLibras é injetado pelo script externo
                new window.VLibras.Widget("https://vlibras.gov.br/app");

                // O widget final é injetado no body, não gerenciado por React.
                // Nós apenas precisamos de um pequeno atraso para o script posicionar o botão.
                // Efeito visual mais robusto do que apenas onload.
                setTimeout(() => setLoadingState('ready'), 350);
            }
        };

        document.body.appendChild(script);

        // 4. Limpeza (opcional, mas boa prática no unmount)
        return () => {
            const scriptToClean = document.getElementById("vlibras-script");
            if (scriptToClean) document.body.removeChild(scriptToClean);
        };
    }, []);

    // Definição do estilo em linha para garantir ocultação absoluta imediata (antes de Tailwind carregar)
    const initialHiddenStyle = {
        opacity: 0,
        pointerEvents: 'none' as 'none',
        transition: 'opacity 0.75s ease-in-out', // Efeito de fade suave e controlado
    };

    // Aplicação do estilo final com base no estado de carregamento
    const currentStyle = {
        ...initialHiddenStyle,
        opacity: loadingState === 'ready' ? 1 : 0,
    };

    return (
        // Contêiner principal <div vw>, React controla este elemento.
        // Usamos style={{...}} para garantir que a opacidade 0 seja aplicada imediatamente,
        // garantindo que ABSOLUTAMENTE NADA do widget (incluindo o botão placeholder) seja visível.
        <div
            {...{ vw: "true" }}
            className="enabled"
            style={currentStyle} // Controlamos a visibilidade e o fade-in via inline style
        >
            {/* Marcador para o botão de acesso com todos os estilos de design desejados */}
            <div
                {...{ "vw-access-button": "true" }}
                className="active bg-slate-900 rounded-full shadow-2xl ring-4 ring-slate-900/30 hover:scale-110 transition-transform duration-300"
            ></div>
            {/* Plugin wrapper para o conteúdo 3D */}
            <div {...{ "vw-plugin-wrapper": "true" }}>
                <div className="vw-plugin-top-wrapper"></div>
            </div>
        </div>
    );
};