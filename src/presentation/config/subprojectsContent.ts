import React from "react";

// Helper para contornar CORS do Google Drive usando proxy de imagens
export const getImageUrl = (googleDriveUrl: string | undefined): string | undefined => {
  if (!googleDriveUrl) return undefined;
  // Usa images.weserv.nl como proxy para contornar CORS
  return `https://images.weserv.nl/?url=${encodeURIComponent(googleDriveUrl)}&w=400`;
};

export interface SubprojectContent {
  id: string;
  title: string;
  social?: string;
  description: string;
  details: string;
  profileImage?: string;
}

export const subprojectsContent: SubprojectContent[] = [
  {
    id: "OUMOU",
    title: "Oumou",
    social: "@oumou.oficinas",
    description:
      "Homenageia Oumou Sy, ícone da moda senegalesa. Oferece espaço onde costura, design e artesanato se unem para criar peças originais, fortalecendo habilidades manuais e criativas.",
    details: "Faixa etária: 11 a 14 anos | Dia: Quinta-feira (14h às 16h)",
  },
  {
    id: "AGNES",
    title: "Agnes",
    profileImage:
      "https://drive.google.com/uc?export=view&id=1zLUnkD3RE1CbCFQrBorpKPpC4NfXz-g6&confirm=t",
    description:
      "Cuidados em saúde, oficinas práticas e discussões sobre sustentabilidade e higiene para o mundo das mulheres.",
    details:
      "Público: Meninas de 11 a 14 anos | Dia: Quarta e Sexta (14h às 16h)",
  },
  {
    id: "JUDITH",
    title: "Judith",
    social: "@projetojudith",
    profileImage:
      "https://drive.google.com/uc?export=view&id=1AeGDP4wgTLyFGYG5ae2yIX9CtZefwqJZ&confirm=t",
    description:
      "Cultura Maker e Robótica para emancipação e empoderamento de jovens no Jardim Keralux.",
    details: "Faixa etária: 8 a 14 anos | Segundas: 9h | Terças: 14h",
  },
  {
    id: "LEAH",
    title: "Leah",
    social: "@grupo.leah",
    profileImage:
      "https://drive.google.com/uc?export=view&id=1M8TzFgD4zJQEPoLvGe3PCY9XSPJa3bey&confirm=t",
    description:
      "Alimentação humanizada, justa e sustentável inspirada em Leah Penniman.",
    details: "Público: 7 a 14 anos | Dia: Segunda (8h) e Sexta (14h)",
  },
  {
    id: "TEBELLO",
    title: "Tebello",
    profileImage:
      "https://drive.google.com/uc?export=view&id=1AM9cA1kAtFv7T4Rd4CfriYYNaFqPRfs4&confirm=t",
    description:
      "Física, Química e Biologia de forma lúdica com experimentos de baixo custo.",
    details: "Público: 11 a 14 anos | Dia: Quarta-feira (14h às 16h)",
  },
  {
    id: "BREEDLOVE",
    title: "Breedlove",
    profileImage:
      "https://drive.google.com/uc?export=view&id=1d-3A6ra5K4KYW6m4WRQ8gZOKHPKMMbaZ&confirm=t",
    description:
      "Práticas sustentáveis e criação de produtos com recursos naturais.",
    details: "Público: 8 a 14 anos | Dia: Terça-feira (14h às 16h)",
  },
  {
    id: "NNEDI",
    title: "Nnedi",
    social: "@nnediusp",
    profileImage:
      "https://drive.google.com/uc?export=view&id=1FA_BCa8j6oNFVibufMRaZLwpsZQmO0AC&confirm=t",
    description:
      "Literatura, antirracismo e ficção científica (Afrofuturismo).",
    details: "Público: 8 a 14 anos | Dia: Quarta e Quinta (14h às 16h)",
  },
  {
    id: "MAATHAI",
    title: "Maathai",
    social: "@maathai.meioambiente",
    profileImage:
      "https://drive.google.com/uc?export=view&id=1dxYM9ew-9u_UC46xZBZrtA4tROu87jRK&confirm=t",
    description:
      "Iniciativas que integram meio ambiente, arte, tecnologia e humanidades para inclusão social.",
    details: "",
  },
];

export const getSubprojectContent = (id: string) => {
  return subprojectsContent.find((sub) => sub.id === id);
};
