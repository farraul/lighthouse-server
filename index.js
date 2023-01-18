const { createServer } = require('@lhci/server');
const ApiClient = require('@lhci/utils/src/api-client.js');
const configuration = require('./configuration.js')
var mysql = require('mysql2');

let projects = [];

var conexion = mysql.createConnection({
    host: 'localhost',
    database: 'lighthouse',
    user: 'root',
    password: '',
});

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

    conexion.connect(function (err) {
        if (err) {
            console.error('Error de conexion: ' + err.stack);
            return;
        }

        conexion.query("SELECT * FROM projects", function (err, result, fields) {
            if (err) throw err;
            projects = result.map(project => project.name)

            configuration.forEach(confProject => {

                const findProject = (project) => {
                    return project == confProject.projectName
                }

                if ((projects.some(findProject))) {
                    console.log("Proyecto existe: ", confProject.projectName)
                }
                else {
                    /**
                    * @param {LHCI.WizardCommand.Options} options
                    * @return {Promise<void>}
                    */

                    const createProject = async (options) => {
                        const api = new ApiClient({
                            ...options,
                            rootURL: confProject.serverBaseUrl
                        });
                        const creationProject = await api.createProject({
                            name: confProject.projectName,
                            externalUrl: confProject.projectExternalUrl,
                            baseBranch: confProject.projectBaseBranch,
                            slug: confProject.slug,
                        });
                        console.log("Proyecto no existe, creando: ", creationProject)

                    }
                    createProject()
                }
            })
        });
    })
}).catch((error) => {
    console.log("error:", error)
})

