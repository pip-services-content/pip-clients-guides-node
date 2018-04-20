let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { MultiString } from 'pip-services-commons-node';

import { IGuidesClientV1 } from '../../src/version1/IGuidesClientV1';
import { GuidePageV1 } from '../../src/version1/GuidePageV1';
import { GuideV1 } from '../../src/version1/GuideV1';

let GUIDE1 = <GuideV1>{
    id: '1',
    name: 'Name1',
    type: 'introduction',
    app: 'Test App 1',
    max_ver: null,
    min_ver: null,
    status: 'new'
};
let GUIDE2 = <GuideV1>{
    id: '2',
    name: 'Name2',
    tags: ['TAG 1'],
    all_tags: ['tag1'],
    type: 'new release',
    app: 'Test App 1',
    max_ver: 1,
    min_ver: 2,
    status: 'new'
};

export class GuidesClientFixtureV1 {
    private _client: IGuidesClientV1;
    
    constructor(client: IGuidesClientV1) {
        this._client = client;
    }
        
    public testCrudOperations(done) {
        let guide1, guide2;

        async.series([
        // Create one guide
            (callback) => {
                this._client.createGuide(
                    null,
                    GUIDE1,
                    (err, guide) => {
                        assert.isNull(err);
                        
                        assert.isObject(guide);
                        assert.equal(guide.type, GUIDE1.type);
                        assert.equal(guide.app, GUIDE1.app);

                        guide1 = guide;

                        callback();
                    }
                );
            },
        // Create another guide
            (callback) => {
                this._client.createGuide(
                    null,
                    GUIDE2,
                    (err, guide) => {
                        assert.isNull(err);
                        
                        assert.isObject(guide);
                        assert.equal(guide.type, GUIDE2.type);
                        assert.equal(guide.app, GUIDE2.app);

                        guide2 = guide;

                        callback();
                    }
                );
            },
        // Get all guides
            (callback) => {
                this._client.getGuides(
                    null, null, null,
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the guide
            (callback) => {
                guide1.app = 'New App 1';

                this._client.updateGuide(
                    null,
                    guide1,
                    (err, guide) => {
                        assert.isNull(err);
                        
                        assert.isObject(guide);
                        assert.equal(guide.app, 'New App 1');
                        assert.equal(guide.type, GUIDE1.type);

                        guide1 = guide;

                        callback();
                    }
                );
            },
        // Delete guide
            (callback) => {
                this._client.deleteGuideById(
                    null, guide1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete guide
            (callback) => {
                this._client.getGuideById(
                    null, guide1.id,
                    (err, guide) => {
                        assert.isNull(err);
                        
                        assert.isNull(guide || null);

                        callback();
                    }
                );
            }
        ], done);
    }
}
