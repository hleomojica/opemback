const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('./../middleware/awaitHandlerFactory.middleware');
const colabo = require("../controllers/colaboradores.controller");

router.get("/getByParam/:id?", awaitHandlerFactory(colabo.findAll));
router.get("/:id?", awaitHandlerFactory(colabo.findAllPaging));
router.post("/", awaitHandlerFactory(colabo.create));
router.post("/createArray", awaitHandlerFactory(colabo.createArray));
router.put("/:id",  awaitHandlerFactory(colabo.update));
router.delete("/:id", colabo.delete);


module.exports = router;