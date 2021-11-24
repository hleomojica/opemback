const express = require('express');
const router = new express.Router();
const colabo = require('./controllers/colaboradores');
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

//colaboradores
router.get('/colaboradores/:id?', colabo.get);
router.post('/colaboradores', colabo.create);
router.put('/colaboradores', colabo.edit);
router.delete('/colaboradores/:id', colabo.remove);

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

module.exports = router;