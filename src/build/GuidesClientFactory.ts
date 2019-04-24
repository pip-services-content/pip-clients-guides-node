import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from 'pip-services3-components-node';

import { GuidesDirectClientV1 } from '../version1/GuidesDirectClientV1';
import { GuidesHttpClientV1 } from '../version1/GuidesHttpClientV1';

export class GuidesClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-guides', 'factory', 'default', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-guides', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-guides', 'client', 'http', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(GuidesClientFactory.DirectClientV1Descriptor, GuidesDirectClientV1);
		this.registerAsType(GuidesClientFactory.HttpClientV1Descriptor, GuidesHttpClientV1);
	}
	
}
