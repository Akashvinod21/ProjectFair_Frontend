//import
const http = require('http')

//server
http.createServer((req,res)=>{
    res.write('request received')
    res.end()
}).listen(4000,()=>{
    console.log('server running successfully');
})