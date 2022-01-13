const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('./../middleware/awaitHandlerFactory.middleware');
const cursos = require("../controllers/cursos.controller");

router.post("/", awaitHandlerFactory(cursos.create));
router.get("/:id?", awaitHandlerFactory(cursos.findAll));
router.put("/:id", awaitHandlerFactory(cursos.update));
router.delete("/:id", awaitHandlerFactory(cursos.delete));

module.exports = router;