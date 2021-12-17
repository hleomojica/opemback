const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('./../middleware/awaitHandlerFactory.middleware');
const auth = require('./../middleware/auth');
const roles = require("../controllers/roles.controller");

router.post("/", auth(), awaitHandlerFactory(roles.create));
router.get("/:id?", auth(), awaitHandlerFactory(roles.findAll));
router.put("/:id", auth(), awaitHandlerFactory(roles.update));
router.delete("/:id", auth(), awaitHandlerFactory(roles.delete));

module.exports = router;