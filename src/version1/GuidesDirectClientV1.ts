import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams} from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-net-node';

import { GuideV1 } from './GuideV1';
import { GuidePageV1 } from './GuidePageV1';
import { IGuidesClientV1 } from './IGuidesClientV1';
//import { IGuidesController } from 'pip-services-guides-node';

export class GuidesDirectClientV1 extends DirectClient<any> implements IGuidesClientV1 {
            
    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-guides", "controller", "*", "*", "*"))

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public getGuides(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<GuideV1>) => void): void {
        let timing = this.instrument(correlationId, 'guides.get_guides');
        this._controller.getGuides(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    public getRandomGuide(correlationId: string, filter: FilterParams,
        callback: (err: any, guide: GuideV1) => void): void {
        let timing = this.instrument(correlationId, 'guides.get_random_guide');
        this._controller.getGuides(correlationId, filter, (err, guide) => {
            timing.endTiming();
            callback(err, guide);
        });
    }

    public getGuideById(correlationId: string, guideId: string,
        callback: (err: any, guide: GuideV1) => void): void {
        let timing = this.instrument(correlationId, 'guides.get_guide_by_id');
        this._controller.getGuideById(correlationId, guideId, (err, guide) => {
            timing.endTiming();
            callback(err, guide);
        });
    }

    public createGuide(correlationId: string, guide: GuideV1,
        callback: (err: any, guide: GuideV1) => void): void {
        let timing = this.instrument(correlationId, 'guides.create_guide');
        this._controller.createGuide(correlationId, guide, (err, guide) => {
            timing.endTiming();
            callback(err, guide);
        });
    }

    public updateGuide(correlationId: string, guide: GuideV1,
        callback: (err: any, guide: GuideV1) => void): void {
        let timing = this.instrument(correlationId, 'guides.update_guide');
        this._controller.updateGuide(correlationId, guide, (err, guide) => {
            timing.endTiming();
            callback(err, guide);
        });
    }

    public deleteGuideById(correlationId: string, guideId: string,
        callback: (err: any, guide: GuideV1) => void): void {
        let timing = this.instrument(correlationId, 'guides.delete_guide_by_id');
        this._controller.deleteGuideById(correlationId, guideId, (err, guide) => {
            timing.endTiming();
            callback(err, guide);
        });
    }

}