const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('./../middleware/awaitHandlerFactory.middleware');
const roles = require("../controllers/roles.controller");

router.post("/", awaitHandlerFactory(roles.create));
router.get("/", awaitHandlerFactory(roles.findAll));
router.put("/:id", awaitHandlerFactory(roles.update));
router.delete("/:id", awaitHandlerFactory(roles.delete));

module.exports = router;