
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

const topIcons = [
    { id: 'KITS', src: './images/pasta.png', label: 'Kits' },
    { id: 'NEWTON', src: './images/aexestrela.png', label: 'Aexestrela' },
    { id: 'FOLDER', src: './images/planos.png', label: 'Planos' },
    { id: 'TEACHER', src: './images/fazenda.png', label: 'Fazenda' },
    { id: 'CHICKEN', src: './images/alimentos.png', label: 'Alimentos' },
    { id: 'EYE', src: './images/olho.png', label: 'Onda' },
    { id: 'TELESCOPE', src: './images/telescopio.png', label: 'Telescópio' },
    { id: 'BULB', src: './images/foton.png', label: 'Fóton' },
    { id: 'SNORKEL', src: './images/pressao.png', label: 'Pressão' },
    { id: 'YODA', src: './images/yoda.png', label: 'Yoda' },
];

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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);

    const [isFullscreen, setIsFullscreen] = useState(false);

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
            case 'BULB': openModal('FOTON'); break;
            case 'SNORKEL': openModal('PRESSAO'); break;
            case 'YODA': openModal('YODA'); break;
            default: openModal(id as any);
        }
    };

    const handleCloseModal = () => {
        setIsFullscreen(false);
        closeModal();
    };

    const handleCloseEmbed = () => {
        setIsFullscreen(false);
        setEmbedUrl(null);
    };

    const nextSlide = () => setCarouselIndex((prev) => (prev + 1) % topIcons.length);
    const prevSlide = () => setCarouselIndex((prev) => (prev - 1 + topIcons.length) % topIcons.length);

    const getVisibleIcons = () => {
        const icons = [];
        for (let i = 0; i < 4; i++) {
            icons.push(topIcons[(carouselIndex + i) % topIcons.length]);
        }
        return icons;
    };

    const visibleIcons = getVisibleIcons();
    const mainIcon = visibleIcons[0];
    const subIcons = visibleIcons.slice(1);

    // Substituição do vh por dvh (Dynamic Viewport Height) resolve os problemas com as barras do mobile
    const modalContainerClass = isFullscreen 
        ? "bg-white w-screen h-[100dvh] flex flex-col relative overflow-hidden" 
        : "bg-white rounded-2xl sm:rounded-3xl max-w-6xl w-full h-[95dvh] sm:h-[90dvh] flex flex-col relative overflow-hidden shadow-2xl";

    return (
        <div className="min-h-screen flex flex-col relative overflow-x-hidden font-sans">
            
            {/* HEADER */}
            <header className="w-full p-4 z-20">
                <div className="hidden md:grid grid-cols-3 items-center">
                    <div className="justify-self-start">
                        <button
                            id="btnEachOfficial"
                            onClick={() => openModal('HISTORICO')}
                            className="w-[100px] h-[100px] rounded-full border-none bg-transparent bg-no-repeat bg-center bg-contain cursor-pointer shadow-lg hover:scale-105 transition-transform"
                            style={{ backgroundImage: "url('./images/each.png')" }}
                            aria-label="Histórico do projeto"
                        />
                    </div>
                    <div className="justify-self-center">
                        <div className="flex bg-banca-escuro/40 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-2xl gap-1">
                            {topIcons.map((icon) => (
                                <button
                                    key={icon.id}
                                    onClick={() => handleTopIconClick(icon.id)}
                                    className="flex-shrink-0 w-16 h-16 p-2 hover:bg-banca-medio/50 rounded-xl transition-all hover:scale-110"
                                >
                                    <img src={icon.src} className="w-full h-full object-contain filter drop-shadow-md" alt={icon.id} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div></div>
                </div>

                <div className="md:hidden flex justify-between items-center gap-2">
                    <button
                        onClick={() => openModal('HISTORICO')}
                        className="w-12 h-12 rounded-full border-none bg-transparent bg-no-repeat bg-center bg-contain flex-shrink-0 cursor-pointer shadow-lg"
                        style={{ backgroundImage: "url('./images/each.png')" }}
                        aria-label="Histórico do projeto"
                    />
                    <button
                        className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 bg-banca-escuro/40 backdrop-blur-sm rounded-lg p-2"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="w-5 h-0.5 bg-white"></span>
                        <span className="w-5 h-0.5 bg-white"></span>
                        <span className="w-5 h-0.5 bg-white"></span>
                    </button>
                </div>
            </header>

            {/* Menu Mobile */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setMobileMenuOpen(false)}>
                    <div className="bg-banca-escuro/95 backdrop-blur-md rounded-2xl w-64 max-h-[80vh] overflow-y-auto p-3 flex flex-col gap-2 border border-white/20" onClick={(e) => e.stopPropagation()}>
                        {topIcons.map((icon) => (
                            <button key={`mob-${icon.id}`} onClick={() => { handleTopIconClick(icon.id); setMobileMenuOpen(false); }} className="flex items-center gap-3 p-3 hover:bg-banca-medio/50 rounded-xl transition-all">
                                <img src={icon.src} className="w-8 h-8 object-contain" alt={icon.id} />
                                <span className="text-white text-sm font-medium">{icon.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* MAIN - CARROSSEL */}
            <main className="flex-grow flex flex-col items-center justify-center w-full px-2 sm:px-4 mb-8 sm:mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-6 sm:mb-10 italic text-center">Banca da Ciência</h1>
                
                <div className="flex items-center justify-center gap-4 sm:gap-8 w-full max-w-4xl px-2">
                    
                    <button
                        onClick={prevSlide}
                        className="z-10 bg-banca-escuro/80 hover:bg-banca-escuro text-white w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xl border border-white/20 text-lg sm:text-2xl flex-shrink-0 hover:scale-110"
                        aria-label="Anterior"
                    >
                        &#10094;
                    </button>

                    <div className="flex flex-col items-center gap-6 sm:gap-8 w-[240px] sm:w-[380px] md:w-[480px]">
                        
                        <button 
                            onClick={() => handleTopIconClick(mainIcon.id)} 
                            className="flex flex-col items-center gap-3 sm:gap-4 hover:scale-105 transition-transform duration-300 group"
                        >
                            <img 
                                src={mainIcon.src} 
                                alt={mainIcon.label} 
                                className="w-32 h-32 sm:w-52 sm:h-52 md:w-64 md:h-64 object-contain drop-shadow-2xl group-hover:drop-shadow-[0_20px_30px_rgba(255,255,255,0.3)] transition-all" 
                            />
                            <span className="text-white text-sm sm:text-xl md:text-2xl font-bold bg-banca-escuro/80 px-6 sm:px-8 py-1.5 sm:py-2 rounded-full backdrop-blur-sm shadow-lg whitespace-nowrap">
                                {mainIcon.label}
                            </span>
                        </button>

                        <div className="flex gap-2 sm:gap-6 md:gap-8 justify-center w-full">
                            {subIcons.map((icon) => (
                                <button 
                                    key={`sub-${icon.id}`} 
                                    onClick={() => handleTopIconClick(icon.id)} 
                                    className="flex flex-col items-center gap-1.5 sm:gap-2 hover:scale-110 transition-transform duration-300 group opacity-80 hover:opacity-100 flex-1"
                                >
                                    <img 
                                        src={icon.src} 
                                        alt={icon.label} 
                                        className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-xl" 
                                    />
                                    <span className="text-white text-[10px] sm:text-xs md:text-sm font-medium bg-banca-escuro/60 px-2 sm:px-4 py-0.5 sm:py-1 rounded-full backdrop-blur-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                                        {icon.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={nextSlide}
                        className="z-10 bg-banca-escuro/80 hover:bg-banca-escuro text-white w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xl border border-white/20 text-lg sm:text-2xl flex-shrink-0 hover:scale-110"
                        aria-label="Próximo"
                    >
                        &#10095;
                    </button>
                </div>
            </main>

            <Footer />

            {/* MODAIS */}
            {activeModal === 'KITS' && (
                <div className="fixed inset-0 bg-banca-escuro/90 z-50 flex items-center justify-center p-4 backdrop-blur-md">
                    <div className="bg-white p-6 sm:p-8 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
                        <button onClick={handleCloseModal} className="absolute top-4 right-6 text-4xl text-gray-400 hover:text-gray-600">&times;</button>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 mt-6 sm:mt-0">
                            {kits.map(kit => (
                                <button key={kit.id} onClick={() => openModal('DRIVE_VIEWER', kit.id)} className="flex flex-col items-center group">
                                    <div className="w-full aspect-square rounded-xl overflow-hidden shadow-md group-hover:border-banca-claro border-4 border-transparent transition-all">
                                        <img src={kit.coverImagePath} className="w-full h-full object-cover" alt={kit.name} />
                                    </div>
                                    <p className="mt-2 font-bold text-sm sm:text-base text-banca-escuro text-center">{kit.name}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeModal === 'SUBPROJETOS' && (
                <div className="fixed inset-0 bg-banca-escuro/90 z-50 flex items-center justify-center p-4" onClick={handleCloseModal}>
                    <div className="bg-white p-6 sm:p-8 rounded-3xl max-w-4xl w-full relative" onClick={e => e.stopPropagation()}>
                        <button onClick={handleCloseModal} className="absolute top-4 right-6 text-4xl text-gray-400 hover:text-gray-600">&times;</button>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-0">
                            {Object.keys(subprojetosData).map(sub => (
                                <button key={sub} onClick={() => openModal('SUBPROJETO_INFO', sub)} className="p-4 sm:p-6 bg-gray-100 rounded-2xl font-black text-xs sm:text-base text-banca-escuro hover:bg-banca-claro hover:text-white transition-all">
                                    {sub}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Fóton - Sem Scroll */}
            {activeModal === 'FOTON' && (
                <div className={`fixed inset-0 bg-banca-escuro/95 z-[100] flex items-center justify-center ${isFullscreen ? '' : 'p-2 sm:p-4'} backdrop-blur-md`}>
                    <div className={modalContainerClass}>
                        <div className="flex justify-end gap-2 p-2 sm:p-4 absolute top-0 left-0 right-0 z-50 pointer-events-none">
                            <button 
                                onClick={() => setIsFullscreen(!isFullscreen)} 
                                className="pointer-events-auto bg-blue-600/90 hover:bg-blue-800 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors"
                                title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
                            >
                                {isFullscreen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.707l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.793l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.793l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.707V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.707l4.096 4.096a.5.5 0 0 1 0 .707z"/></svg>
                                )}
                            </button>
                            <button onClick={handleCloseModal} className="pointer-events-auto bg-white/60 hover:bg-red-600 hover:text-white text-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-2xl shadow-lg transition-colors">&times;</button>
                        </div>
                        
                        {!isFullscreen && (
                            <div className="shrink-0 p-4 sm:p-8 bg-blue-50 border-b-4 border-banca-claro pt-14 sm:pt-16">
                                <div className="flex gap-3 sm:gap-4 items-start max-w-4xl mx-auto">
                                    <div className="bg-banca-claro p-2 rounded-lg text-white shadow-md flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                    </div>
                                    <p className="text-[#0c3d7a] text-xs sm:text-base md:text-lg leading-relaxed font-medium">
                                        Esta atividade interativa apresenta um <strong>storytelling envolvente sobre óptica</strong>.
                                        Ao explorar a história, você resolverá questões de óptica e coletará senhas que aparecerão
                                        para iluminar o núcleo fotônico, revelando os segredos da luz e da visão.
                                    </p>
                                </div>
                            </div>
                        )}
                        
                        {/* O Segredo está aqui:
                            flex-1 (ocupa o resto do espaço) 
                            min-h-0 (impede que o conteudo de dentro force a altura p/ fora do flex)
                            relative (para o iframe absolute preencher 100% de forma exata)
                        */}
                        <div className="flex-1 w-full min-h-0 relative bg-black">
                            <iframe 
                                src={links.foton} 
                                className="absolute inset-0 w-full h-full border-none" 
                                title="Conteúdo Atividade Fóton" 
                                allowFullScreen
                            />
                        </div>
                        
                        {!isFullscreen && (
                            <div className="shrink-0 bg-white py-1.5 sm:py-2 text-center border-t">
                                <span className="text-[8px] sm:text-[10px] text-gray-400 font-mono tracking-[0.2em] uppercase">Banca da Ciência • Laboratório Aberto</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeModal === 'ASTRO' && (
                <div className="fixed inset-0 bg-black z-[102] flex items-center justify-center" onClick={handleCloseModal}>
                    <img src="./images/astro.png" alt="Astro" className="max-w-full max-h-full object-contain p-4" />
                    <button onClick={handleCloseModal} className="absolute top-4 right-4 bg-black/50 text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70">&times;</button>
                </div>
            )}

            {activeModal === 'HISTORICO' && (
                <div className="fixed inset-0 bg-banca-escuro/70 z-[199] flex items-center justify-center p-4">
                    <div className="relative w-full max-w-[700px] bg-white rounded-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-xl">
                        <button onClick={handleCloseModal} className="absolute top-2 right-4 text-3xl text-gray-500 hover:text-gray-700">&times;</button>
                        <div className="text-banca-escuro mt-4 sm:mt-0 text-sm sm:text-base">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4">Histórico</h2>
                            <p className="mb-4 leading-relaxed">O projeto Banca da Ciência da Escola de Artes, Ciências e Humanidades da Universidade de São Paulo (EACH-USP) surgiu em meados de 2010...</p>
                            <h3 className="text-base sm:text-lg font-semibold mt-4 mb-2">Temas abordados</h3>
                            <p>Experimentos de baixo custo, com explicações didáticas e propagação da ciência.</p>
                            <h3 className="text-base sm:text-lg font-semibold mt-4 mb-2">Público Alvo</h3>
                            <p>Todos os públicos, contudo principalmente e mais frequentemente voltado ao público infantojuvenil.</p>
                            <h3 className="text-base sm:text-lg font-semibold mt-4 mb-2">Apresentações</h3>
                            <p>São realizadas em escolas e na EACH-USP, a partir de solicitações.</p>
                            <h3 className="text-base sm:text-lg font-semibold mt-4 mb-2">Formas de entrar em contato</h3>
                            <p><strong>E-mail:</strong> <button onClick={() => openModal('ASTRO')} className="text-blue-600 underline hover:text-blue-800 break-all">bancadacienciausp@gmail.com</button></p>
                            <p><strong>Celular (Monitora Chelsee):</strong> +55 11 99602-2662</p>
                            <p><strong>Celular (Monitora Samara):</strong> +55 11 97107-2398</p>
                            <p><strong>Celular (Monitor Lukas):</strong> +55 11 96131-1112</p>
                        </div>
                    </div>
                </div>
            )}

            {activeModal === 'PRESSAO' && (
                <div className="fixed inset-0 bg-banca-escuro/95 z-[100] flex items-center justify-center p-2 sm:p-4 backdrop-blur-md">
                    <div className="bg-[#e1f0ff] p-4 sm:p-8 rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto relative text-banca-escuro">
                        <button onClick={handleCloseModal} className="absolute top-2 right-4 sm:top-4 sm:right-6 text-3xl sm:text-4xl text-blue-900">&times;</button>
                        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-0">
                            <div className="flex flex-col items-center w-full">
                                <h2 className="text-xl sm:text-2xl font-black mb-4 uppercase text-center w-full">Simulador de Pressão</h2>
                                <iframe src="https://scratch.mit.edu/projects/1239452553/embed" className="rounded-xl shadow-lg w-full aspect-[4/3] max-w-[485px]" allowFullScreen />
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-bold border-b border-blue-300 pb-2">Desafio de Física</h3>
                                <p className="text-sm">Sabendo que a cada 10m de profundidade a pressão aumenta 1 atm, responda:</p>
                                <div className="bg-white p-4 rounded-xl shadow-inner">
                                    <p className="text-sm font-semibold">Qual a pressão total a 10m de profundidade?</p>
                                    <input type="number" id="ex-pressao" className="w-full mt-2 p-2 border rounded" placeholder="Resposta em atm..." />
                                    <button onClick={() => { const val = (document.getElementById('ex-pressao') as HTMLInputElement).value; alert(val === "2" ? "Correto! 1 atm (ar) + 1 atm (água)" : "Tente novamente!"); }} className="mt-2 bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 w-full sm:w-auto">Verificar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Yoda - Sem Scroll */}
            {activeModal === 'YODA' && (
                <div className={`fixed inset-0 bg-black/90 z-[200] flex items-center justify-center ${isFullscreen ? '' : 'p-2 sm:p-4'}`} onClick={handleCloseModal}>
                    <div className={modalContainerClass.replace('bg-white', 'bg-black')} onClick={e => e.stopPropagation()}>
                        <div className="absolute top-2 right-2 flex gap-2 z-50 pointer-events-none">
                            <button 
                                onClick={() => setIsFullscreen(!isFullscreen)} 
                                className="pointer-events-auto bg-blue-600/90 hover:bg-blue-800 text-white px-3 py-1.5 rounded text-xs shadow-md"
                            >
                                {isFullscreen ? 'Reduzir' : 'Tela Cheia'}
                            </button>
                            <button onClick={() => window.open(links.yoda, '_blank')} className="pointer-events-auto bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded text-xs shadow-md">Nova Aba</button>
                            <button onClick={handleCloseModal} className="pointer-events-auto bg-red-600/90 hover:bg-red-800 text-white px-3 py-1.5 rounded text-xs shadow-md">Fechar</button>
                        </div>
                        <div className="flex-1 w-full min-h-0 relative">
                            <iframe src={links.yoda} title="Simulador Jedi Archive" className="absolute inset-0 w-full h-full border-none" allowFullScreen />
                        </div>
                    </div>
                </div>
            )}

            {activeModal === 'SUBPROJETO_INFO' && payload && (
                <div className="fixed inset-0 bg-banca-escuro/95 z-[60] flex items-center justify-center p-4" onClick={() => openModal('SUBPROJETOS')}>
                    <div className="bg-[#032a4c] text-[#e1f0ff] p-6 sm:p-8 rounded-2xl sm:rounded-3xl max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
                        <button onClick={() => openModal('SUBPROJETOS')} className="absolute top-4 right-6 text-4xl text-blue-300">&times;</button>
                        <h2 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 border-b border-blue-800 pb-2 pr-8">{payload}</h2>
                        <div className="overflow-y-auto max-h-[60vh] pr-2 text-sm sm:text-base">{subprojetosData[payload]}</div>
                    </div>
                </div>
            )}

            {/* Embed Genérico - Sem Scroll */}
            {embedUrl && (
                <div className={`fixed inset-0 bg-black/90 z-[200] flex items-center justify-center ${isFullscreen ? '' : 'p-2 sm:p-4'}`} onClick={handleCloseEmbed}>
                    <div className={modalContainerClass.replace('bg-white', 'bg-black')} onClick={e => e.stopPropagation()}>
                        <div className="absolute top-2 right-2 flex gap-2 z-50 pointer-events-none">
                            <button 
                                onClick={() => setIsFullscreen(!isFullscreen)} 
                                className="pointer-events-auto bg-blue-600/90 hover:bg-blue-800 text-white px-3 py-1.5 rounded text-xs shadow-md"
                            >
                                {isFullscreen ? 'Reduzir' : 'Tela Cheia'}
                            </button>
                            <button onClick={() => window.open(embedUrl, '_blank')} className="pointer-events-auto bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded text-xs shadow-md">Nova Aba</button>
                            <button onClick={handleCloseEmbed} className="pointer-events-auto bg-red-600/90 hover:bg-red-800 text-white px-3 py-1.5 rounded text-xs shadow-md">Fechar</button>
                        </div>
                        <div className="flex-1 w-full min-h-0 relative">
                            <iframe src={embedUrl} title="Visualização" className="absolute inset-0 w-full h-full border-none" allowFullScreen />
                        </div>
                    </div>
                </div>
            )}

            {activeModal === 'DRIVE_VIEWER' && payload && (
                <InternalDriveViewer fileId={payload} onClose={handleCloseModal} />
            )}
        </div>
    );
};
