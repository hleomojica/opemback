const express = require('express');
const router = express.Router();
const cercol = require("../controllers/certcolaboradores.controller");
const awaitHandlerFactory = require('./../middleware/awaitHandlerFactory.middleware');
const auth = require('./../middleware/auth');

router.post("/", auth(), awaitHandlerFactory(cercol.create));
router.get("/GetByCedula", cercol.findByCedula);
router.get("/:id?", cercol.findAll);
router.put("/:id", auth(), cercol.update);
router.delete("/:id", cercol.delete);

module.exports = router;