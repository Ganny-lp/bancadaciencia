import { getFileUrl } from "./subprojectsContent";

export interface Dinamica {
  id: string;
  src: string;
  label: string;
}

export interface Entidade {
  id: string;
  name: string;
  src: string;
}

export const dinamicasData: Dinamica[] = [
  { id: "NEWTON", src: getFileUrl("banca/aexestrela.png"), label: "Aexestrela" },
  { id: "TEACHER", src: getFileUrl("banca/fazenda.png"), label: "Fazenda" },
  { id: "CHICKEN", src: getFileUrl("banca/alimentos.png"), label: "Alimentos" },
  { id: "EYE", src: getFileUrl("banca/olho.png"), label: "Onda" },
  { id: "TELESCOPE", src: getFileUrl("banca/telescopio.png"), label: "Telescópio" },
  { id: "BULB", src: getFileUrl("banca/foton.png"), label: "Fóton" },
  { id: "SNORKEL", src: getFileUrl("banca/pressao.png"), label: "Pressão" },
  { id: "YODA", src: getFileUrl("banca/yoda.png"), label: "Yoda" },
];

export const entidadesData: Entidade[] = [
  { id: "OUMOU", name: "Oumou", src: getFileUrl("imagens/oumou.png") },
  { id: "AGNES", name: "Agnes", src: getFileUrl("imagens/agnes.png") },
  { id: "JUDITH", name: "Judith", src: getFileUrl("imagens/judith.png") },
  { id: "LEAH", name: "Leah", src: getFileUrl("imagens/leah.png") },
  { id: "TEBELLO", name: "Tebello", src: getFileUrl("imagens/tebello.png") },
  { id: "BREEDLOVE", name: "Breedlove", src: getFileUrl("imagens/breedlove.png") },
  { id: "NNEDI", name: "Nnedi", src: getFileUrl("imagens/nnedi.png") },
  { id: "MAATHAI", name: "Maathai", src: getFileUrl("imagens/maathai.png") },
];
