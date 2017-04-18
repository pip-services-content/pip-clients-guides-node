# Client API (version 1) <br/> Guides Microservices Client SDK for Node.js

Node.js client API for Guides microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [GuidePageV1 class](#class1)
* [GuideV1 class](#class2)
* [IGuidesClientV1 interface](#interface)
    - [getGuides()](#operation1)
    - [getRandomGuide()](#operation2)
    - [getGuideById()](#operation3)
    - [createGuide()](#operation4)
    - [updateGuide()](#operation5)
    - [deleteGuideById()](#operation6)
* [GuidesHttpClientV1 class](#client_http)
* [GuidesSenecaClientV1 class](#client_seneca)
* [GuidesLambdaClientV1 class](#client_lambda)
* [GuidesDirectClientV1 class](#client_direct)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-guides-node": "^1.0.*",
        ...
    }
}
```

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('pip-clients-guides-node');

// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};

// Create the client instance
var client = sdk.GuidesHttpClientV1(config);

// Open client connection to the microservice
client.open(null, function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
        
    // Create a new guide
    client.createGuide(
        null,
        { 
            type: 'introduction',
            app: 'Test App 1',
            pages: [
                { 
                    title: { en: 'Welcome to Test App 1' } 
                }
            ]
        },
        function (err, guide) {
            if (err) {
                console.error(err);
                return;
            }
            
            console.log('Created guide is');
            console.log(guide);
            
            // Get a random intro guide for app1
            client.getRandomGuide(
                null,
                {
                    type: 'introduction',
                    app: 'app1'
                },
                function(err, guide) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    console.log('Random guide is');
                    console.log(guide);
                    
                    // Close connection
                    client.close(null); 
                }
            );
        }
    );
});
```

## Data types

### <a name="class1"></a> GuidePageV1 class

Contains single page from a guide

**Properties:**
- title: MultiString - page title in multiple lanuguages
- content: MultiString - page content in multiple languages
- more_url: string - Url with additional information
- color: string - page background color code or name
- pic_id: string - picture block id from blobs to show at the page

### <a name="class4"></a> GuideV1 class

Represents a system guide. 

**Properties:**
- id: string - unique guide id
- type: string - guide type, i.e. 'introduction', 'new release', etc.
- app: string - (optional) application name
- version: string - (optional) application version
- create_time: Date - date and time when guide was created
- pages: [GuidePageV1] - (optional) array of pages
- tags: [string] - (optional) explicit tags with annoucement topic for searching
- all_tags: [string] - (readonly) normalized array of explicit and hash tags used by search
- status: string - editing status: 'new', 'writing', 'translating', 'completed' (default: 'new')
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)

## <a name="interface"></a> IGuidesClientV1 interface

If you are using Typescript, you can use IGuidesClientV1 as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about IGuidesClientV1 interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface IGuidesClientV1 {
    getGuides(correlationId, filter, paging, callback);
    getRandomGuide(correlationId, filter, callback);
    getGuideById(correlationId, guideId, callback);
    createGuide(correlationId, guide, user, callback);
    updateGuide(correlationId, guideId, update, user, callback);
    deleteGuideById(correlationId, guideId, callback);
}
```

### <a name="operation1"></a> getGuides(correlationId, filter, paging, callback)

Retrieves a list of guides by specified criteria

**Params properties:** 
- correlationId: string - id that uniquely identifies transaction
- filter: object - filter parameters
  - type: string - (optional) guide type
  - app: string - (optional) application name
  - version: string - (optional) application version
  - status: string - (optional) editing status
  - tags: [string] - search tags
- paging: object - paging parameters
  - paging: bool - (optional) true to enable paging and return total count
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result
- callback: (err, page) => void - callback function
  - err: Error - occured error or null for success
  - page: DataPage<GuideV1> - retrieved page of Guide objects

### <a name="operation3"></a> getGuideById(correlationId, guideId, callback)

Retrieves guide by its unique id. 

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- guideId: string - unique guide id
- callback: (err, guide) => void - callback function
  - err: Error - occured error or null for success
  - guide: GuideV1 - retrieved Guide object

### <a name="operation4"></a> createGuide(correlationId, guide, callback)

Creates an guide

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- guide: GuideV1 - a guide to be created
- callback: (err, guide) => void - callback function
  - err: Error - occured error or null for success
  - guide: GuideV1 - created Guide object
 
### <a name="operation5"></a> updateGuide(correlationId, guide, callback)

Updates an guide

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- guide: GuideV1 - a guide to be updated
- callback: (err, guide) => void - callback function
  - err: Error - occured error or null for success
  - guide: GuideV1 - updated Guide object
 
### <a name="operation6"></a> deleteGuideById(correlationId, guideId, callback)

Deletes system guide specified by its unique id.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- guideId: string - unique guide id
- callback: (err) => void - callback function
  - err: Error - occured error or null for success
 
## <a name="client_http"></a> GuidesHttpClientV1 class

GuidesHttpClientV1 is a client that implements HTTP protocol

```javascript
class GuidesHttpClientV1 extends CommandableHttpClient implements IGuidesClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getGuides(correlationId, filter, paging, callback);
    getRandomGuide(correlationId, filter, callback);
    getGuideById(correlationId, guideId, callback);
    createGuide(fcorrelationId, eedback, user, callback);
    updateGuide(correlationId, guideId, update, user, callback);
    deleteGuideById(correlationId, guideId, callback);
}
```

**Constructor config properties:** 
- connection: object - HTTP transport configuration options
  - type: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> GuidesSenecaClientV1 class

GuidesSenecaClientV1 is a client that implements Seneca protocol

```javascript
class GuidesSenecaClientV1 extends CommandableSenecaClient implements IGuidesClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getGuides(correlationId, filter, paging, callback);
    getRandomGuide(correlationId, filter, callback);
    getGuideById(correlationId, guideId, callback);
    createGuide(fcorrelationId, eedback, user, callback);
    updateGuide(correlationId, guideId, update, user, callback);
    deleteGuideById(correlationId, guideId, callback);
}
```

**Constructor config properties:** 
- connection: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_seneca"></a> GuidesLambdaClientV1 class

GuidesLambdaClientV1 is a client that connects to AWS lambda function

```javascript
class GuidesLambdaClientV1 extends CommandableLambdaClient implements IGuidesClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getGuides(correlationId, filter, paging, callback);
    getRandomGuide(correlationId, filter, callback);
    getGuideById(correlationId, guideId, callback);
    createGuide(fcorrelationId, eedback, user, callback);
    updateGuide(correlationId, guideId, update, user, callback);
    deleteGuideById(correlationId, guideId, callback);
}
```

**Constructor config properties:** 
- connection: object - AWS lambda connection options. 
  - type: string - 'aws'
  - arn: string - Lambda function arn
- credential: object - AWS lambda credential options
  - access_id: string - Amazon access id
  - access_key: string - Amazon secret access key

## <a name="client_seneca"></a> GuidesDirectClientV1 class

GuidesDirectClientV1 is a client that calls controller directly from the same container.
It can be used in monolythic deployments when multiple microservices run in the same process.

```javascript
class GuidesDirectClientV1 extends DirectClient implements IGuidesClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getGuides(correlationId, filter, paging, callback);
    getRandomGuide(correlationId, filter, callback);
    getGuideById(correlationId, guideId, callback);
    createGuide(fcorrelationId, eedback, user, callback);
    updateGuide(correlationId, guideId, update, user, callback);
    deleteGuideById(correlationId, guideId, callback);
}
```
