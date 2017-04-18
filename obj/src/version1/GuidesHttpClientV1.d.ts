import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableHttpClient } from 'pip-services-net-node';
import { GuideV1 } from './GuideV1';
import { IGuidesClientV1 } from './IGuidesClientV1';
export declare class GuidesHttpClientV1 extends CommandableHttpClient implements IGuidesClientV1 {
    constructor(config?: any);
    getGuides(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<GuideV1>) => void): void;
    getRandomGuide(correlationId: string, filter: FilterParams, callback: (err: any, guide: GuideV1) => void): void;
    getGuideById(correlationId: string, guideId: string, callback: (err: any, guide: GuideV1) => void): void;
    createGuide(correlationId: string, guide: GuideV1, callback: (err: any, guide: GuideV1) => void): void;
    updateGuide(correlationId: string, guide: GuideV1, callback: (err: any, guide: GuideV1) => void): void;
    deleteGuideById(correlationId: string, guideId: string, callback: (err: any, guide: GuideV1) => void): void;
}
