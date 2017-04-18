import { YamlConfigReader } from 'pip-services-commons-node';
import { GuidesClientFixtureV1 } from './GuidesClientFixtureV1';
import { GuidesLambdaClientV1 } from '../../src/version1/GuidesLambdaClientV1';

suite('GuidesLambdaClient', ()=> {
    let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;

    let client: GuidesLambdaClientV1;
    let fixture: GuidesClientFixtureV1;

    setup((done) => {
        client = new GuidesLambdaClientV1();
        client.configure(lambdaConfig);

        fixture = new GuidesClientFixtureV1(client);

        client.open(null, done);
    });

    teardown((done) => {
        client.close(null, done);
    });

    test('Crud Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});