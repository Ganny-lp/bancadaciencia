import { Material } from '../entities/Material';

export interface IMaterialRepository {
    getKits(): Promise<Material[]>;
    getSubprojetos(): Promise<Material[]>;
}