const express = require('express');
const router = express.Router();
const perrol = require("../controllers/permisosroles.controller");
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

router.post("/", awaitHandlerFactory(perrol.create));
router.get("/", perrol.findAll);
router.put("/:id", perrol.update);
router.delete("/:id", perrol.delete);

module.exports = router;