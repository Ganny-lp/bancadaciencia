import { useState, useEffect } from 'react';

export function App() {
    // ==========================================
    // 1. LINKS E ROTAS
    // ==========================================
    const links = {
        aexestrela: 'https://rjfontana.github.io/aexestrela/',
        planos: 'https://drive.google.com/open?id=1Fs-_Z4sTOSYsWpz6V6cw3NhHeOr98As4&usp=drive_copy',
        fazenda: 'https://rjfontana.github.io/fazenda/',
        alimentos: 'https://rjfontana.github.io/alimentos/',
        onda: 'https://rjfontana.github.io/-adivinhacao.py/',
        telescopio: 'https://rjfontana.github.io/Telescopio/'
    };

    // ==========================================
    // 2. ESTADO GLOBAL DE MODAIS (Qual está aberto?)
    // ==========================================
    // Guarda o nome do modal aberto ('kits', 'foton', 'pressao', 'historico', etc)
    const [activeModal, setActiveModal] = useState<string | null>(null);

    // Guarda as URLs dos iframes se algum botão for clicado
    const [embedUrl, setEmbedUrl] = useState<string | null>(null);
    const [ondaUrl, setOndaUrl] = useState<string | null>(null);

    // Função facilitadora para fechar qualquer modal
    const closeModal = () => setActiveModal(null);

    // ==========================================
    // 3. LÓGICA DO BOI (Subprojetos)
    // ==========================================
    const [isHoveringBoi, setIsHoveringBoi] = useState(false);
    const [dialogIndex, setDialogIndex] = useState(0);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (isHoveringBoi) {
            setDialogIndex(0);
            timer = setInterval(() => setDialogIndex((prev) => (prev + 1) % 3), 6000);
        }
        return () => clearInterval(timer);
    }, [isHoveringBoi]);

    // ==========================================
    // 4. LÓGICA DO QUIZ DE PRESSÃO
    // ==========================================
    const [ex1Open, setEx1Open] = useState(false);
    const [ex2Open, setEx2Open] = useState(false);
    const [ex5Open, setEx5Open] = useState(false);

    const [ex3Value, setEx3Value] = useState('');
    const [ex3Result, setEx3Result] = useState<{show: boolean, correct: boolean} | null>(null);

    const [p0, setP0] = useState('');
    const [p10, setP10] = useState('');
    const [p20, setP20] = useState('');
    const [p30, setP30] = useState('');
    const [ex4Result, setEx4Result] = useState<{show: boolean, correct: boolean} | null>(null);

    const checkEx3 = () => setEx3Result({ show: true, correct: parseFloat(ex3Value) === 2 });
    const checkEx4 = () => {
        const correct = p0 === '1' && p10 === '2' && p20 === '3' && p30 === '4';
        setEx4Result({ show: true, correct });
    };

    return (
        <div>
            {/* ========================================== */}
            {/* MENU SUPERIOR (Os botões principais)       */}
            {/* ========================================== */}
            <div className="top-buttons">
                <button className="btn-kits" onClick={() => setActiveModal('kits')}><img src="./images/pasta.png" alt="Pasta" className="icon" /></button>
                <button className="btn-aexestrela" onClick={() => setEmbedUrl(links.aexestrela)}><img src="./images/aexestrela.png" alt="Aexestrela" className="icon" /></button>
                <button className="btn-planos" onClick={() => window.open(links.planos, '_blank')}><img src="./images/planos.png" alt="Planos" className="icon" /></button>
                <button className="btn-fazenda" onClick={() => setEmbedUrl(links.fazenda)}><img src="./images/fazenda.png" alt="Fazenda" className="icon" /></button>
                <button className="btn-alimentos" onClick={() => setEmbedUrl(links.alimentos)}><img src="./images/alimentos.png" alt="Alimentos" className="icon" /></button>
                <button className="btn-olho" onClick={() => setOndaUrl(links.onda)}><img src="./images/olho.png" alt="Onda" className="icon" /></button>
                <button className="btn-telescopio" onClick={() => setEmbedUrl(links.telescopio)}><img src="./images/telescopio.png" alt="Telescópio" className="icon" /></button>
                <button className="btn-foton" onClick={() => setActiveModal('foton')}><img src="./images/foton.png" alt="Foton" className="icon" /></button>
                <button className="btn-pressao" onClick={() => setActiveModal('pressao')}><img src="./images/pressao.png" alt="Pressão" className="icon" /></button>
                {/* Adicione o botão do Yoda aqui se for abrir o simulador React */}
            </div>

            {/* ========================================== */}
            {/* BOTÕES FLUTUANTES (Histórico e Boi)        */}
            {/* ========================================== */}
            <button id="btnEachOfficial" onClick={() => setActiveModal('historico')}></button>

            <button
                id="btnSubprojetos"
                style={{ position: 'fixed', bottom: '0px', left: '0px', width: '260px', height: '260px', border: 'none', background: 'transparent', cursor: 'pointer', zIndex: 100 }}
                onMouseEnter={() => setIsHoveringBoi(true)}
                onMouseLeave={() => setIsHoveringBoi(false)}
                onClick={() => setActiveModal('subprojetos')}
            >
                <img src="./images/subprojetos.png" alt="Subprojetos" style={{ width: '100%', height: '100%' }} />
            </button>

            {/* Balões do Boi */}
            {isHoveringBoi && (
                <div className="dialog-images active" style={{ opacity: 1, visibility: 'visible' }}>
                    <img src={`./images/dialogo${dialogIndex + 1}.png`} alt={`Diálogo`} className="dialog-img active" />
                </div>
            )}

            {/* ========================================== */}
            {/* MODAIS DE IFRAME (Abrem os projetos web)   */}
            {/* ========================================== */}
            {embedUrl && (
                <div id="alimentosEmbed" style={{ display: 'flex' }} onClick={() => setEmbedUrl(null)}>
                    <div className="embed-box" onClick={(e) => e.stopPropagation()}>
                        <div className="embed-buttons">
                            <button id="btnOpenNewTab" onClick={() => window.open(embedUrl, '_blank')}>Abrir em nova aba</button>
                            <button id="btnCloseAlimentosEmbed" onClick={() => setEmbedUrl(null)}>Fechar</button>
                        </div>
                        <iframe id="embedFrame" src={embedUrl} width="100%" height="100%" frameBorder="0"></iframe>
                    </div>
                </div>
            )}

            {ondaUrl && (
                <div id="ondaWebcam" style={{ display: 'flex' }} onClick={() => setOndaUrl(null)}>
                    <div className="webcam-box" onClick={(e) => e.stopPropagation()}>
                        <button id="btnCloseOndaWebcam" onClick={() => setOndaUrl(null)}>Fechar</button>
                        <iframe id="ondaFrame" src={ondaUrl} allow="camera; microphone" width="100%" height="100%" frameBorder="0"></iframe>
                    </div>
                </div>
            )}

            {/* ========================================== */}
            {/* MODAIS NORMAIS (Exibem as caixas de texto) */}
            {/* ========================================== */}

            {/* MODAL KITS */}
            {activeModal === 'kits' && (
                <div className="modal-kits active" onClick={closeModal}>
                    <button className="close-modal active" onClick={closeModal}>&times;</button>
                    <div className="grid-kits" onClick={(e) => e.stopPropagation()}>
                        <button className="btn-product" onClick={() => window.open('https://drive.google.com/open?id=1M2DqNLRhIiYUpJrwgIGUp3EzCHnQiiF1&usp=drive_copy', '_blank')}><img src="./images/1.png" alt="Produto 1"/></button>
                        <button className="btn-product" onClick={() => window.open('https://drive.google.com/open?id=1adsBLjzVkk9sVxcsqBaaL-czQJY7pbR6&usp=drive_copy', '_blank')}><img src="./images/2.png" alt="Produto 2"/></button>
                        <button className="btn-product" onClick={() => window.open('https://drive.google.com/open?id=1hKsgNkKZ9g8Gp_9XzyEPCQjzBWXt5Gw5&usp=drive_copy', '_blank')}><img src="./images/3.png" alt="Produto 3"/></button>
                        {/* Você pode colar o restante dos botões de Kits aqui dentro */}
                    </div>
                </div>
            )}

            {/* MODAL HISTÓRICO */}
            {activeModal === 'historico' && (
                <div className="modal-historico active" onClick={closeModal}>
                    <div className="historico-box" onClick={(e) => e.stopPropagation()}>
                        <button id="btnCloseHistorico" onClick={closeModal}>&times;</button>
                        <h2>Histórico</h2>
                        <p>O projeto Banca da Ciência da Escola de Artes...</p>
                        <p><strong>E-mail:</strong> <a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('astro'); }}>bancadacienciausp@gmail.com</a></p>
                    </div>
                </div>
            )}

            {/* MODAL FOTON */}
            {activeModal === 'foton' && (
                <div className="modal-foton active" onClick={closeModal}>
                    <div className="foton-panel" onClick={(e) => e.stopPropagation()}>
                        <button id="btnCloseFoton" onClick={closeModal}>&times;</button>
                        <p className="foton-intro">Esta atividade interativa apresenta um storytelling envolvente...</p>
                        <iframe src="https://rjfontana.github.io/foton/" style={{ width: '100%', height: '600px', border: 'none', marginTop: '20px' }}></iframe>
                    </div>
                </div>
            )}

            {/* MODAL ASTRO (Abria ao clicar no email) */}
            {activeModal === 'astro' && (
                <div className="modal-astro active" onClick={closeModal}>
                    <button id="btnCloseAstro" onClick={closeModal}>&times;</button>
                    <img src="./images/astro.png" alt="Astro" className="astro-image" onClick={(e) => e.stopPropagation()} />
                </div>
            )}

            {/* MODAL DO MOSAICO DE SUBPROJETOS */}
            {activeModal === 'subprojetos' && (
                <div className="modal-subprojetos active" onClick={closeModal}>
                    <div className="grid-subprojetos" onClick={(e) => e.stopPropagation()}>
                        <button className="btn-subprojeto" onClick={() => setActiveModal('oumou')}>OUMOU</button>
                        <button className="btn-subprojeto" onClick={() => setActiveModal('agnes')}>AGNES</button>
                        <button className="btn-subprojeto" onClick={() => setActiveModal('judith')}>JUDITH</button>
                        <button className="btn-subprojeto" onClick={() => setActiveModal('leah')}>LEAH</button>
                        <button className="btn-subprojeto" onClick={() => setActiveModal('tebello')}>TEBELLO</button>
                        <button className="btn-subprojeto" onClick={() => setActiveModal('breedlove')}>BREEDLOVE</button>
                        <button className="btn-subprojeto" onClick={() => setActiveModal('nned')}>NNEDI</button>
                        <button className="btn-subprojeto" onClick={() => setActiveModal('maathai')}>MAATHAI</button>
                    </div>
                </div>
            )}

            {/* === EXEMPLOS DE MODAL DE SUBPROJETOS ESPECÍFICOS === */}
            {activeModal === 'oumou' && (
                <div className="modal-projeto active" onClick={closeModal}>
                    <div className="projeto-box" onClick={(e) => e.stopPropagation()}>
                        <button className="btn-close-projeto" onClick={closeModal}>&times;</button>
                        <h2>OUMOU</h2>
                        <p><strong>Temas abordados:</strong> Este projeto homenageia Oumou Sy...</p>
                    </div>
                </div>
            )}

            {/* MODAL PRESSÃO E QUIZ */}
            {activeModal === 'pressao' && (
                <div className="modal-pressao active" onClick={closeModal}>
                    <div className="pressao-panel" onClick={(e) => e.stopPropagation()}>
                        <button id="btnClosePressao" onClick={closeModal}>&times;</button>
                        <iframe src="https://scratch.mit.edu/projects/1239452553/embed" allowTransparency width="485" height="402" frameBorder="0" scrolling="no" allowFullScreen></iframe>

                        <div className="pressao-quiz">
                            <h2>📚 Quiz de Pressão</h2>

                            <div className="exercicio">
                                <h3>🧠 Exercício 1</h3>
                                <button className="btn-resposta" onClick={() => setEx1Open(true)}>Enviar Resposta</button>
                                {ex1Open && (
                                    <div className="resposta">✅ <strong>Resposta correta: c) Aumenta</strong></div>
                                )}
                            </div>

                            <div className="exercicio">
                                <h3>🧠 Exercício 3</h3>
                                <input type="number" value={ex3Value} onChange={(e) => setEx3Value(e.target.value)} placeholder="Pressão em atm" />
                                <button className="btn-resposta" onClick={checkEx3}>Enviar Resposta</button>
                                {ex3Result && (
                                    <div className="resposta">
                                        {ex3Result.correct ? "✅ Resposta correta: 2 atm" : "❌ Resposta incorreta. Tente novamente!"}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;