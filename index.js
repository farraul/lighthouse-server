const { createServer }= require('@lhci/server');

console.log("starting the server")

createServer({
port:9001,

storage: { 
storageMethod: 'sql',
sqlDialect: 'mysql',
sqlConnectionSsl: false,
sqlConnectionUrl: 'mysql://root@127.0.01:3306/lighthouse'
}

}).then(({ port }) => {
    console.log("port: ", port)
}).catch(( error )  =>{
    console.log("error:", error)
})

