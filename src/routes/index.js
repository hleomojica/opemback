module.exports = app => {

  const cursos = require("./cursos.routes")
  const cert = require("./certificaciones.routes")
  const empresa = require("./empresas.routes")
  const colabora = require('./colaboradores.routes')
  const cuentaacceso = require('./cuentaacceso.routes')
  const rol = require('./roles.routes')
  const certcol = require('./certcolaboradores.routes')

  app.use(`/api/v1/cursos`, cursos);
  app.use(`/api/v1/certificaciones`, cert);
  app.use(`/api/v1/empresa`, empresa);
  app.use(`/api/v1/colaboradores`, colabora);
  app.use(`/api/v1/cuentaacceso`, cuentaacceso);
  app.use(`/api/v1/rol`, rol);
  app.use(`/api/v1/certcol`, certcol);
  
};