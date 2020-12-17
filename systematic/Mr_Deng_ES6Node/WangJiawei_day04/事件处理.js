var events = require('events');
var eventEmitter = new events.EventEmitter();

//注册事件
eventEmitter.on('click', () => {
  console.log('data1 received successfully.');
});
eventEmitter.on('click', () => {
  console.log('data2 received successfully.');
});

//触发事件
eventEmitter.emit('click');