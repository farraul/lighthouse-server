const ApiClient = require('@lhci/utils/src/api-client.js');

module.exports = Object.preventExtensions({
    newProject(confiProject) {

        /**
        * @param {LHCI.WizardCommand.Options} options
        * @return {Promise<void>}
        */

        (async (options) => {
            const api = new ApiClient({
                ...options,
                rootURL: confiProject.serverBaseUrl
            });
            const creationProject = await api.createProject({
                name: confiProject.projectName,
                externalUrl: confiProject.externalURL,
                baseBranch: confiProject.baseBranch,
                slug: ''  // this property is dynamically generated server-side 
            });
            console.log("Project does not exist, creating:", creationProject)
        })()
    }
})
