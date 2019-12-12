"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
//import { IGuidesController } from 'pip-services-guides-node';
class GuidesDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_2.Descriptor("pip-services-guides", "controller", "*", "*", "*"));
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getGuides(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'guides.get_guides');
        this._controller.getGuides(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    getRandomGuide(correlationId, filter, callback) {
        let timing = this.instrument(correlationId, 'guides.get_random_guide');
        this._controller.getRandomGuide(correlationId, filter, (err, guide) => {
            timing.endTiming();
            callback(err, guide);
        });
    }
    getGuideById(correlationId, guideId, callback) {
        let timing = this.instrument(correlationId, 'guides.get_guide_by_id');
        this._controller.getGuideById(correlationId, guideId, (err, guide) => {
            timing.endTiming();
            callback(err, guide);
        });
    }
    createGuide(correlationId, guide, callback) {
        let timing = this.instrument(correlationId, 'guides.create_guide');
        this._controller.createGuide(correlationId, guide, (err, guide) => {
            timing.endTiming();
            callback(err, guide);
        });
    }
    updateGuide(correlationId, guide, callback) {
        let timing = this.instrument(correlationId, 'guides.update_guide');
        this._controller.updateGuide(correlationId, guide, (err, guide) => {
            timing.endTiming();
            callback(err, guide);
        });
    }
    deleteGuideById(correlationId, guideId, callback) {
        let timing = this.instrument(correlationId, 'guides.delete_guide_by_id');
        this._controller.deleteGuideById(correlationId, guideId, (err, guide) => {
            timing.endTiming();
            callback(err, guide);
        });
    }
}
exports.GuidesDirectClientV1 = GuidesDirectClientV1;
//# sourceMappingURL=GuidesDirectClientV1.js.map