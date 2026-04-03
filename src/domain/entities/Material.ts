export class Material {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly coverImagePath: string,
        public readonly type: 'KIT' | 'SUBPROJETO'
    ) {}

    // Retorna a URL embutida do Drive para visualização interna
    get previewUrl(): string {
        return `https://drive.google.com/file/d/${this.id}/preview`;
    }
}