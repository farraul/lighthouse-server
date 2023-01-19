const mysql = require('mysql2');
const ApiClient = require('@lhci/utils/src/api-client.js');

const constants = require('./constants.js')
const bbdd = require(`./constants/${process.env.NODE_ENV}/bbdd.json`);
let projects = [];

var conexion = mysql.createConnection(bbdd);

module.exports = Object.preventExtensions({

    init() {
        conexion.connect(function (err) {
            if (err) {
                console.error('Error de conexion: ' + err.stack);
                return;
            }
            conexion.query("SELECT * FROM projects", function (err, result) {
                if (err) throw err;
                projects = result.map(project => project.name)

                constants.forEach(confProject => {
                    const findProject = (project) => {
                        return project == confProject.projectName
                    }
                    if ((projects.some(findProject))) {
                        console.log("Project exists: ", confProject.projectName)
                    }
                    else {
                        /**
                        * @param {LHCI.WizardCommand.Options} options
                        * @return {Promise<void>}
                        */
                       
                        (async (options) => {
                            const api = new ApiClient({
                                ...options,
                                rootURL: confProject.serverBaseUrl
                            });
                            const creationProject = await api.createProject({
                                name: confProject.projectName,
                                externalUrl: confProject.externalURL,
                                baseBranch: confProject.baseBranch,
                                slug: ''  // this property is dynamically generated server-side 
                            });
                            console.log("Project does not exist, creating:", creationProject)
                        })();
                    }
                })
            })
        });
    }
});