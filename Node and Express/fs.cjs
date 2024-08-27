//import fs
const fs = require('fs')

fs.writeFile('./text.txt','Hello World',(err)=>{
    if(err) throw err
    console.log('Data success');
})