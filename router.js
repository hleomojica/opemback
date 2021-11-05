const express = require('express');
const router = new express.Router();
const colabo = require('./controllers/colaboradores');
const empresa = require('./controllers/empresas');
const curso = require('./controllers/cursos');
const certifica = require('./controllers/certificaciones');
/*
const registro = require('./controllers/registro');
const permisos= require('./controllers/permisosroles');
const cuentaacceso = require('./controllers/cuentaacceso');
const depto = require('./controllers/departamentos');
const mun = require('./controllers/municipios');
const rol = require('./controllers/roles');
const modulos = require('./controllers/modulos');
const auth = require('./middleware/auth');
*/

//colaboradores
router.get('/colaboradores/:id?',colabo.get);
router.post('/colaboradores',colabo.create);
router.put('/colaboradores',colabo.edit);
router.delete('/colaboradores/:id',colabo.remove);

//empresa
router.get('/empresa/:id?',empresa.get);
router.post('/empresa',empresa.create);
router.put('/empresa',empresa.edit);
router.delete('/empresa/:id',empresa.remove);

//cursos
router.get('/cursos/:id?',curso.get);
router.post('/cursos',curso.create);
router.put('/cursos',curso.edit);
router.delete('/cursos/:id',curso.remove);

//certifica
router.get('/certificaciones/:id?',certifica.get);
router.post('/certificaciones',certifica.create);
router.put('/certificaciones',certifica.edit);
router.delete('/certificaciones/:id',certifica.remove);

/*

//permisos perisos
router.get('/permisos/:id?', auth, permisos.get);
router.post('/permisos', auth, permisos.post);
router.put('/permisos', auth, permisos.put);

//roles
router.get('/roles', auth, rol.get);

//modulos
router.get('/modulos/getbyrol/:idrol?/:ver?', auth, modulos.getbyrol);

//departamentos
router.get('/departamentos/:id?', auth, depto.get);

//municipios
router.get('/municipios/:iddepartamento?', auth, mun.get);

//Cuenta acceso 
router.route('/cuentaacceso').post(cuentaacceso.post);
router.route('/cuentaacceso').put(cuentaacceso.put);
router.route('/cuentaacceso/auth').post(cuentaacceso.auth);
*/

module.exports = router;