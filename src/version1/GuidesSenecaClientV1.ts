import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableSenecaClient } from 'pip-services-net-node';

import { GuideV1 } from './GuideV1';
import { GuidePageV1 } from './GuidePageV1';
import { IGuidesClientV1 } from './IGuidesClientV1';

export class GuidesSenecaClientV1 extends CommandableSenecaClient implements IGuidesClientV1 {

    constructor(config?: any) {
        super('guides');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
       
    public getGuides(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<GuideV1>) => void): void {
        this.callCommand(
            'get_guides',
            correlationId,
            {
                filter: filter,
                paging: paging
            }, 
            callback
        );
    }

    public getRandomGuide(correlationId: string, filter: FilterParams,
        callback: (err: any, guide: GuideV1) => void): void {
        this.callCommand(
            'get_random_guide',
            correlationId,
            {
                filter: filter
            }, 
            callback
        );
    }

    public getGuideById(correlationId: string, guideId: string,
        callback: (err: any, guide: GuideV1) => void): void {
        this.callCommand(
            'get_guide_by_id',
            correlationId,
            {
                guide_id: guideId
            }, 
            callback
        );
    }

    public createGuide(correlationId: string, guide: GuideV1,
        callback: (err: any, guide: GuideV1) => void): void {
        this.callCommand(
            'create_guide',
            correlationId,
            {
                guide: guide,
            }, 
            callback
        );
    }

    public updateGuide(correlationId: string, guide: GuideV1,
        callback: (err: any, guide: GuideV1) => void): void {
        this.callCommand(
            'update_guide',
            correlationId,
            {
                guide: guide,
            }, 
            callback
        );
    }

    public deleteGuideById(correlationId: string, guideId: string,
        callback: (err: any, guide: GuideV1) => void): void {
        let timing = this.instrument(correlationId, 'guides.delete_guide_by_id');
        this.callCommand(
            'delete_guide_by_id',
            correlationId,
            {
                guide_id: guideId
            }, 
            callback
        );
    }

}
