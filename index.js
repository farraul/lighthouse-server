process.env.NODE_ENV = process.env.NODE_ENV || 'local';

const { createServer } = require('@lhci/server');
const lighthouseServer = require(`./src/constants/${process.env.NODE_ENV}/lighthouse.json`);
const DBConfig = require('./src/db.conf');

createServer(lighthouseServer).then(({ port }) => {
    console.log("Lighthouse Server is running in the port: ", port)
    DBConfig.init();
}).catch((error) => {
    console.log("Error: ", error)
})

