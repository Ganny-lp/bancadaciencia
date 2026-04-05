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

// 1. Dados das Dinâmicas (Joguinhos)
const dinamicasData = [
    { id: 'NEWTON', src: './images/aexestrela.png', label: 'Aexestrela' },
    { id: 'TEACHER', src: './images/fazenda.png', label: 'Fazenda' },
    { id: 'CHICKEN', src: './images/alimentos.png', label: 'Alimentos' },
    { id: 'EYE', src: './images/olho.png', label: 'Onda' },
    { id: 'TELESCOPE', src: './images/telescopio.png', label: 'Telescópio' },
    { id: 'BULB', src: './images/foton.png', label: 'Fóton' },
    { id: 'SNORKEL', src: './images/pressao.png', label: 'Pressão' },
    { id: 'YODA', src: './images/yoda.png', label: 'Yoda' },
];

// 2. Dados das Entidades para o Carrossel
const entidadesData = [
    { id: 'OUMOU', name: 'Oumou', src: './images/oumou.png' },
    { id: 'AGNES', name: 'Agnes', src: './images/agnes.png' },
    { id: 'JUDITH', name: 'Judith', src: './images/judith.png' },
    { id: 'LEAH', name: 'Leah', src: './images/leah.png' },
    { id: 'TEBELLO', name: 'Tebello', src: './images/tebello.png' },
    { id: 'BREEDLOVE', name: 'Breedlove', src: './images/breedlove.png' },
    { id: 'NNEDI', name: 'Nnedi', src: './images/nnedi.png' },
    { id: 'MAATHAI', name: 'Maathai', src: './images/maathai.png' },
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

    const [activeTab, setActiveTab] = useState<'ENTIDADES' | 'DINAMICAS'>('ENTIDADES');
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        getMaterialsUseCase.executeKits().then(setKits);
    }, []);

    const handleActionClick = (id: string) => {
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
            case 'KITS': openModal('KITS'); break;
            default:
                if (subprojetosData[id]) {
                    openModal('SUBPROJETO_INFO', id);
                } else {
                    openModal(id as any);
                }
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

    const nextSlide = () => setCarouselIndex((prev) => (prev + 1) % entidadesData.length);
    const prevSlide = () => setCarouselIndex((prev) => (prev - 1 + entidadesData.length) % entidadesData.length);

    const getVisibleEntities = () => {
        const entities = [];
        for (let i = 0; i < 4; i++) {
            entities.push(entidadesData[(carouselIndex + i) % entidadesData.length]);
        }
        return entities;
    };

    const visibleEntities = getVisibleEntities();
    const mainEntity = visibleEntities[0];
    const subEntities = visibleEntities.slice(1);

    const modalContainerClass = isFullscreen
        ? "bg-white w-screen h-[100dvh] flex flex-col relative overflow-hidden"
        : "bg-white rounded-2xl sm:rounded-3xl max-w-6xl w-full h-[95dvh] sm:h-[90dvh] flex flex-col relative overflow-hidden shadow-2xl";

    return (
        <div className="min-h-screen flex flex-col relative overflow-x-hidden font-sans">

            {/* HEADER com Navegação Subseções */}
            <header className="w-full p-4 z-20">
                <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto">
                    <button
                        onClick={() => openModal('HISTORICO')}
                        className="w-[80px] h-[80px] rounded-full border-none bg-transparent bg-no-repeat bg-center bg-contain cursor-pointer shadow-lg hover:scale-105 transition-transform"
                        style={{ backgroundImage: "url('./images/each.png')" }}
                        aria-label="Histórico do projeto"
                    />

                    {/* Navegação Principal */}
                    <div className="flex bg-blue-950 p-1.5 rounded-full shadow-inner border border-blue-900/50 relative">
                        <button
                            onClick={() => setActiveTab('ENTIDADES')}
                            className={`px-8 py-2.5 rounded-full font-bold text-lg transition-all duration-300 min-w-[140px] text-center ${
                                activeTab === 'ENTIDADES'
                                    ? 'bg-blue-200 text-blue-950 shadow-md transform scale-105'
                                    : 'bg-transparent text-white/50 hover:text-white/90'
                            }`}
                        >
                            Início
                        </button>
                        <button
                            onClick={() => setActiveTab('DINAMICAS')}
                            className={`px-8 py-2.5 rounded-full font-bold text-lg transition-all duration-300 min-w-[140px] text-center ${
                                activeTab === 'DINAMICAS'
                                    ? 'bg-blue-200 text-blue-950 shadow-md transform scale-105'
                                    : 'bg-transparent text-white/50 hover:text-white/90'
                            }`}
                        >
                            Dinâmicas
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => handleActionClick('FOLDER')} className="text-white font-bold hover:underline">Planos</button>
                        <button onClick={() => handleActionClick('KITS')} className="text-white font-bold hover:underline">Kits</button>
                    </div>
                </div>

                {/* Mobile Header */}
                <div className="md:hidden flex justify-between items-center gap-2">
                    <button
                        onClick={() => openModal('HISTORICO')}
                        className="w-12 h-12 rounded-full border-none bg-transparent bg-no-repeat bg-center bg-contain flex-shrink-0 cursor-pointer shadow-lg"
                        style={{ backgroundImage: "url('./images/each.png')" }}
                    />
                    <button
                        className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 bg-banca-escuro/60 backdrop-blur-sm rounded-lg p-2"
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
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex flex-col bg-blue-950 p-1.5 rounded-2xl shadow-inner border border-blue-900/50 w-3/4 max-w-sm">
                        <button
                            onClick={() => { setActiveTab('ENTIDADES'); setMobileMenuOpen(false); }}
                            className={`p-4 rounded-xl font-bold text-center transition-all duration-300 ${
                                activeTab === 'ENTIDADES'
                                    ? 'bg-blue-200 text-blue-950 shadow-md'
                                    : 'bg-transparent text-white/50'
                            }`}
                        >
                            Início
                        </button>

                        <button
                            onClick={() => { setActiveTab('DINAMICAS'); setMobileMenuOpen(false); }}
                            className={`p-4 rounded-xl font-bold text-center transition-all duration-300 ${
                                activeTab === 'DINAMICAS'
                                    ? 'bg-blue-200 text-blue-950 shadow-md'
                                    : 'bg-transparent text-white/50'
                            }`}
                        >
                            Dinâmicas
                        </button>
                        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-blue-900">
                            <button onClick={() => { handleActionClick('FOLDER'); setMobileMenuOpen(false); }} className="text-white font-bold p-3">Planos</button>
                            <button onClick={() => { handleActionClick('KITS'); setMobileMenuOpen(false); }} className="text-white font-bold p-3">Kits</button>
                        </div>
                    </div>
                </div>
            )}

            {/* MAIN CONTENT */}
            <main className="flex-grow flex flex-col items-center justify-center w-full px-4 sm:px-8 mb-12 sm:mb-20">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-6 sm:mb-12 italic text-center tracking-tight">
                    {activeTab === 'ENTIDADES' ? 'Banca da Ciência' : 'Espaço Gamer'}
                </h1>

                {/* SUBSEÇÃO: HOME (ENTIDADES) */}
                {activeTab === 'ENTIDADES' && (
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 w-full max-w-6xl animate-fade-in">

                        {/* Lado Esquerdo: Carrossel com a Imagem */}
                        <div className="flex items-center gap-3 sm:gap-6">
                            <button
                                onClick={prevSlide}
                                className="z-10 bg-banca-escuro/80 hover:bg-banca-escuro text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xl border border-white/20 text-xl md:text-2xl hover:scale-110 flex-shrink-0"
                            >
                                &#10094;
                            </button>

                            <div className="flex flex-col items-center gap-4 sm:gap-6 w-[140px] sm:w-[280px]">
                                {/* Imagem em Destaque (Clica para abrir galeria) */}
                                <button
                                    onClick={() => handleActionClick(mainEntity.id)}
                                    className="group relative w-32 h-32 sm:w-64 sm:h-64 rounded-full border-4 border-white/30 bg-banca-escuro/40 backdrop-blur-sm p-2 sm:p-4 overflow-hidden shadow-2xl group-hover:border-white transition-all flex items-center justify-center"
                                    title="Clique para ver a galeria e mais infos!"
                                >
                                    <img
                                        src={mainEntity.src}
                                        alt={mainEntity.name}
                                        className="w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                                    />

                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-white font-bold text-xs sm:text-base bg-blue-600/90 px-3 py-1 sm:px-4 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2">
                                            Galeria
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                                        </span>
                                    </div>
                                </button>

                                {/* Próximas Entidades - Ocultas no mobile para poupar espaço e focar no texto */}
                                <div className="hidden sm:flex gap-4 justify-center w-full">
                                    {subEntities.slice(0, 2).map((entity) => (
                                        <div key={`sub-${entity.id}`} className="flex flex-col items-center gap-2 opacity-60">
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white/20 bg-banca-escuro/30 p-2 overflow-hidden">
                                                <img src={entity.src} alt={entity.name} className="w-full h-full object-contain" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={nextSlide}
                                className="z-10 bg-banca-escuro/80 hover:bg-banca-escuro text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xl border border-white/20 text-xl md:text-2xl hover:scale-110 flex-shrink-0"
                            >
                                &#10095;
                            </button>
                        </div>

                        {/* Lado Direito: Informações Displayadas */}
                        <div className="w-full lg:w-[500px] bg-banca-escuro/70 backdrop-blur-md border border-white/20 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl text-white text-left">
                            <h2 className="text-2xl sm:text-5xl font-black mb-3 sm:mb-4 border-b border-white/20 pb-3 sm:pb-4 text-blue-200">
                                {mainEntity.name}
                            </h2>
                            <div className="text-sm sm:text-base md:text-lg leading-relaxed space-y-2 sm:space-y-3 opacity-90 min-h-[100px] sm:min-h-[120px]">
                                {subprojetosData[mainEntity.id]}
                            </div>
                            <button
                                onClick={() => handleActionClick(mainEntity.id)}
                                className="mt-5 sm:mt-6 w-full sm:w-auto bg-blue-950 text-banca-escuro font-black text-xs sm:text-sm uppercase px-6 sm:px-8 py-3 rounded-full hover:bg-blue-100 hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                Detalhes e Fotos
                            </button>
                        </div>

                    </div>
                )}

                {/* SUBSEÇÃO: DINÂMICAS (SITE DE JOGOS) */}
                {activeTab === 'DINAMICAS' && (
                    <div className="w-full max-w-6xl animate-fade-in">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                            {dinamicasData.map((jogo) => (
                                <button
                                    key={`jogo-${jogo.id}`}
                                    onClick={() => handleActionClick(jogo.id)}
                                    className="group relative aspect-square bg-banca-escuro/80 backdrop-blur-md rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-banca-escuro hover:border-white overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_5px_15px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center p-3 sm:p-6"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

                                    <img
                                        src={jogo.src}
                                        alt={jogo.label}
                                        className="w-3/5 h-3/5 sm:w-3/4 sm:h-3/4 object-contain filter drop-shadow-2xl z-10 group-hover:-translate-y-2 sm:group-hover:-translate-y-4 transition-transform duration-300"
                                    />

                                    {/* Botão "Jogar" que sobe no hover */}
                                    <div className="absolute bottom-[-40px] group-hover:bottom-3 sm:bottom-[-50px] sm:group-hover:bottom-4 transition-all duration-300 z-20">
                                        <span className="bg-blue-950 text-banca-escuro font-black text-[10px] sm:text-sm uppercase px-4 py-1.5 sm:px-6 sm:py-2 rounded-full shadow-lg flex items-center gap-1 sm:gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                            </svg>
                                            Jogar
                                        </span>
                                    </div>

                                    {/* Título Estático (Some no hover) */}
                                    <h3 className="absolute bottom-2 sm:bottom-4 text-white font-black text-xs sm:text-lg tracking-wide opacity-100 group-hover:opacity-0 transition-opacity z-10">
                                        {jogo.label}
                                    </h3>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <Footer />

            {/* MODAIS */}

            {/* Modal KITS */}
            {activeModal === 'KITS' && (
                <div className="fixed inset-0 bg-banca-escuro/90 dark:bg-gray-900/95 z-50 flex items-center justify-center p-4 backdrop-blur-md transition-colors duration-300">
                    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl transition-colors duration-300">

                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-6 text-4xl text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            &times;
                        </button>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 mt-6 sm:mt-0">
                            {kits.map(kit => (
                                <button
                                    key={kit.id}
                                    onClick={() => openModal('DRIVE_VIEWER', kit.id)}
                                    className="flex flex-col items-center group outline-none"
                                >
                                    {/* Container da Imagem */}
                                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800 shadow-md hover:shadow-xl dark:shadow-none dark:hover:shadow-[0_0_20px_rgba(96,165,250,0.2)] border-2 border-gray-200 dark:border-slate-700 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-all duration-300">

                                        {/* Imagem com efeito de zoom no hover */}
                                        <img
                                            src={kit.coverImagePath}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                                            alt={kit.name}
                                        />

                                        {/* Overlay escuro sutil que aparece no hover */}
                                        <div className="absolute inset-0 bg-black/10 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                    </div>

                                    {/* Texto do Produto */}
                                    <p className="mt-3 font-semibold text-sm sm:text-base text-gray-700 dark:text-gray-300 text-center transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                        {kit.name}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Fóton */}
            {activeModal === 'FOTON' && (
                <div className={`fixed inset-0 bg-banca-escuro/95 z-[100] flex items-center justify-center ${isFullscreen ? '' : 'p-2 sm:p-4'} backdrop-blur-md`}>
                    <div className={modalContainerClass}>
                        <div className="flex justify-end gap-2 p-2 sm:p-4 absolute top-0 left-0 right-0 z-50 pointer-events-none">
                            <button onClick={() => setIsFullscreen(!isFullscreen)} className="pointer-events-auto bg-blue-600/90 hover:bg-blue-800 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors">
                                {isFullscreen ? 'R' : 'F'}
                            </button>
                            <button onClick={handleCloseModal} className="pointer-events-auto bg-white/60 hover:bg-red-600 hover:text-white text-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-2xl shadow-lg transition-colors">&times;</button>
                        </div>

                        {!isFullscreen && (
                            <div className="shrink-0 p-4 sm:p-8 bg-blue-50 border-b-4 border-banca-claro pt-14 sm:pt-16">
                                <p className="text-[#0c3d7a] text-center text-xs sm:text-base md:text-lg leading-relaxed font-medium">
                                    Esta atividade interativa apresenta um <strong>storytelling envolvente sobre óptica</strong>.
                                </p>
                            </div>
                        )}

                        <div className="flex-1 w-full min-h-0 relative bg-black">
                            <iframe src={links.foton} className="absolute inset-0 w-full h-full border-none" title="Conteúdo Atividade Fóton" allowFullScreen />
                        </div>
                    </div>
                </div>
            )}

            {/* Modal INFO ENTIDADES */}
            {activeModal === 'SUBPROJETO_INFO' && payload && (
                <div className="fixed inset-0 bg-banca-escuro/95 z-[60] flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm" onClick={handleCloseModal}>
                    <div className="bg-[#032a4c] text-[#e1f0ff] rounded-2xl sm:rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col relative shadow-2xl border border-blue-500/30 overflow-hidden" onClick={e => e.stopPropagation()}>

                        <div className="flex justify-between items-center p-5 sm:p-8 border-b border-blue-800 shrink-0 bg-banca-escuro">
                            <h2 className="text-2xl sm:text-4xl font-black text-white">
                                {entidadesData.find(e => e.id === payload)?.name || payload}
                            </h2>
                            <button onClick={handleCloseModal} className="text-4xl text-blue-300 hover:text-white transition-colors leading-none">&times;</button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                                <div className="space-y-6">
                                    <div className="text-sm sm:text-lg leading-relaxed bg-blue-900/20 p-5 sm:p-6 rounded-2xl border border-blue-500/20">
                                        {subprojetosData[payload]}
                                    </div>
                                    <div className="bg-blue-950/50 p-5 sm:p-6 rounded-2xl border border-blue-800/50 text-sm sm:text-base opacity-80">
                                        <p><strong>Mais detalhes:</strong> Aqui você pode incluir os links de inscrição, horários detalhados, professores responsáveis ou o histórico específico deste braço do projeto.</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-bold text-lg sm:text-xl text-blue-200 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/></svg>
                                        Galeria de Ações
                                    </h3>

                                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                        {[1, 2, 3, 4].map((fotoIndex) => (
                                            <div key={fotoIndex} className="aspect-square bg-blue-950 rounded-xl border border-blue-800 flex items-center justify-center overflow-hidden group cursor-pointer hover:border-blue-400 transition-colors">
                                                {fotoIndex === 1 ? (
                                                    <img src={entidadesData.find(e => e.id === payload)?.src} alt={`Galeria ${fotoIndex}`} className="w-1/2 opacity-30 group-hover:scale-110 transition-transform duration-300" />
                                                ) : (
                                                    <span className="text-blue-800/50 font-black text-xs sm:text-sm">FOTO {fotoIndex}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-blue-300/50 text-center mt-2">Clique nas fotos para ampliar (em breve)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {embedUrl && (
                <div className={`fixed inset-0 bg-black/90 z-[200] flex items-center justify-center ${isFullscreen ? '' : 'p-2 sm:p-4'}`} onClick={handleCloseEmbed}>
                    <div className={modalContainerClass.replace('bg-white', 'bg-black')} onClick={e => e.stopPropagation()}>
                        <div className="absolute top-2 right-2 flex gap-2 z-50 pointer-events-none">
                            <button onClick={handleCloseEmbed} className="pointer-events-auto bg-red-600/90 hover:bg-red-800 text-white px-3 py-1.5 rounded text-xs shadow-md">Fechar</button>
                        </div>
                        <div className="flex-1 w-full min-h-0 relative">
                            <iframe src={embedUrl} title="Visualização" className="absolute inset-0 w-full h-full border-none" allowFullScreen />
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
            {activeModal === 'PRESSAO' && (
                <div className="fixed inset-0 bg-banca-escuro/95 dark:bg-gray-900/95 z-[100] flex items-center justify-center p-2 sm:p-4 backdrop-blur-md transition-colors duration-300">
                    <div className="bg-[#e1f0ff] dark:bg-gray-800 p-4 sm:p-8 rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto relative text-banca-escuro dark:text-gray-100 shadow-2xl transition-colors duration-300">

                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-4 sm:top-4 sm:right-6 text-3xl sm:text-4xl text-blue-900 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100 transition-colors"
                        >
                            &times;
                        </button>

                        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-0">
                            <div className="flex flex-col items-center w-full">
                                <h2 className="text-xl sm:text-2xl font-black mb-4 uppercase text-center w-full">
                                    Simulador de Pressão
                                </h2>
                                <iframe
                                    src="https://scratch.mit.edu/projects/1239452553/embed"
                                    className="rounded-xl shadow-lg w-full aspect-[4/3] max-w-[485px] bg-white dark:bg-gray-700"
                                    allowFullScreen
                                />
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold border-b border-blue-300 dark:border-gray-600 pb-2">
                                    Desafio de Física
                                </h3>
                                <p className="text-sm">
                                    Sabendo que a cada 10m de profundidade a pressão aumenta 1 atm, responda:
                                </p>

                                <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-inner dark:shadow-md transition-colors duration-300">
                                    <p className="text-sm font-semibold">
                                        Qual a pressão total a 10m de profundidade?
                                    </p>
                                    <input
                                        type="number"
                                        id="ex-pressao"
                                        className="w-full mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                                        placeholder="Resposta em atm..."
                                    />
                                    <button
                                        onClick={() => {
                                            const val = (document.getElementById('ex-pressao') as HTMLInputElement).value;
                                            alert(val === "2" ? "Correto! 1 atm (ar) + 1 atm (água)" : "Tente novamente!");
                                        }}
                                        className="mt-3 bg-blue-600 dark:bg-blue-500 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 dark:hover:bg-blue-600 w-full sm:w-auto transition-colors"
                                    >
                                        Verificar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeModal === 'SUBPROJETOS' && (
                <div className="fixed inset-0 bg-banca-escuro/90 z-50 flex items-center justify-center p-4" onClick={handleCloseModal}>
                    <div className="bg-white p-6 sm:p-8 rounded-3xl max-w-4xl w-full relative" onClick={e => e.stopPropagation()}>
                        <button onClick={handleCloseModal} className="absolute top-4 right-6 text-4xl text-gray-400 hover:text-gray-600">&times;</button>
                        <h2 className="text-2xl font-black text-banca-escuro mb-6 text-center">Conheça nossas Entidades</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-0">
                            {entidadesData.map(sub => (
                                <button
                                    key={sub.id}
                                    onClick={() => openModal('SUBPROJETO_INFO', sub.id)}
                                    className="p-4 sm:p-6 bg-gray-100 rounded-2xl font-black text-xs sm:text-base text-banca-escuro hover:bg-banca-claro hover:text-white transition-all shadow-sm"
                                >
                                    {sub.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {activeModal === 'HISTORICO' && (
                <div className="fixed inset-0 bg-banca-escuro/70 z-[199] flex items-center justify-center p-4">
                    <div className="relative w-full max-w-[700px] bg-blue-950 rounded-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-xl">
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
                            {/* Apenas mantive o seu código. Se o e-mail não deve abrir o 'ASTRO', mude para <a href="mailto:..." /> */}
                            <p><strong>E-mail:</strong> <button onClick={() => openModal('ASTRO')} className="text-blue-600 underline hover:text-blue-800 break-all">bancadacienciausp@gmail.com</button></p>
                            <p><strong>Celular (Monitora Chelsee):</strong> +55 11 99602-2662</p>
                            <p><strong>Celular (Monitora Samara):</strong> +55 11 97107-2398</p>
                            <p><strong>Celular (Monitor Lukas):</strong> +55 11 96131-1112</p>
                        </div>
                    </div>
                </div>
            )}
            {/* Embed do Drive */}
            {activeModal === 'DRIVE_VIEWER' && payload && (
                <InternalDriveViewer fileId={payload} onClose={handleCloseModal} />
            )}
        </div>
    );
};