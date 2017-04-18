"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const GuidesDirectClientV1_1 = require("../version1/GuidesDirectClientV1");
const GuidesHttpClientV1_1 = require("../version1/GuidesHttpClientV1");
const GuidesSenecaClientV1_1 = require("../version1/GuidesSenecaClientV1");
class GuidesFactory extends pip_services_commons_node_2.Factory {
    constructor() {
        super();
        this.registerAsType(GuidesFactory.DirectClientV1Descriptor, GuidesDirectClientV1_1.GuidesDirectClientV1);
        this.registerAsType(GuidesFactory.HttpClientV1Descriptor, GuidesHttpClientV1_1.GuidesHttpClientV1);
        this.registerAsType(GuidesFactory.SenecaClientV1Descriptor, GuidesSenecaClientV1_1.GuidesSenecaClientV1);
    }
}
GuidesFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-guides', 'factory', 'default', 'default', '1.0');
GuidesFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-guides', 'client', 'direct', 'default', '1.0');
GuidesFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-guides', 'client', 'http', 'default', '1.0');
GuidesFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-guides', 'client', 'seneca', 'default', '1.0');
exports.GuidesFactory = GuidesFactory;
//# sourceMappingURL=GuidesFactory.js.map