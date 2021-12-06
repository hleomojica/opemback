const express = require('express');
const router = express.Router();

const colabo = require("../controllers/colaboradores.controller");

router.post("/", colabo.create);
router.get("/getByParam/", colabo.findAll);
router.get("/:id?", colabo.findAllPaging);
router.put("/:id", colabo.update);
router.delete("/:id", colabo.delete);


module.exports = router;