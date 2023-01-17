const { createServer } = require('@lhci/server');
const ApiClient = require('@lhci/utils/src/api-client.js');
const express = require('express')
const newProject = require('./src/new-project.js')


const PORT = process.env.PORT || 3003
const app = express()

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

app.listen(PORT, () => {
    console.log(`API is running in the port: ${PORT}`)
})

/*** Endpoint to create new project in lighthouse server ***/
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
            slug: newProject.slug,
        });
        res.send({
            'adminToken': project.adminToken,
            'token': project.token
        })
    }
    createProject()
})

