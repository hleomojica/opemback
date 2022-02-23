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

Certificados:{
  Fecha expedicion
  Fecha vencimiento

  Que no se puede eliminar, solo editar el estado a :
  -Cancelado
  -Finalizado
  -En Curso
}

Cursos-Aprendiz: {
  Agregar tabla de colaboradores para asocirlos al certificado,
  Filtros:{
    Cohorte
    Empresa
    Curso
  }
}
Empresa: {
  Agregar telefono persona contacto
  Agregar correo persona contacto
}
Aprendices: {
  Descargar formato para cargue
  Importar datos de excel
  Exportar en excel
}
Modulos:{
  Orden del menu
}

------------------------------------
Consulta certificados: {
  Aprendiz: Nombre completa apellido
  Fecha Expedicion, Fecha vencimiento
  que no pueda descargar
}

REUNION JJ - MOJICA 07/02/2022
Hallazgos de opemapp:
1. Al editar una empresa e incluir todos los datos, sale error code 500 (solo al editar)
2. Al eliminar un aprendiz, no me deja; sale error code 404 
3. Al exportar la plantilla, no se actualiza con los ultimos datos (en este caso, emrpesa creada) Solo esta sacando los primeros 10
4. Editar Cursos-Aprendices para que se peuda agregar la empresa 
5. despeus de finalizada la edicion, que me devuleva al listado incial
6. Limpiar los aprendices en cursos aprendices
7. revisar error al seleccionar / despues de guardar toca refrescarlo
8. Error cursos aprendices - paginación, cuando pruebo me manda a la pagina 
9. pONERLA OPCION DE APROBAR TODOS LOS CURSOS Q UNO ACABE DE INCLUIR (NO UNO POR UNO)
10. la desplegable de empresas solo salen 10, las otras no cargan y estan en otras paginas
11. ordenar cohorte-grupo poner las opciones


12. Error paginado certcolaboradores
13. el nombre del certificado con el nombre del aprendiz iniciales curso nombre

14. Crear filtro en cohorte-grupo para el curso
15. Slucionar paginado de cohorte-grupo


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