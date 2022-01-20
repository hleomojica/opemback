const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('./../middleware/awaitHandlerFactory.middleware');
const auth = require("../middleware/auth")
const email = require("../controllers/email.controller");

router.post("/", auth(), awaitHandlerFactory(email.send));

module.exports = router;