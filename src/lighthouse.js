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
    },

    // getToken(result) {

    //     // const project = {
    //     //     id: "7e03eeea-7484-41f3-8638-8476ebf47d2f",
    //     // };

    //     /**
    //     * @param {LHCI.ServerCommand.Project} project
    //     * @return {Promise<string>}
    //     */


    //     (async (options) => {
    //         const api = new ApiClient({
    //             ...options,
    //             rootURL: 'http://localhost:9001',
    //         });

    //         const getToken = await api.getProjectToken(project)
    //         console.log("The token its:", getToken)

    //     })()
    // }
})
