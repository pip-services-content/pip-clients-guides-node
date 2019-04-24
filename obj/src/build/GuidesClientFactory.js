"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const GuidesDirectClientV1_1 = require("../version1/GuidesDirectClientV1");
const GuidesHttpClientV1_1 = require("../version1/GuidesHttpClientV1");
class GuidesClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(GuidesClientFactory.DirectClientV1Descriptor, GuidesDirectClientV1_1.GuidesDirectClientV1);
        this.registerAsType(GuidesClientFactory.HttpClientV1Descriptor, GuidesHttpClientV1_1.GuidesHttpClientV1);
    }
}
GuidesClientFactory.Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-guides', 'factory', 'default', 'default', '1.0');
GuidesClientFactory.DirectClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-guides', 'client', 'direct', 'default', '1.0');
GuidesClientFactory.HttpClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-guides', 'client', 'http', 'default', '1.0');
exports.GuidesClientFactory = GuidesClientFactory;
//# sourceMappingURL=GuidesClientFactory.js.map