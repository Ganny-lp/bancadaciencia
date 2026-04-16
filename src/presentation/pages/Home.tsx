import React, { useState, lazy, Suspense, useCallback } from "react";
import { useModal } from "../contexts/ModalContext";
import { Material } from "../../domain/entities/Material";
import { InternalDriveViewer } from "../components/InternalDriveViewer";
import { Footer } from "../components/Footer";
import { HomeHeader } from "../components/HomeHeader";
import { EntitiesSection } from "../components/EntitiesSection";
import { DynamicsSection } from "../components/DynamicsSection";
import { AboutUsSection } from "../components/AboutUsSection";
import { ContactsSection } from "../components/ContactsSection";
import { EmbedModal } from "../components/EmbedModal";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AccessibilityToolbar } from "../components/AccessibilityToolbar";
import { MaterialRepositoryImpl } from "../../infrastructure/repositories/MaterialRepositoryImpl";
import { GetMaterialsUseCase } from "../../domain/usecases/GetMaterialsUseCase";
import { GetExternalLinksUseCase } from "../../domain/usecases/GetExternalLinksUseCase";
import { getSubprojectContent } from "../config/subprojectsContent";
import { handleActionClick, HomeContext } from "../config/modalConfig";

const KitsModal = lazy(() => import("../components/modals").then((m) => ({ default: m.KitsModal })));
const FotonModal = lazy(() => import("../components/modals").then((m) => ({ default: m.FotonModal })));
const SubprojetoInfoModal = lazy(() => import("../components/modals").then((m) => ({ default: m.SubprojetoInfoModal })));
const YodaModal = lazy(() => import("../components/modals").then((m) => ({ default: m.YodaModal })));
const PressaoModal = lazy(() => import("../components/modals").then((m) => ({ default: m.PressaoModal })));
const SubprojetosModal = lazy(() => import("../components/modals").then((m) => ({ default: m.SubprojetosModal })));

const repository = new MaterialRepositoryImpl();
const getMaterialsUseCase = new GetMaterialsUseCase(repository);
const getLinksUseCase = new GetExternalLinksUseCase();

type TabType = "ENTIDADES" | "DINAMICAS";

export const Home = () => {
    const { activeModal, payload, openModal, closeModal } = useModal();
    const [kits, setKits] = useState<Material[]>([]);
    const [kitsLoaded, setKitsLoaded] = useState(false);
    const [loadingKits, setLoadingKits] = useState(false);
    const links = getLinksUseCase.execute();
    const [embedUrl, setEmbedUrl] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>("ENTIDADES");

    const loadKits = useCallback(async () => {
        if (!kitsLoaded && !loadingKits) {
            setLoadingKits(true);
            try {
                const data = await getMaterialsUseCase.executeKits();
                const uniqueData = data.filter(
                    (kit, index, self) => self.findIndex((k) => k.id === kit.id) === index
                );
                setKits(uniqueData);
                setKitsLoaded(true);
            } catch (error) {
                console.error("Erro ao carregar kits:", error);
            } finally {
                setLoadingKits(false);
            }
        }
    }, [kitsLoaded, loadingKits]);

    const handleButtonClick = (id: string) => {
        if (id === "KITS") {
            void loadKits();
        }
        const context: HomeContext = {
            setEmbedUrl,
            links,
            openModal: openModal as any,
            getSubprojectContent,
        };
        handleActionClick(id, context);
    };

    const handleTabChange = (tab: TabType) => setActiveTab(tab);
    const handleModalOpen = (modalName: string, modalPayload?: any) => openModal(modalName as any, modalPayload);
    const handleModalClose = () => closeModal();

    return (
        <div className="min-h-screen flex flex-col relative overflow-x-hidden font-sans">
            <a href="#main-content" className="skip-to-content">Ir para o conteúdo principal</a>

            <HomeHeader
                activeTab={activeTab}
                onTabChange={handleTabChange}
                mobileMenuOpen={mobileMenuOpen}
                onMobileMenuToggle={setMobileMenuOpen}
                onPlansClick={() => handleButtonClick("FOLDER")}
                onKitsClick={() => handleButtonClick("KITS")}
            />

            <main id="main-content" className="grow flex flex-col items-center justify-center w-full px-4 sm:px-8 mb-12 sm:mb-20">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-6 sm:mb-12 italic text-center tracking-tight">
                    {activeTab === "ENTIDADES" && "Banca da Ciência"}
                    {activeTab === "DINAMICAS" && "Espaço Gamer"}
                </h1>

                {activeTab === "ENTIDADES" && (
                    <div className="w-full flex flex-col items-center">
                        <AboutUsSection onEntityClick={handleButtonClick} />

                        <section className="w-full max-w-6xl mx-auto my-16 sm:my-24 px-4">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                                    <span className="text-[120px] sm:text-[180px] md:text-[220px] font-black text-white select-none">SP</span>
                                </div>
                                <blockquote className="relative text-center">
                                    <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-relaxed tracking-wide text-white/90 italic max-w-4xl mx-auto">
                    <span className="bg-gradient-to-r from-purple-700 to-white bg-clip-text text-transparent font-bold not-italic">
                      "Da Zona Leste de São Paulo
                    </span>
                                        <br className="hidden sm:block" /> para o mundo:
                                        <br />
                                        <span className="font-light not-italic text-white/80">
                      ciência, criatividade e transformação social"
                    </span>
                                    </p>
                                    <footer className="mt-6 flex items-center justify-center gap-2 text-white/50">
                                        <div className="h-px w-8 bg-white/30"></div>
                                        <cite className="text-xs sm:text-sm uppercase tracking-widest not-italic">Nossa Missão</cite>
                                        <div className="h-px w-8 bg-white/30"></div>
                                    </footer>
                                </blockquote>
                            </div>
                        </section>

                        <EntitiesSection onEntityClick={handleButtonClick} />
                        <ContactsSection />
                    </div>
                )}

                {activeTab === "DINAMICAS" && <DynamicsSection onGameClick={handleButtonClick} />}
            </main>

            <Footer />

            <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs z-50"><LoadingSpinner message="Carregando..." /></div>}>
                {activeModal === "KITS" && (
                    <KitsModal
                        kits={kits}
                        onClose={handleModalClose}
                        onKitClick={(kit) => {
                            const fileId = (kit as any).driveFileId || kit.id;
                            openModal("DRIVE_VIEWER", fileId);
                        }}
                    />
                )}
                {activeModal === "FOTON" && <FotonModal fotonUrl={links.foton} onClose={handleModalClose} />}
                {activeModal === "SUBPROJETO_INFO" && payload && <SubprojetoInfoModal payload={payload} onClose={handleModalClose} />}
                {activeModal === "YODA" && <YodaModal yodaUrl={links.yoda} onClose={handleModalClose} />}
                {activeModal === "PRESSAO" && <PressaoModal onClose={handleModalClose} />}
                {activeModal === "SUBPROJETOS" && <SubprojetosModal onClose={handleModalClose} onSelectSubproject={(id) => handleModalOpen("SUBPROJETO_INFO", id)} />}
            </Suspense>

            <EmbedModal embedUrl={embedUrl} onClose={() => setEmbedUrl(null)} isFullscreen={false} onFullscreenChange={() => {}} />
            {activeModal === "DRIVE_VIEWER" && payload && <InternalDriveViewer fileId={payload} onClose={handleModalClose} />}
            <AccessibilityToolbar />
        </div>
    );
};