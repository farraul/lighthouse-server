const ApiClient = require('@lhci/utils/src/api-client.js');

module.exports = Object.preventExtensions({

  async newProject(confiProject) {
    const api = new ApiClient({
      rootURL: confiProject.serverBaseUrl
    });
    const creationProject = await api.createProject({
      name: confiProject.projectName,
      externalUrl: confiProject.externalURL,
      baseBranch: confiProject.baseBranch,
      slug: ''  // this property is dynamically generated server-side
    });
    console.log("Project does not exist, creating:", creationProject)
  },

  getProjects(result) {
    result.forEach(project => console.log("Proyecto:",project.name," Token:",project.token))
  }
})
