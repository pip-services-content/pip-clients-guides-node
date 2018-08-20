let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';

import { GuidesMemoryPersistence } from 'pip-services-guides-node';
import { GuidesController } from 'pip-services-guides-node';
import { IGuidesClientV1 } from '../../src/version1/IGuidesClientV1';
import { GuidesDirectClientV1 } from '../../src/version1/GuidesDirectClientV1';
import { GuidesClientFixtureV1 } from './GuidesClientFixtureV1';

suite('GuidesDirectClientV1', ()=> {
    let client: GuidesDirectClientV1;
    let fixture: GuidesClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new GuidesMemoryPersistence();
        let controller = new GuidesController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-guides', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-guides', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new GuidesDirectClientV1();
        client.setReferences(references);

        fixture = new GuidesClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
