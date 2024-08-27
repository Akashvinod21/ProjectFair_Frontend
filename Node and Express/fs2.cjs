const fs = require('fs')

const rename = ()=>{
    fs.rename('./text.txt','./sample.txt',(err)=>{
        if(err) throw err
        console.log('rename completed');
    })
}

rename()