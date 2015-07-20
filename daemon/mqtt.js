var mqtt    = require('mqtt');
//var client  = mqtt.connect('mqtt://test.mosquitto.org');
var client  = mqtt.connect('mqtt://localhost');

client.on('connect', function () {
  client.subscribe('presence');
  client.publish('presence', 'Hello omi doido');
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.dir(message);
  console.log(message.toString());
  
  
//  client.end();
});