import React from "react";

// 👇 Criamos uma interface para receber a função de clique
interface AboutUsProps {
    onEntityClick: (id: string) => void;
}

export const AboutUsSection: React.FC<AboutUsProps> = ({ onEntityClick }) => {
    // Organizando os núcleos em uma lista para facilitar a criação dos botões
    const nucleos = [
        { id: "AGNES", icon: "🧪", name: "AGNES", desc: "Saúde e bem-estar" },
        { id: "BREEDLOVE", icon: "🌿", name: "BREEDLOVE", desc: "Cosméticos naturais" },
        { id: "JUDITH", icon: "🤖", name: "JUDITH", desc: "Robótica e cultura maker" },
        { id: "LEAH", icon: "🍎", name: "LEAH", desc: "Alimentação e ecologia" },
        { id: "MAATHAI", icon: "🎨", name: "MAATHAI", desc: "Meio ambiente e arte" },
        { id: "NNEDI", icon: "🛸", name: "NNEDI", desc: "Ficção científica e cultura" },
        { id: "OUMOU", icon: "👗", name: "OUMOU", desc: "Moda e design" },
        { id: "TEBELLO", icon: "🔬", name: "TEBELLO", desc: "Experimentos de baixo custo" },
    ];

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-5xl animate-fade-in px-4">

            <div className="bg-black/30 p-8 sm:p-12 rounded-3xl backdrop-blur-sm border border-white/10 shadow-xl w-full">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 text-center">
                    Nossa Missão
                </h2>

                <div className="text-base sm:text-lg text-white/90 leading-relaxed space-y-6 text-justify sm:text-left">

                    <p>
                        Somos um projeto de extensão universitária vinculado à iniciativa <strong>Banca da Ciência</strong>.
                        Nosso foco é realizar oficinas interativas de divulgação científica com crianças e adolescentes,
                        especialmente de comunidades periféricas da Zona Leste de São Paulo.
                    </p>

                    <p>
                        Nossas atividades ocorrem em escolas públicas e centros comunitários, como o CCA Jardim Keralux,
                        e são conduzidas por estudantes da graduação da <strong>EACH-USP</strong>. Nosso objetivo é articular
                        ciência, cultura, tecnologia e cidadania por meio de experiências práticas, criativas e acessíveis,
                        promovendo a equidade e a formação crítica.
                    </p>


                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors flex flex-col justify-center text-center sm:text-left">
                        <h3 className="text-xl font-semibold text-white mb-2">Educação</h3>
                        <p className="text-sm text-white/80">
                            Levando ciência de forma lúdica através de kits, experimentos e materiais didáticos.
                        </p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors flex flex-col justify-center text-center sm:text-left">
                        <h3 className="text-xl font-semibold text-white mb-2">Tecnologia</h3>
                        <p className="text-sm text-white/80">
                            Utilizando dinâmicas gamificadas para explorar novos horizontes do conhecimento.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};