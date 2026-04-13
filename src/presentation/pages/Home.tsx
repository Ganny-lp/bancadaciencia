import React, { useEffect, useState, lazy, Suspense } from "react";
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
import { VLibrasWidget } from "../components/VLibrasWidget.tsx";
import { MaterialRepositoryImpl } from "../../infrastructure/repositories/MaterialRepositoryImpl";
import { GetMaterialsUseCase } from "../../domain/usecases/GetMaterialsUseCase";
import { GetExternalLinksUseCase } from "../../domain/usecases/GetExternalLinksUseCase";
import { getSubprojectContent } from "../config/subprojectsContent";
import { handleActionClick, HomeContext } from "../config/modalConfig";

// Lazy loading dos modais para melhor performance
const KitsModal = lazy(() =>
  import("../components/modals").then((m) => ({ default: m.KitsModal })),
);
const FotonModal = lazy(() =>
  import("../components/modals").then((m) => ({ default: m.FotonModal })),
);
const SubprojetoInfoModal = lazy(() =>
  import("../components/modals").then((m) => ({
    default: m.SubprojetoInfoModal,
  })),
);
const YodaModal = lazy(() =>
  import("../components/modals").then((m) => ({ default: m.YodaModal })),
);
const PressaoModal = lazy(() =>
  import("../components/modals").then((m) => ({ default: m.PressaoModal })),
);
const SubprojetosModal = lazy(() =>
  import("../components/modals").then((m) => ({ default: m.SubprojetosModal })),
);

const repository = new MaterialRepositoryImpl();
const getMaterialsUseCase = new GetMaterialsUseCase(repository);
const getLinksUseCase = new GetExternalLinksUseCase();

type TabType = "ENTIDADES" | "DINAMICAS";

export const Home = () => {
  const { activeModal, payload, openModal, closeModal } = useModal();
  const [kits, setKits] = useState<Material[]>([]);
  const links = getLinksUseCase.execute();
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("ENTIDADES");

  useEffect(() => {
    getMaterialsUseCase.executeKits().then(setKits);
  }, []);

  const handleButtonClick = (id: string) => {
    const context: HomeContext = {
      setEmbedUrl,
      links,
      openModal: openModal as any,
      getSubprojectContent,
    };
    handleActionClick(id, context);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleModalOpen = (modalName: string, modalPayload?: any) => {
    openModal(modalName as any, modalPayload);
  };

  const handleModalClose = () => {
    closeModal();
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden font-sans">
      {/* Skip to content link para acessibilidade */}
      <a href="#main-content" className="skip-to-content">
        Ir para o conteúdo principal
      </a>

      {/* Header */}
      <HomeHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={setMobileMenuOpen}
        onPlansClick={() => handleButtonClick("FOLDER")}
        onKitsClick={() => handleButtonClick("KITS")}
      />

      {/* Main Content */}
      <main
        id="main-content"
        className="grow flex flex-col items-center justify-center w-full px-4 sm:px-8 mb-12 sm:mb-20"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-6 sm:mb-12 italic text-center tracking-tight">
          {activeTab === "ENTIDADES" && "Banca da Ciência"}
          {activeTab === "DINAMICAS" && "Espaço Gamer"}
        </h1>

        {activeTab === "ENTIDADES" && (
          <div className="w-full flex flex-col items-center gap-16">
            <AboutUsSection onEntityClick={handleButtonClick} />
            
            {/* Texto de transição */}
            <div className="w-full flex flex-col items-center gap-4">
              <div className="h-px w-32 bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
              <p className="text-white/70 text-center text-sm sm:text-base italic max-w-2xl px-4">
                "Da Zona Leste de São Paulo para o mundo: ciência, criatividade e transformação social"
              </p>
              <div className="h-px w-32 bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
            </div>
            
            <EntitiesSection onEntityClick={handleButtonClick} />
            
            {/* Seção de Contatos */}
            <ContactsSection />
          </div>
        )}

        {activeTab === "DINAMICAS" && (
          <DynamicsSection onGameClick={handleButtonClick} />
        )}
      </main>

      <Footer />

      {/* Modals com Lazy Loading e Suspense */}
      <Suspense
        fallback={<LoadingSpinner message="Carregando..." fullScreen />}
      >
        {activeModal === "KITS" && (
          <KitsModal kits={kits} onClose={handleModalClose} />
        )}

        {activeModal === "FOTON" && (
          <FotonModal fotonUrl={links.foton} onClose={handleModalClose} />
        )}

        {activeModal === "SUBPROJETO_INFO" && payload && (
          <SubprojetoInfoModal payload={payload} onClose={handleModalClose} />
        )}

        {activeModal === "YODA" && (
          <YodaModal yodaUrl={links.yoda} onClose={handleModalClose} />
        )}

        {activeModal === "PRESSAO" && (
          <PressaoModal onClose={handleModalClose} />
        )}

        {activeModal === "SUBPROJETOS" && (
          <SubprojetosModal
            onClose={handleModalClose}
            onSelectSubproject={(id) => handleModalOpen("SUBPROJETO_INFO", id)}
          />
        )}
      </Suspense>

      {/* Embed Modal */}
      <EmbedModal
        embedUrl={embedUrl}
        onClose={() => setEmbedUrl(null)}
        isFullscreen={false}
        onFullscreenChange={() => {}}
      />

      {/* Drive Viewer */}
      {activeModal === "DRIVE_VIEWER" && payload && (
        <InternalDriveViewer fileId={payload} onClose={handleModalClose} />
      )}

      {/* VLibras Widget */}
      <VLibrasWidget />

      {/* Accessibility Toolbar */}
      <AccessibilityToolbar />
    </div>
  );
};
