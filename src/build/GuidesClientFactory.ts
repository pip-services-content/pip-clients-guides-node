import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-components-node';

import { GuidesDirectClientV1 } from '../version1/GuidesDirectClientV1';
import { GuidesHttpClientV1 } from '../version1/GuidesHttpClientV1';
import { GuidesSenecaClientV1 } from '../version1/GuidesSenecaClientV1';

export class GuidesClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-guides', 'factory', 'default', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-guides', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-guides', 'client', 'http', 'default', '1.0');
	public static SenecaClientV1Descriptor = new Descriptor('pip-services-guides', 'client', 'seneca', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(GuidesClientFactory.DirectClientV1Descriptor, GuidesDirectClientV1);
		this.registerAsType(GuidesClientFactory.HttpClientV1Descriptor, GuidesHttpClientV1);
		this.registerAsType(GuidesClientFactory.SenecaClientV1Descriptor, GuidesSenecaClientV1);
	}
	
}
