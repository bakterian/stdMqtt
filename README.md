# MQTT STANDARD HELPER LIBRARY
**Node-js Mqtt helper utility**

Node Js utility for dealing with common mqtt related tasks.
Like extracting values from a nested payload structure.


## Release 1.0.0
Initial release of code and configuration examples.
Tested on linux.


## How to Install
Clone or unzip repository.
Open shell or the windows cmd, cd inside and type:
```js
npm install
```

## How to run
Simply reference in a different application:
const stdMqtt = require("../stdMqtt/stdMqtt");

stdMqtt.getPayloadChunk(pathPieces, jsonTopicPayload)


## Testing the logger
The basic logging functionality can be tested by running:
1) npm run test
2) node stdMqttTests.js
