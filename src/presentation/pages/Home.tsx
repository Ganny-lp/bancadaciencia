import React, { useEffect, useState } from 'react';
import { useModal } from '../contexts/ModalContext';
import { Material } from '../../domain/entities/Material';
import { InternalDriveViewer } from '../components/InternalDriveViewer';
import { Footer } from '../components/Footer';
import { MaterialRepositoryImpl } from '../../infrastructure/repositories/MaterialRepositoryImpl';
import { GetMaterialsUseCase } from '../../domain/usecases/GetMaterialsUseCase';
import { GetExternalLinksUseCase } from '../../domain/usecases/GetExternalLinksUseCase';

const repository = new MaterialRepositoryImpl();
const getMaterialsUseCase = new GetMaterialsUseCase(repository);
const getLinksUseCase = new GetExternalLinksUseCase();

const subprojetosData: Record<string, React.ReactNode> = {
    OUMOU: (
        <>
            <p><strong>@oumou.oficinas</strong></p>
            <p className="mt-2">Homenageia Oumou Sy, ícone da moda senegalesa. Oferece espaço onde costura, design e artesanato se unem para criar peças originais, fortalecendo habilidades manuais e criativas.</p>
            <p className="mt-2"><strong>Faixa etária:</strong> 11 a 14 anos | <strong>Dia:</strong> Quinta-feira (14h às 16h)</p>
        </>
    ),
    AGNES: (
        <>
            <p><strong>Temas:</strong> Cuidados em saúde, oficinas práticas e discussões sobre sustentabilidade e higiene para o mundo das mulheres.</p>
            <p className="mt-2"><strong>Público:</strong> Meninas de 11 a 14 anos | <strong>Dia:</strong> Quarta e Sexta (14h às 16h)</p>
        </>
    ),
    JUDITH: (
        <>
            <p><strong>@projetojudith</strong></p>
            <p className="mt-2">Cultura Maker e Robótica para emancipação e empoderamento de jovens no Jardim Keralux.</p>
            <p className="mt-2"><strong>Faixa etária:</strong> 8 a 14 anos | <strong>Segundas:</strong> 9h | <strong>Terças:</strong> 14h</p>
        </>
    ),
    LEAH: (
        <>
            <p><strong>@grupo.leah</strong></p>
            <p className="mt-2">Alimentação humanizada, justa e sustentável inspirada em Leah Penniman.</p>
            <p className="mt-2"><strong>Público:</strong> 7 a 14 anos | <strong>Dia:</strong> Segunda (8h) e Sexta (14h)</p>
        </>
    ),
    TEBELLO: (
        <>
            <p><strong>Temas:</strong> Física, Química e Biologia de forma lúdica com experimentos de baixo custo.</p>
            <p className="mt-2"><strong>Público:</strong> 11 a 14 anos | <strong>Dia:</strong> Quarta-feira (14h às 16h)</p>
        </>
    ),
    BREEDLOVE: (
        <>
            <p><strong>Objetivo:</strong> Práticas sustentáveis e criação de produtos com recursos naturais.</p>
            <p className="mt-2"><strong>Público:</strong> 8 a 14 anos | <strong>Dia:</strong> Terça-feira (14h às 16h)</p>
        </>
    ),
    NNEDI: (
        <>
            <p><strong>@nnediusp</strong></p>
            <p className="mt-2">Literatura, antirracismo e ficção científica (Afrofuturismo).</p>
            <p className="mt-2"><strong>Público:</strong> 8 a 14 anos | <strong>Dia:</strong> Quarta e Quinta (14h às 16h)</p>
        </>
    ),
    MAATHAI: (
        <>
            <p><strong>@maathai.meioambiente</strong></p>
            <p className="mt-2">Iniciativas que integram meio ambiente, arte, tecnologia e humanidades para inclusão social.</p>
        </>
    ),
};

export const Home = () => {
    const { activeModal, payload, openModal, closeModal } = useModal();
    const [kits, setKits] = useState<Material[]>([]);
    const links = getLinksUseCase.execute();

    const [embedUrl, setEmbedUrl] = useState<string | null>(null);

    useEffect(() => {
        getMaterialsUseCase.executeKits().then(setKits);
    }, []);


    const handleTopIconClick = (id: string) => {
        switch (id) {
            case 'NEWTON': setEmbedUrl(links.aexestrela); break;
            case 'FOLDER': window.open(links.planos, '_blank'); break;
            case 'TEACHER': setEmbedUrl(links.fazenda); break;
            case 'CHICKEN': setEmbedUrl(links.alimentos); break;
            case 'EYE': setEmbedUrl(links.onda); break;
            case 'TELESCOPE': setEmbedUrl(links.telescopio); break;
            // Estes IDs abrem modais internos com a lógica legada
            case 'BULB': openModal('FOTON'); break;
            case 'SNORKEL': openModal('PRESSAO'); break;
            case 'YODA': openModal('YODA'); break;
            default: openModal(id as any);
        }
    };

    return (
        <div className="min-h-screen flex flex-col relative overflow-x-hidden font-sans">
            <button
                id="btnEachOfficial"
                onClick={() => openModal('HISTORICO')}
                className="fixed
               top-5 left-5
               max-[768px]:bottom-5 max-[768px]:top-auto max-[768px]:left-5
               w-[100px] h-[100px] max-[768px]:w-12 max-[768px]:h-12
               rounded-full border-none bg-transparent bg-no-repeat bg-center bg-contain
               z-[120] cursor-pointer shadow-lg hover:scale-105 transition-transform"
                style={{ backgroundImage: "url('./images/each.png')" }}
                aria-label="Histórico do projeto"
            />
            {/* ÍCONES DO TOPO */}
            <header className="w-full p-4 flex justify-center items-center z-20">
                <div className="flex bg-banca-escuro/40 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-2xl overflow-x-auto no-scrollbar">
                    {[
                        { id: 'KITS', src: './images/pasta.png' },
                        { id: 'NEWTON', src: './images/aexestrela.png' },
                        { id: 'FOLDER', src: './images/planos.png' },
                        { id: 'TEACHER', src: './images/fazenda.png' },
                        { id: 'CHICKEN', src: './images/alimentos.png' },
                        { id: 'EYE', src: './images/olho.png' },
                        { id: 'TELESCOPE', src: './images/telescopio.png' },
                        { id: 'BULB', src: './images/foton.png' },
                        { id: 'SNORKEL', src: './images/pressao.png' },
                        { id: 'YODA', src: './images/yoda.png' },
                    ].map((icon) => (
                        <button key={icon.id} onClick={() => handleTopIconClick(icon.id)} className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 p-2 hover:bg-banca-medio/50 rounded-xl transition-all hover:scale-110">
                            <img src={icon.src} className="w-full h-full object-contain filter drop-shadow-md" alt={icon.id} />
                        </button>
                    ))}
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-12 italic">Banca da Ciência</h1>
                <button onClick={() => openModal('KITS')} className="hover:scale-105 transition-all">
                    <img src="./images/pasta.png" alt="Pasta" className="w-48 md:w-72 drop-shadow-2xl" />                </button>
            </main>


            <Footer />

            {/* MODAL KITS */}
            {activeModal === 'KITS' && (
                <div className="fixed inset-0 bg-banca-escuro/90 z-50 flex items-center justify-center p-4 backdrop-blur-md">
                    <div className="bg-white p-8 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
                        <button onClick={closeModal} className="absolute top-4 right-6 text-4xl text-gray-400">&times;</button>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                            {kits.map(kit => (
                                <button key={kit.id} onClick={() => openModal('DRIVE_VIEWER', kit.id)} className="flex flex-col items-center group">
                                    <div className="w-full aspect-square rounded-xl overflow-hidden shadow-md group-hover:border-banca-claro border-4 border-transparent transition-all">
                                        <img src={kit.coverImagePath} className="w-full h-full object-cover" alt={kit.name} />
                                    </div>
                                    <p className="mt-2 font-bold text-banca-escuro">{kit.name}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL LISTA DE SUBPROJETOS */}
            {activeModal === 'SUBPROJETOS' && (
                <div className="fixed inset-0 bg-banca-escuro/90 z-50 flex items-center justify-center p-4" onClick={closeModal}>
                    <div className="bg-white p-8 rounded-3xl max-w-4xl w-full relative" onClick={e => e.stopPropagation()}>
                        <button onClick={closeModal} className="absolute top-4 right-6 text-4xl text-gray-400">&times;</button>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.keys(subprojetosData).map(sub => (
                                <button key={sub} onClick={() => openModal('SUBPROJETO_INFO', sub)} className="p-6 bg-gray-100 rounded-2xl font-black text-banca-escuro hover:bg-banca-claro hover:text-white transition-all">
                                    {sub}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* MODAL FOTON (Genially + Frame de Apoio) */}

            {/* MODAL FOTON - Versão Final Limpa */}
            {activeModal === 'FOTON' && (
                <div className="fixed inset-0 bg-banca-escuro/95 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
                    <div className="bg-white rounded-3xl max-w-6xl w-full h-[90vh] flex flex-col relative overflow-hidden shadow-2xl">

                        {/* BOTÃO FECHAR */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-6 text-4xl text-gray-400 hover:text-red-500 z-50 transition-colors"
                        >
                            &times;
                        </button>

                        {/* 1. TEXTO INTRODUTÓRIO (Topo Fixo) */}
                        <div className="p-8 bg-blue-50 border-b-4 border-banca-claro">
                            <div className="flex gap-4 items-start max-w-4xl mx-auto">
                                <div className="bg-banca-claro p-2 rounded-lg text-white shadow-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                </div>
                                <p className="text-[#0c3d7a] text-base md:text-lg leading-relaxed font-medium">
                                    Esta atividade interativa apresenta um <strong>storytelling envolvente sobre óptica</strong>.
                                    Ao explorar a história, você resolverá questões de óptica e coletará senhas que aparecerão
                                    para iluminar o núcleo fotônico, revelando os segredos da luz e da visão.
                                </p>
                            </div>
                        </div>

                        {/* 2. REPOSITÓRIO GITHUB (Ocupa todo o resto) */}
                        <div className="flex-grow w-full overflow-y-auto">
                            <iframe
                                src={links.foton}
                                className="w-full h-full min-h-[1000px] border-none"
                                title="Conteúdo Atividade Fóton"
                            />
                        </div>

                        {/* RODAPÉ SUTIL */}
                        <div className="bg-gray-100 py-2 text-center border-t">
                <span className="text-[10px] text-gray-400 font-mono tracking-[0.2em] uppercase">
                    Banca da Ciência • Laboratório Aberto
                </span>
                        </div>
                    </div>
                </div>
            )}
            {activeModal === 'ASTRO' && (
                <div
                    className="fixed inset-0 bg-black z-[102] flex items-center justify-center"
                    onClick={closeModal}
                >
                    <img
                        src="./images/astro.png"
                        alt="Astro"
                        className="max-w-full max-h-full object-contain"
                    />
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 bg-black/50 text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70"
                    >
                        &times;
                    </button>
                </div>
            )}
            {activeModal === 'HISTORICO' && (
                <div className="fixed inset-0 bg-banca-escuro/70 z-[199] flex items-center justify-center p-4">
                    <div className="relative w-full max-w-[700px] bg-white rounded-xl p-8 max-h-[80vh] overflow-y-auto shadow-xl">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                        <div className="text-banca-escuro">
                            <h2 className="text-2xl font-bold mb-4">Histórico</h2>
                            <p className="mb-4 leading-relaxed">
                                O projeto Banca da Ciência da Escola de Artes, Ciências e Humanidades da Universidade de São Paulo (EACH-USP)
                                surgiu em meados de 2010, de alguns professores universitários, como o docente Luís Paulo de Carvalho Piassi,
                                inspirados por uma iniciativa de bibliotecas móveis que iam até as comunidades afastadas, a fim de incentivar
                                a leitura entre os moradores. Ele tem o objetivo de apresentar conceitos científicos de uma forma lúdica para
                                estudantes do Ensino Fundamental e para todos os interessados por ciências.
                            </p>
                            <h3 className="text-lg font-semibold mt-4 mb-2">Temas abordados</h3>
                            <p>Experimentos de baixo custo, com explicações didáticas e propagação da ciência.</p>
                            <h3 className="text-lg font-semibold mt-4 mb-2">Público Alvo</h3>
                            <p>Todos os públicos, contudo principalmente e mais frequentemente voltado ao público infantojuvenil.</p>
                            <h3 className="text-lg font-semibold mt-4 mb-2">Apresentações</h3>
                            <p>São realizadas em escolas e na EACH-USP, a partir de solicitações.</p>
                            <h3 className="text-lg font-semibold mt-4 mb-2">Formas de entrar em contato</h3>
                            <p>
                                <strong>E-mail:</strong>{' '}
                                <button
                                    onClick={() => openModal('ASTRO')}
                                    className="text-blue-600 underline hover:text-blue-800"
                                >
                                    bancadacienciausp@gmail.com
                                </button>
                            </p>
                            <p><strong>Celular (Monitora Chelsee):</strong> +55 11 99602-2662</p>
                            <p><strong>Celular (Monitora Samara):</strong> +55 11 97107-2398</p>
                            <p><strong>Celular (Monitor Lukas):</strong> +55 11 96131-1112</p>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL PRESSÃO (Scratch + Quiz Legado) */}
            {activeModal === 'PRESSAO' && (
                <div className="fixed inset-0 bg-banca-escuro/95 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
                    <div className="bg-[#e1f0ff] p-8 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative text-banca-escuro">
                        <button onClick={closeModal} className="absolute top-4 right-6 text-4xl text-blue-900">&times;</button>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-2xl font-black mb-4 uppercase">Simulador de Pressão</h2>
                                <iframe
                                    src="https://scratch.mit.edu/projects/1239452553/embed"
                                    width="485" height="402"
                                    className="rounded-xl shadow-lg w-full"
                                />
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold border-b border-blue-300 pb-2">Desafio de Física</h3>
                                <p className="text-sm">Sabendo que a cada 10m de profundidade a pressão aumenta 1 atm, responda:</p>
                                <div className="bg-white p-4 rounded-xl shadow-inner">
                                    <p className="text-sm font-semibold">Qual a pressão total a 10m de profundidade?</p>
                                    <input type="number" id="ex-pressao" className="w-full mt-2 p-2 border rounded" placeholder="Resposta em atm..." />
                                    <button
                                        onClick={() => {
                                            const val = (document.getElementById('ex-pressao') as HTMLInputElement).value;
                                            alert(val === "2" ? "Correto! 1 atm (ar) + 1 atm (água)" : "Tente novamente!");
                                        }}
                                        className="mt-2 bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
                                    >
                                        Verificar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL YODA (Simulador Jedi Archive) */}
            {activeModal === 'YODA' && (
                <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-7xl h-[90vh] relative">
                        <div className="absolute top-2 right-2 flex gap-2 z-10">
                            <button
                                onClick={() => window.open(links.yoda, '_blank')}
                                className="bg-banca-escuro text-white p-2 rounded text-xs"
                            >
                                Nova Aba
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-red-600 text-white p-2 rounded text-xs"
                            >
                                Fechar
                            </button>
                        </div>
                        <iframe
                            src={links.yoda}
                            title="Simulador Jedi Archive"
                            className="w-full h-full rounded-2xl"
                            allow="fullscreen"
                        />
                    </div>
                </div>
            )}
            {/* MODAL DETALHES DO SUBPROJETO */}
            {activeModal === 'SUBPROJETO_INFO' && payload && (
                <div className="fixed inset-0 bg-banca-escuro/95 z-[60] flex items-center justify-center p-4" onClick={() => openModal('SUBPROJETOS')}>
                    <div className="bg-[#032a4c] text-[#e1f0ff] p-8 rounded-3xl max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
                        <button onClick={() => openModal('SUBPROJETOS')} className="absolute top-4 right-6 text-4xl text-blue-300">&times;</button>
                        <h2 className="text-3xl font-black mb-6 border-b border-blue-800 pb-2">{payload}</h2>
                        <div className="overflow-y-auto max-h-[60vh] pr-2">
                            {subprojetosData[payload]}
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL IFRAMES EXTERNOS */}
            {embedUrl && (
                <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4" onClick={() => setEmbedUrl(null)}>
                    <div className="bg-white rounded-2xl w-full max-w-6xl h-[85vh] relative" onClick={e => e.stopPropagation()}>
                        <div className="absolute top-2 right-2 flex gap-2">
                            <button onClick={() => window.open(embedUrl, '_blank')} className="bg-banca-escuro text-white p-2 rounded text-xs">Nova Aba</button>
                            <button onClick={() => setEmbedUrl(null)} className="bg-red-600 text-white p-2 rounded text-xs">Fechar</button>
                        </div>
                        <iframe src={embedUrl} title="Visualização" className="w-full h-full rounded-2xl" />
                    </div>
                </div>
            )}

            {activeModal === 'DRIVE_VIEWER' && payload && (
                <InternalDriveViewer fileId={payload} onClose={closeModal} />
            )}
        </div>
    );
};