const fs = require('fs')

const deletFile = ()=>{
    fs.unlink('./sample.txt',(err)=>{
        if(err) throw err
        console.log('Deleted data');
    })
}

deletFile()