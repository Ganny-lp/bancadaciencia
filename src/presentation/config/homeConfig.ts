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
  { id: "NEWTON", src: "./images/aexestrela.png", label: "Aexestrela" },
  { id: "TEACHER", src: "./images/fazenda.png", label: "Fazenda" },
  { id: "CHICKEN", src: "./images/alimentos.png", label: "Alimentos" },
  { id: "EYE", src: "./images/olho.png", label: "Onda" },
  { id: "TELESCOPE", src: "./images/telescopio.png", label: "Telescópio" },
  { id: "BULB", src: "./images/foton.png", label: "Fóton" },
  { id: "SNORKEL", src: "./images/pressao.png", label: "Pressão" },
  { id: "YODA", src: "./images/yoda.png", label: "Yoda" },
];

export const entidadesData: Entidade[] = [
  { id: "OUMOU", name: "Oumou", src: "./images/oumou.png" },
  { id: "AGNES", name: "Agnes", src: "./images/agnes.png" },
  { id: "JUDITH", name: "Judith", src: "./images/judith.png" },
  { id: "LEAH", name: "Leah", src: "./images/leah.png" },
  { id: "TEBELLO", name: "Tebello", src: "./images/tebello.png" },
  { id: "BREEDLOVE", name: "Breedlove", src: "./images/breedlove.png" },
  { id: "NNEDI", name: "Nnedi", src: "./images/nnedi.png" },
  { id: "MAATHAI", name: "Maathai", src: "./images/maathai.png" },
];
