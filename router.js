const express = require('express');
const router = new express.Router();
const colabo = require('./controllers/colaboradores');
const empresa = require('./controllers/empresas');
const curso = require('./controllers/cursos');
const certifica = require('./controllers/certificaciones');
const cuentaacceso = require('./controllers/cuentaacceso');
const rol = require('./controllers/rol');
const certificacola = require('./controllers/certificaciones_colaboradores');
const auth = require('./middleware/auth');
const permisos = require('./controllers/permisosroles');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var options = {
    explorer: true
};

router.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

/*
const registro = require('./controllers/registro');

const depto = require('./controllers/departamentos');
const mun = require('./controllers/municipios');
const modulos = require('./controllers/modulos');
*/

//colaboradores
router.get('/colaboradores/:id?', colabo.get);
router.post('/colaboradores', colabo.create);
router.put('/colaboradores', colabo.edit);
router.delete('/colaboradores/:id', colabo.remove);

//empresa
router.get('/empresa/:id?', auth, empresa.get);
router.post('/empresa', auth, empresa.create);
router.put('/empresa', auth, empresa.edit);
router.delete('/empresa/:id', empresa.remove);

//cursos
router.get('/cursos/:id?', auth, curso.get);
router.post('/cursos', auth, curso.create);
router.put('/cursos', auth, curso.edit);
router.delete('/cursos/:id', auth, curso.remove);

//certifica
router.get('/certificaciones/:id?', auth, certifica.get);
router.post('/certificaciones', auth, certifica.create);
router.put('/certificaciones', auth, certifica.edit);
router.delete('/certificaciones/:id', auth, certifica.remove);

//certificaciones colaborador
router.get('/certificacola/:id?', auth, certificacola.get);
router.post('/certificacola', auth, certificacola.create);
router.put('/certificacola', auth, certificacola.edit);
router.delete('/certificacola/:id', auth, certificacola.remove);

//Cuenta acceso 
router.route('/cuentaacceso').post(cuentaacceso.create);
router.route('/cuentaacceso').put(cuentaacceso.update);
router.route('/cuentaacceso/auth').post(cuentaacceso.auth);

//roles
router.get('/rol', auth, rol.get);

//permisos perisos
router.get('/permisos/:id?', auth, permisos.get);
router.post('/permisos', auth, permisos.post);
router.put('/permisos', auth, permisos.put);

/*
//modulos
router.get('/modulos/getbyrol/:idrol?/:ver?', auth, modulos.getbyrol);

//departamentos
router.get('/departamentos/:id?', auth, depto.get);

//municipios
router.get('/municipios/:iddepartamento?', auth, mun.get);
*/

module.exports = router;