const Sequelize = require("sequelize");
const conf = require('./config')
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

const sequelize = conf(Sequelize)

sequelize.sync({
  force: false
}).then(() => {
  console.log('tablas sincronizadas')
})

/*
Cursos {
  iniciales: 
}
CertColaboradores {
  consecutivo autonumerico
  columna fecha vencimiento
}
pdf {
  fuente tahoma
}
colaboradores: {
  Crear formulario de registro para cualquier usuario y colocar estado para aporbar registro
}


Cursos - Cursos
Colaboradores - Aprendices
Certtificaciones - Cohorte / Grupo
CertColaboradores - Cursos / Aprendices
Empresas - Empresas clientes


*/

const Cursos = cursosModel(sequelize, Sequelize);
const Certificaciones = certificacionesModel(sequelize, Sequelize, Cursos);
const Empresa = empresasModel(sequelize, Sequelize);
const Colaboradores = colaboradoresModel(sequelize, Sequelize)
const CuentaAcceso = cuentaaccesoModel(sequelize, Sequelize)
const Roles = rolesModel(sequelize, Sequelize)
const CertColaboradores = certColaboradoresModel(sequelize, Sequelize)
const Paises = paisesModel(sequelize, Sequelize)
const TipoDocumentos = tipodocumentosModel(sequelize, Sequelize)
const Modulos = modulosModel(sequelize, Sequelize)
const PermisosRoles = permisosrolesModel(sequelize, Sequelize)

//----Relaciones----------------------
//------------------------------------

//--Certificaciones
Certificaciones.belongsTo(Cursos, {
  foreignKey: "idcur_cer"
})
//--Colaboradores
Colaboradores.belongsTo(Paises, {
  foreignKey: "paisdocumento_col"
})
Colaboradores.belongsTo(TipoDocumentos, {
  foreignKey: "tipodocumento_col"
})
Colaboradores.belongsTo(Empresa, {
  foreignKey: "idemp_col"
})
Colaboradores.hasOne(CuentaAcceso, {
  foreignKey: 'idcolaborador_cue'
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
//--Permisos Roles
PermisosRoles.belongsTo(Roles, {
  foreignKey: 'idrol_prol'
})
// PermisosRoles.hasMany(Modulos, {
//   foreignKey: 'idmodulo_prol'
// })
//-- Modulos
Modulos.belongsToMany(Roles, {
  foreignKey: 'idmodulo_prol',
  through: PermisosRoles,
  otherKey: 'idrol_prol'
})

Modulos.hasMany(Modulos, {
  as: "Submodulos",
  foreignKey: 'father_mod'
})

Roles.belongsToMany(Modulos, {
  foreignKey: 'idrol_prol',
  through: PermisosRoles,
  otherKey: 'idmodulo_prol'
})
//--cuenta acceso
CuentaAcceso.belongsTo(Colaboradores, {
  foreignKey: 'idcolaborador_cue'
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