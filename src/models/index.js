const Sequelize = require("sequelize");

const cuentaaccesoModel = require("./cuentaacceso.model")
const cursosModel = require("./cursos.model.js")
const certificacionesModel = require("./certificaciones.model")
const empresasModel = require("./empresas.model")
const colaboradoresModel = require("./colaboradores.model")
const rolesModel = require("./roles.model")
const certColaboradoresModel = require("./certcolaboradores.model")

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
const Colaboradores = colaboradoresModel(sequelize, Sequelize)
const CuentaAcceso = cuentaaccesoModel(sequelize, Sequelize)
const Roles = rolesModel(sequelize, Sequelize)
const CertColaboradores = certColaboradoresModel(sequelize, Sequelize)

sequelize.sync({
  force: false
}).then(() => {
  console.log('tablas sincronizadas')
})

CertColaboradores.hasMany(Colaboradores, {
  foreignKey: 'id_col'
})

module.exports = {
  Sequelize,
  sequelize,
  Cursos,
  Certificaciones,
  Empresa,
  Colaboradores,
  CuentaAcceso,
  Roles,
  CertColaboradores
}