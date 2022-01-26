const express = require('express');
const router = express.Router();
const auth = require('./../middleware/auth');
const cuentaacce = require("../controllers/cuentaacceso.controller");
const awaitHandlerFactory = require('./../middleware/awaitHandlerFactory.middleware');

router.post("/", auth(), awaitHandlerFactory(cuentaacce.create));
router.get("/", awaitHandlerFactory(cuentaacce.findAll));
router.put("/:id", auth(), awaitHandlerFactory(cuentaacce.update));
//router.delete("/:id", cuentaacce.delete);
router.post("/auth", cuentaacce.auth);

module.exports = router;