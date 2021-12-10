const express = require('express');
const router = express.Router();
const cercol = require("../controllers/certcolaboradores.controller");
const awaitHandlerFactory = require('./../middleware/awaitHandlerFactory.middleware');

router.post("/", awaitHandlerFactory(cercol.create));
router.get("/", cercol.findAll);
router.put("/:id", cercol.update);
router.delete("/:id", cercol.delete);

module.exports = router;