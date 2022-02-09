const express = require('express');
const router = express.Router();
const cercol = require("../controllers/certcolaboradores.controller");
const awaitHandlerFactory = require('./../middleware/awaitHandlerFactory.middleware');
const auth = require('./../middleware/auth');

router.post("/", auth(), awaitHandlerFactory(cercol.create));
router.get("/GetByCedula", awaitHandlerFactory(cercol.findByCedula));
router.get("/GetById/:id", cercol.findOne);
router.get("/:id?", auth(), cercol.findAll);
router.put("/updateEstado/:id", auth(), cercol.updateEstado);
router.put("/:id", auth(), awaitHandlerFactory(cercol.update));
router.delete("/:id", auth(),cercol.delete);

module.exports = router;