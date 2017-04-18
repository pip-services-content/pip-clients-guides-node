let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { GuidesMemoryPersistence } from 'pip-services-guides-node';
import { GuidesController } from 'pip-services-guides-node';
import { GuidesHttpServiceV1 } from 'pip-services-guides-node';
import { IGuidesClientV1 } from '../../src/version1/IGuidesClientV1';
import { GuidesHttpClientV1 } from '../../src/version1/GuidesHttpClientV1';
import { GuidesClientFixtureV1 } from './GuidesClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('GuidesHttpClientV1', ()=> {
    let service: GuidesHttpServiceV1;
    let client: GuidesHttpClientV1;
    let fixture: GuidesClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new GuidesMemoryPersistence();
        let controller = new GuidesController();

        service = new GuidesHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-guides', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-guides', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-guides', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new GuidesHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

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
