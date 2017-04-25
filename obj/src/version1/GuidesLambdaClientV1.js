"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
class GuidesLambdaClientV1 extends pip_services_aws_node_1.CommandableLambdaClient {
    constructor(config) {
        super('guides');
        if (config != null)
            this.configure(pip_services_commons_node_1.ConfigParams.fromValue(config));
    }
    getGuides(correlationId, filter, paging, callback) {
        this.callCommand('get_guides', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    getRandomGuide(correlationId, filter, callback) {
        this.callCommand('get_random_guide', correlationId, {
            filter: filter
        }, callback);
    }
    getGuideById(correlationId, guideId, callback) {
        this.callCommand('get_guide_by_id', correlationId, {
            guide_id: guideId
        }, callback);
    }
    createGuide(correlationId, guide, callback) {
        this.callCommand('create_guide', correlationId, {
            guide: guide,
        }, callback);
    }
    updateGuide(correlationId, guide, callback) {
        this.callCommand('update_guide', correlationId, {
            guide: guide,
        }, callback);
    }
    deleteGuideById(correlationId, guideId, callback) {
        let timing = this.instrument(correlationId, 'guides.delete_guide_by_id');
        this.callCommand('delete_guide_by_id', correlationId, {
            guide_id: guideId
        }, callback);
    }
}
exports.GuidesLambdaClientV1 = GuidesLambdaClientV1;
//# sourceMappingURL=GuidesLambdaClientV1.js.map