const mysql = require('mysql2');
const configuration = require('./configuration.js');
const bbdd = require(`./constants/${process.env.NODE_ENV}/bbdd.json`);
const { newProject, getProjects } = require('./lighthouse.js')

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

        configuration.forEach(confiProject => {
          const findProject = (project) => {
            return project == confiProject.projectName
          }
          !projects.some(findProject) && newProject(confiProject)
        })

        getProjects(result);
      })
    });
  }
});
