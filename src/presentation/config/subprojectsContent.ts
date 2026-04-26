import React from "react";
import { supabase } from '../../lib/SupabaseClient';

// Helper para ajudar a pegar as imagens da pasta do Supabase Storage, usando o caminho relativo
export const getFileUrl = (path: string) : string => {
  if (!path) return '';
  const { data } = supabase.storage.from('documents-driver').getPublicUrl(path);

  return data.publicUrl;
};

// Helper para contornar CORS do Google Drive usando proxy de imagens
export const getImageUrl = (
  googleDriveUrl: string | undefined,
): string | undefined => {
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
  galleryImages?: readonly string[];
}

// Galeria de imagens dos projetos do Google Drive
export const projectGalleryImages = {
  AGNES: [
    "https://drive.google.com/uc?export=view&id=1GHBeFbmF9_giMBtD5CwtO-JE8DWG2NsC&confirm=t",
    "https://drive.google.com/uc?export=view&id=1rmw77NGAnvvZvSQJYzfTB1fYPvIk3I6U&confirm=t",
  ],
  BREEDLOVE: [
    "https://drive.google.com/uc?export=view&id=1QB-yaUyU7bufxLJcM9apuz42IZIOoTd8&confirm=t",
    "https://drive.google.com/uc?export=view&id=1Xqx_ApckkwRU1T9kQ9GvNFLgU-ykKWHu&confirm=t",
  ],
  JUDITH: [
    "https://drive.google.com/uc?export=view&id=1NaZKPqDFa8BndESFrtm9Xhj4_1yw3ZP-&confirm=t",
    "https://drive.google.com/uc?export=view&id=1ej_2UovmPXIXC4v2u7pRM1QxL-2eBG56&confirm=t",
    "https://drive.google.com/uc?export=view&id=1n4xC7-GTuTGYUhCGpM1nWWub73Ft5uxg&confirm=t",
    "https://drive.google.com/uc?export=view&id=1K43cgq6vGu44v3-UHUPvKeCQpkEHNHwt&confirm=t",
    "https://drive.google.com/uc?export=view&id=1ZVI8Hq2wZXz11clTGGipo4s_ldW8nu5c&confirm=t",
  ],
  LEAH: [
    "https://drive.google.com/uc?export=view&id=1uRU7MCFaYipe7yMcryz_Onq2VfIAjjC8&confirm=t",
    "https://drive.google.com/uc?export=view&id=1OqszsKq7_lPGsWLagwO1igoEbMxECIUr&confirm=t",
    "https://drive.google.com/uc?export=view&id=1d67JgXcqubSih1TSALCnzUU8D4ALm5U_&confirm=t",
    "https://drive.google.com/uc?export=view&id=1d_aQpQ1AJi6CyW_MUDLrlIS4j_4RN98I&confirm=t",
    "https://drive.google.com/uc?export=view&id=1BKCBHOXBHg8KOu-eD3n9mf5njvPWzhYb&confirm=t",
  ],
  MAATHAI: [
    "https://drive.google.com/uc?export=view&id=104RHCrm-TL2i-pyLlVCyVn6RatajkVVv&confirm=t",
    "https://drive.google.com/uc?export=view&id=1L6GZkqziQ8kcVv3R401EmY5TC8flofKf&confirm=t",
    "https://drive.google.com/uc?export=view&id=1_gtzk5ylBM8yE8Bc2kU8VJ_3k-5vvrPJ&confirm=t",
    "https://drive.google.com/uc?export=view&id=1Mj6YFpZo0YKBumzPba7ktlbnIwhr3YH8&confirm=t",
    "https://drive.google.com/uc?export=view&id=1hxoW7oFISIinRMZFladt5i2q9Z83ITvv&confirm=t",
  ],
  NNEDI: [
    "https://drive.google.com/uc?export=view&id=1gqPdCA5RSmVU16QClv0zg_0hN7RqPpvS&confirm=t",
    "https://drive.google.com/uc?export=view&id=10F2sqPTsMgD6pX4AfSqUkYJDercg0DXt&confirm=t",
    "https://drive.google.com/uc?export=view&id=13yy40iPDV7tA7DKhLFs4c1MhvSTDi_J5&confirm=t",
    "https://drive.google.com/uc?export=view&id=1hTYOOiZcoBIMYSOvknHLdqCi3I2O5owd&confirm=t",
    "https://drive.google.com/uc?export=view&id=1LLumUy4bBznV6yxmTd6Ie_YXGP7KXHru&confirm=t",
  ],
  TEBELLO: [
    "https://drive.google.com/uc?export=view&id=19kVUzy2LYfg_j9Q930bu0FTaRmbqhrHI&confirm=t",
    "https://drive.google.com/uc?export=view&id=1-JHivwUCUBG1-yfnhWwKEkWifrQZGgB3&confirm=t",
  ],
  OUMOU: [
    "https://drive.google.com/uc?export=view&id=1SoyuUCfHqIfPLLhKjSEX7woLjcGBy9aY&confirm=t",
    "https://drive.google.com/uc?export=view&id=1_k0HBVt1YqOOPNHWd-1pviacGlU9LH74&confirm=t",
    "https://drive.google.com/uc?export=view&id=1Ru87OGe9eVivOJKriOq0hZhnPHB4GGg7&confirm=t",
    "https://drive.google.com/uc?export=view&id=1KXP9w9VCr5SPbek9MRvXpGbPAC23OCga&confirm=t",
  ],
} as const;

export const subprojectsContent: SubprojectContent[] = [
  {
    id: "OUMOU",
    title: "Oumou",
    social: "@oumou.oficinas",
    description:
      "Homenageia Oumou Sy, ícone da moda senegalesa. Oferece espaço onde costura, design e artesanato se unem para criar peças originais, fortalecendo habilidades manuais e criativas.",
    details: "Faixa etária: 11 a 14 anos | Dia: Quinta-feira (14h às 16h)",
    galleryImages: projectGalleryImages.OUMOU,
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
    galleryImages: projectGalleryImages.AGNES,
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
    galleryImages: projectGalleryImages.JUDITH,
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
    galleryImages: projectGalleryImages.LEAH,
  },
  {
    id: "TEBELLO",
    title: "Tebello",
    profileImage:
      "https://drive.google.com/uc?export=view&id=1AM9cA1kAtFv7T4Rd4CfriYYNaFqPRfs4&confirm=t",
    description:
      "Física, Química e Biologia de forma lúdica com experimentos de baixo custo.",
    details: "Público: 11 a 14 anos | Dia: Quarta-feira (14h às 16h)",
    galleryImages: projectGalleryImages.TEBELLO,
  },
  {
    id: "BREEDLOVE",
    title: "Breedlove",
    profileImage:
      "https://drive.google.com/uc?export=view&id=1d-3A6ra5K4KYW6m4WRQ8gZOKHPKMMbaZ&confirm=t",
    description:
      "Práticas sustentáveis e criação de produtos com recursos naturais.",
    details: "Público: 8 a 14 anos | Dia: Terça-feira (14h às 16h)",
    galleryImages: projectGalleryImages.BREEDLOVE,
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
    galleryImages: projectGalleryImages.NNEDI,
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
    galleryImages: projectGalleryImages.MAATHAI,
  },
];

export const getSubprojectContent = (id: string) => {
  return subprojectsContent.find((sub) => sub.id === id);
};
