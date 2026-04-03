import { IMaterialRepository } from '../../domain/repositories/IMaterialRepository';
import { Material } from '../../domain/entities/Material';

export class MaterialRepositoryImpl implements IMaterialRepository {

    async getKits(): Promise<Material[]> {
        return [
            new Material('1M2DqNLRhIiYUpJrwgIGUp3EzCHnQiiF1', 'Produto 1', '/images/1.png', 'KIT'),
            new Material('1adsBLjzVkk9sVxcsqBaaL-czQJY7pbR6', 'Produto 2', '/images/2.png', 'KIT'),
            new Material('1adsBLjzVkk9sVxcsqBaaL-czQJY7pbR6', 'Produto 3', '/images/3.png', 'KIT'),
            new Material('1hKsgNkKZ9g8Gp_9XzyEPCQjzBWXt5Gw5', 'Produto 4', '/images/4.png', 'KIT'),
            new Material('1RunIYl1qiWg1oiYcXKUsqB9_7Ce8iLj2', 'Produto 5', '/images/5.png', 'KIT'),
            new Material('1RvWTpRAdxvF7Fo6ZOK6VbP-V3Pspk9Kd', 'Produto 6', '/images/6.png', 'KIT'),
            new Material('1RvWTpRAdxvF7Fo6ZOK6VbP-V3Pspk9Kd', 'Produto 7', '/images/7.png', 'KIT'),
            new Material('1syN5tPjoifYJsRrub1_0XYP1o8mUZexj', 'Produto 8', '/images/8.png', 'KIT'),
            new Material('1syN5tPjoifYJsRrub1_0XYP1o8mUZexj', 'Produto 9', '/images/9.png', 'KIT'),
            new Material('16NcE_82jMpRgDlr0klDzRhm7pAPlrf-N', 'Produto 10', '/images/10.png', 'KIT'),
            new Material('1yxQmXIAqIwQOrp8BmomPwx9oHDpMvnc9', 'Produto 11', '/images/11.png', 'KIT'),
            new Material('1pEP9ZYWxRjC8FEIg04f4edcyljo1jh18', 'Produto 12', '/images/12.png', 'KIT'),
            new Material('1lBkH0wFjDRXEIRrxR5e67rFzrVoeIX2u', 'Produto 13', '/images/13.png', 'KIT'),
            new Material('1tJ-JrbZfu2dDKKeziNeDFWf162JIF5yw', 'Produto 14', '/images/14.png', 'KIT'),
            new Material('1fSbQmnf-Uu1Jo0Xd_hsEONyLFCpMp3q8', 'Produto 15', '/images/15.png', 'KIT'),
            new Material('10W3f5iftoFHnHjIbFberilD4U489O5H7', 'Produto 16', '/images/16.png', 'KIT'),
            new Material('1E1fxgoEn-KFG9XMpbu1JBVEVQunnvE4d', 'Produto 17', '/images/17.png', 'KIT'),
            new Material('13XJWbKU26kURP6t2OaLsLxeUp3VuGewF', 'Produto 18', '/images/18.png', 'KIT'),
            new Material('1yZtQ9lW0U3pS7CgnESBrEoOBsgKxi1ZC', 'Produto 19', '/images/19.png', 'KIT'),
            new Material('13B-ncr02-sMgJZGKxcaIiCBas4yHcAoV', 'Produto 20', '/images/20.png', 'KIT'),
            new Material('1Tqd1xGjBinTmJqBemzmtE13-3Qdt5_b4', 'Produto 21', '/images/21.png', 'KIT'),
            new Material('1MOxEphDQsOCy5Wh55hiRvNpidKuygEP-', 'Produto 22', '/images/22.png', 'KIT'),
            new Material('1gnZcHiFaD5CmMilvacAKvxRKFRdD5_n3', 'Produto 23', '/images/23.png', 'KIT'),
            new Material('1ZdGNsNgLRwDAxtxMzWIZtqJ-AtYa-Y6z', 'Produto 24', '/images/24.png', 'KIT'),
            new Material('13gwIBh6C2pgJN804N0SWei9fK3J08VAY', 'Produto 25', '/images/25.png', 'KIT'),
            new Material('1oCp9v9UUw3U_TfVw-kS_lnENcbYxwty4', 'Produto 26', '/images/26.png', 'KIT'),
            new Material('1MGSboweDv5hLU4Wa28gpAOw5wG2BegNf', 'Produto 27', '/images/27.png', 'KIT'),
            new Material('1ua9FG-bZ7uCgc4_v7oDf2UFYvRUsXPF3', 'Produto 28', '/images/28.png', 'KIT'),
            new Material('1tHY-_I73ilq6nSMInwmpA-f3ChVta7ll', 'Produto 29', '/images/29.png', 'KIT'),
            new Material('1BmJsg5quZ0y3AgtYax1niSQ64_BWxwFN', 'Produto 30', '/images/30.png', 'KIT'),
            new Material('', 'Produto 31', '/images/31.png', 'KIT'), // O produto 31 não tinha link no HTML original
            new Material('1t1LhX9ZtQOyZP1l1IL9k8lVgLXmHpWgc', 'Produto 32', '/images/32.png', 'KIT'),
            new Material('1NBjIdPrx7AOkRmTiBbFs0YpxN3G0Pm2J', 'Produto 33', '/images/33.png', 'KIT'),
            new Material('1ZGtZ5zvsLtsIbkVQd2D-1RAPule-rO3d', 'Produto 34', '/images/34.png', 'KIT'),
        ];
    }

    async getSubprojetos(): Promise<Material[]> {
        return [
            new Material('ID_DRIVE_HISTORICO', 'Histórico', '/images/dialogo1.png', 'SUBPROJETO'),
            new Material('ID_DRIVE_PRESSAO', 'Pressão', '/images/subprojetos.png', 'SUBPROJETO'),
        ];
    }
}