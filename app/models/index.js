const Sequelize = require("sequelize");

const cuentaaccesoModel = require("./cuentaacceso.model")
const cursosModel = require("./cursos.model.js")
const certificacionesModel = require("./certificaciones.model")
const empresasModel = require("./empresas.model")
const colaboradoresModel = require("./colaboradores.model")

const sequelize = new Sequelize("opem", "root", "mojica123", {
  host: "127.0.0.1",
  dialect: "mariadb",
  define: {
    timestamps: false
  }
});

const Cursos = cursosModel(sequelize, Sequelize);
const Certificaciones = certificacionesModel(sequelize, Sequelize);
const Empresa = empresasModel(sequelize, Sequelize);
const Colaboradores = colaboradoresModel(sequelize,Sequelize)
const CuentaAcceso = cuentaaccesoModel(sequelize,Sequelize)

sequelize.sync({
  force: false
}).then(() => {
  console.log('tablas sincronizadas')
})

module.exports = {
  sequelize,
  Cursos,
  Certificaciones,
  Empresa,
  Colaboradores,
  CuentaAcceso
}