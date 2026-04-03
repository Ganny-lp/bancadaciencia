import { IMaterialRepository } from '../repositories/IMaterialRepository.ts';

export class GetMaterialsUseCase {
    constructor(private repository: IMaterialRepository) {}

    async executeKits() {
        try {
            return await this.repository.getKits();
        } catch (error) {
            console.error("Erro ao carregar kits:", error);
            return [];
        }
    }

    async executeSubprojetos() {
        try {
            return await this.repository.getSubprojetos();
        } catch (error) {
            console.error("Erro ao carregar subprojetos:", error);
            return [];
        }
    }
}