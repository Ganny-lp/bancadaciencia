import React from 'react';

export const InternalDriveViewer: React.FC<{ fileId: string, onClose: () => void }> = ({ fileId, onClose }) => {
    const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;

    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-2 md:p-8 backdrop-blur-md transition-opacity">
            <div className="w-full max-w-6xl h-[95vh] md:h-[85vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">

                <div className="flex justify-between items-center p-3 md:p-5 bg-gray-100 border-b border-gray-300">
                    <h2 className="text-lg md:text-2xl font-bold text-gray-800 line-clamp-1">Visualizador Banca da Ciência</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-600 font-bold text-3xl md:text-4xl leading-none transition-transform hover:scale-110 p-2"
                        aria-label="Fechar"
                    >
                        &times;
                    </button>
                </div>

                <div className="flex-grow w-full h-full relative bg-gray-50">
                    <div className="absolute inset-0 flex items-center justify-center -z-10">
                        <span className="text-gray-400 animate-pulse font-medium">A carregar documento do Drive...</span>
                    </div>
                    <iframe
                        src={previewUrl}
                        className="w-full h-full border-0 relative z-10 bg-transparent"
                        allow="autoplay"
                        title="Visualizador Google Drive"
                    />
                </div>
            </div>
        </div>
    );
};