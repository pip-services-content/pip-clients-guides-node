let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { GuidesMemoryPersistence } from 'pip-services-guides-node';
import { GuidesController } from 'pip-services-guides-node';
import { GuidesSenecaServiceV1 } from 'pip-services-guides-node';
import { IGuidesClientV1 } from '../../src/version1/IGuidesClientV1';
import { GuidesSenecaClientV1 } from '../../src/version1/GuidesSenecaClientV1';
import { GuidesClientFixtureV1 } from './GuidesClientFixtureV1';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('GuidesSenecaClient', () => {
    let service: GuidesSenecaServiceV1;
    let client: GuidesSenecaClientV1;
    let fixture: GuidesClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new GuidesMemoryPersistence();
        let controller = new GuidesController();

        service = new GuidesSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-guides', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-guides', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-guides', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new GuidesSenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);

        fixture = new GuidesClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });

    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
