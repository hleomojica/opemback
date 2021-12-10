const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('./../middleware/awaitHandlerFactory.middleware');
const colabo = require("../controllers/colaboradores.controller");

router.post("/", colabo.create);
router.get("/getByParam/", colabo.findAll);
router.get("/:id?", awaitHandlerFactory(colabo.findAllPaging));
router.put("/:id", colabo.update);
router.delete("/:id", colabo.delete);


module.exports = router;