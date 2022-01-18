const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('./../middleware/awaitHandlerFactory.middleware');
const auth = require('./../middleware/auth');
const certi = require("../controllers/certificaciones.controller");


router.post("/", auth(), awaitHandlerFactory(certi.create));
router.get("/getByCurso/", auth(), awaitHandlerFactory(certi.findAll));
router.get("/:id?", auth(), awaitHandlerFactory(certi.findAllPaging));
router.put("/updateEstado/:id", auth(), awaitHandlerFactory(certi.updateEstado));
router.put("/:id", auth(), awaitHandlerFactory(certi.update));
router.delete("/:id", auth(), awaitHandlerFactory(certi.delete));

module.exports = router;