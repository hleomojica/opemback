const Sequelize = require("sequelize");

const cuentaaccesoModel = require("./cuentaacceso.model")
const cursosModel = require("./cursos.model.js")
const certificacionesModel = require("./certificaciones.model")
const empresasModel = require("./empresas.model")
const colaboradoresModel = require("./colaboradores.model")
const rolesModel = require("./roles.model")
const certColaboradoresModel = require("./certcolaboradores.model")
const paisesModel = require("./paises.model")
const tipodocumentosModel = require("./tipodocumentos.model")
const modulosModel = require("./modulos.model")
const permisosrolesModel = require("./permisosroles.model")

const sequelize = new Sequelize("opem", "root", "mojica123", {
  host: "127.0.0.1",
  dialect: "mariadb",
  define: {
    timestamps: false
  }
});
sequelize.sync({
  force: false
}).then(() => {
  console.log('tablas sincronizadas')
})

const Cursos = cursosModel(sequelize, Sequelize);
const Certificaciones = certificacionesModel(sequelize, Sequelize, Cursos);
const Empresa = empresasModel(sequelize, Sequelize);
const Colaboradores = colaboradoresModel(sequelize, Sequelize)
const CuentaAcceso = cuentaaccesoModel(sequelize, Sequelize)
const Roles = rolesModel(sequelize, Sequelize)
const CertColaboradores = certColaboradoresModel(sequelize, Sequelize)
const Paises = paisesModel(sequelize,Sequelize)
const TipoDocumentos = tipodocumentosModel(sequelize,Sequelize)
const Modulos = modulosModel(sequelize,Sequelize)
const PermisosRoles = permisosrolesModel(sequelize,Sequelize)


//----Relaciones----------------------
//------------------------------------

//--Permisos roles
PermisosRoles.belongsTo(Roles,{
  foreignKey:"idrol_prol"
})
PermisosRoles.belongsTo(Modulos,{
  foreignKey:"idmodulo_prol"
})
//--Certificaciones
Certificaciones.belongsTo(Cursos, {
  foreignKey: "idcur_cer"
})
//--Colaboradores
Colaboradores.belongsTo(Paises,{
  foreignKey:"paisdocumento_col"
})
Colaboradores.belongsTo(TipoDocumentos,{
  foreignKey:"tipodocumento_col"
})
Colaboradores.belongsTo(Empresa,{
  foreignKey:"idemp_col"
})
//---Certificaciones Colaboradores
CertColaboradores.belongsTo(Colaboradores, {
  foreignKey: 'idcol_ceco'
})
CertColaboradores.belongsTo(Certificaciones, {
  foreignKey: 'idcer_ceco'
})
CertColaboradores.belongsTo(Empresa, {
  foreignKey: 'idemp_ceco'
})
//-----------------------------------

module.exports = {
  Sequelize,
  sequelize,
  Cursos,
  Certificaciones,
  Empresa,
  Colaboradores,
  CuentaAcceso,
  Roles,
  CertColaboradores,
  Paises,
  TipoDocumentos,
  Modulos,
  PermisosRoles
}