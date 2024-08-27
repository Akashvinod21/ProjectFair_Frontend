//import fs
const fs = require('fs')

const read = ()=>{
    fs.readFile('./text.txt','utf8',(err,data)=>{
        console.log(data);

        if(err) throw err
        console.log('File read successfully');
    })
}
read()