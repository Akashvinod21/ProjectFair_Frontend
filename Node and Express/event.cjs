//import 
const event = require('events')

//object
const eventE = new event.EventEmitter()

//create event
eventE.on('onShow',()=>{
    //logic
    console.log('event called');
})

//execute event
eventE.emit('onShow')