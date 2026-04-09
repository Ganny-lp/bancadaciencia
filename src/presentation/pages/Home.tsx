import React, { useEffect, useState } from "react";
//import VLibras from "vlibras-react"; // <-- NOVO IMPORT AQUI tava dando conflito no npm install, mas libras ainda funciona 
import { useModal } from "../contexts/ModalContext";
import { Material } from "../../domain/entities/Material";
import { InternalDriveViewer } from "../components/InternalDriveViewer";
import { Footer } from "../components/Footer";
import { HomeHeader } from "../components/HomeHeader";
import { EntitiesSection } from "../components/EntitiesSection";
import { DynamicsSection } from "../components/DynamicsSection";
import { AboutUsSection } from "../components/AboutUsSection";
import { EmbedModal } from "../components/EmbedModal";
import { HistoricModal } from "../components/HistoricModal";
import {
  KitsModal,
  FotonModal,
  SubprojetoInfoModal,
  YodaModal,
  PressaoModal,
  SubprojetosModal,
} from "../components/modals";
import { MaterialRepositoryImpl } from "../../infrastructure/repositories/MaterialRepositoryImpl";
import { GetMaterialsUseCase } from "../../domain/usecases/GetMaterialsUseCase";
import { GetExternalLinksUseCase } from "../../domain/usecases/GetExternalLinksUseCase";
import { getSubprojectContent } from "../config/subprojectsContent";
import { handleActionClick, HomeContext } from "../config/modalConfig";
import { VLibrasWidget } from "../components/VLibrasWidget.tsx";

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

  const handleKitClick = (kitId: string) => {
    openModal("DRIVE_VIEWER", kitId);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden font-sans">
      {/* Header */}
      <HomeHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={setMobileMenuOpen}
        onHistoryClick={() => openModal("HISTORICO")}
        onPlansClick={() => handleButtonClick("FOLDER")}
        onKitsClick={() => handleButtonClick("KITS")}
      />

      {/* Main Content */}
      <main className="grow flex flex-col items-center justify-center w-full px-4 sm:px-8 mb-12 sm:mb-20">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-6 sm:mb-12 italic text-center tracking-tight">
          {activeTab === "ENTIDADES" && "Banca da Ciência"}
          {activeTab === "DINAMICAS" && "Espaço Gamer"}
        </h1>

        {activeTab === "ENTIDADES" && (
          <div className="w-full flex flex-col items-center gap-16">
            <AboutUsSection onEntityClick={handleButtonClick} />
            <div className="w-full flex justify-center">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>
            <EntitiesSection onEntityClick={handleButtonClick} />
          </div>
        )}

        {activeTab === "DINAMICAS" && (
          <DynamicsSection onGameClick={handleButtonClick} />
        )}
      </main>

      <Footer />

      {/* Modals */}
      {activeModal === "KITS" && <KitsModal kits={kits} onClose={closeModal} />}

      {activeModal === "FOTON" && (
        <FotonModal fotonUrl={links.foton} onClose={closeModal} />
      )}

      {activeModal === "SUBPROJETO_INFO" && payload && (
        <SubprojetoInfoModal payload={payload} onClose={closeModal} />
      )}

      {activeModal === "YODA" && (
        <YodaModal yodaUrl={links.yoda} onClose={closeModal} />
      )}

      {activeModal === "PRESSAO" && <PressaoModal onClose={closeModal} />}

      {activeModal === "SUBPROJETOS" && (
        <SubprojetosModal
          onClose={closeModal}
          onSelectSubproject={(id) => openModal("SUBPROJETO_INFO", id)}
        />
      )}

      {/* Embed Modal */}
      <EmbedModal
        embedUrl={embedUrl}
        onClose={() => setEmbedUrl(null)}
        isFullscreen={false}
        onFullscreenChange={() => {}}
      />

      {/* Historic Modal */}
      {activeModal === "HISTORICO" && (
        <HistoricModal
          onClose={closeModal}
          onEmailClick={() => openModal("ASTRO")}
        />
      )}

      {/* Drive Viewer */}
      {activeModal === "DRIVE_VIEWER" && payload && (
        <InternalDriveViewer fileId={payload} onClose={closeModal} />
      )}

      {/* Nosso novo componente do VLibras */}
      <VLibrasWidget />
    </div>
  );
};
