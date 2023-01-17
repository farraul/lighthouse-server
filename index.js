const { createServer } = require('@lhci/server');
const ApiClient = require('@lhci/utils/src/api-client.js');
const express = require('express')


const app = express()
const port = process.env.PORT || 3003

const newProject = {
    projectName: 'prueba1',
    externalURL: 'https://github.com/',
    baseBranch: 'main',
    slug: 'https://github.com/',
    serverBaseUrl: 'http://localhost:9001'
}

/***Create lighthouse server ***/
createServer({
    port: 9001,
    storage: {
        storageMethod: 'sql',
        sqlDialect: 'mysql',
        sqlConnectionSsl: false,
        sqlConnectionUrl: 'mysql://root@127.0.01:3306/lighthouse'
    }
}).then(({ port }) => {
    console.log("Lighthouse Server is running in the port", port)
}).catch((error) => {
    console.log("error:", error)
})


app.listen(port, () => {
    console.log(`API is running in the port: ${port}`)
})
/*** Endpoint API to create new project in lighthouse server ***/
/* http://localhost:3003/create-project */

app.get('/create-project', (req, res) => {

    /**
     * @param {LHCI.WizardCommand.Options} options
     * @return {Promise<void>}
     */

    const createProject = async (options) => {
        const api = new ApiClient({
            ...options,
            rootURL: newProject.serverBaseUrl
        });
        const project = await api.createProject({
            name: newProject.projectName,
            externalUrl: newProject.projectExternalUrl,
            baseBranch: newProject.projectBaseBranch,
            slug: '',
        });
        res.send({
            'adminToken': project.adminToken,
            'token': project.token
        })
    }
    createProject()
})

