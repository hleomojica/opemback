const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('./../middleware/awaitHandlerFactory.middleware');
const modulos = require("../controllers/modulos.controller");
const auth = require('./../middleware/auth');

router.get("/", auth(), awaitHandlerFactory(modulos.findAll));
router.put("/:id", auth(), awaitHandlerFactory(modulos.update));

module.exports = router;