const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('./../middleware/awaitHandlerFactory.middleware');
const modulos = require("../controllers/modulos.controller");

router.get("/", awaitHandlerFactory(modulos.findAll));


module.exports = router;