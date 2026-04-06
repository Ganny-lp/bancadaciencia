export interface HomeContext {
  setEmbedUrl: (url: string | null) => void;
  links: Record<string, string>;
  openModal: (modal: string, payload?: string) => void;
  getSubprojectContent: (id: string) => any;
}

type ActionHandler = (context: HomeContext) => void;

export const actionHandlers: Record<string, ActionHandler> = {
  NEWTON: (ctx) => ctx.setEmbedUrl(ctx.links.aexestrela),
  FOLDER: (ctx) => window.open(ctx.links.planos, "_blank"),
  TEACHER: (ctx) => ctx.setEmbedUrl(ctx.links.fazenda),
  CHICKEN: (ctx) => ctx.setEmbedUrl(ctx.links.alimentos),
  EYE: (ctx) => ctx.setEmbedUrl(ctx.links.onda),
  TELESCOPE: (ctx) => ctx.setEmbedUrl(ctx.links.telescopio),
  BULB: (ctx) => ctx.openModal("FOTON"),
  SNORKEL: (ctx) => ctx.openModal("PRESSAO"),
  YODA: (ctx) => ctx.openModal("YODA"),
  KITS: (ctx) => ctx.openModal("KITS"),
};

export const handleActionClick = (id: string, context: HomeContext) => {
  const handler = actionHandlers[id];

  if (handler) {
    handler(context);
  } else if (context.getSubprojectContent(id)) {
    context.openModal("SUBPROJETO_INFO", id);
  } else {
    context.openModal(id as any);
  }
};
