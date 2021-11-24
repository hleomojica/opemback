const express = require('express');
const router = express.Router();

const colabo = require("../controllers/colaboradores.controller");

router.post("/", colabo.create);
router.get("/", colabo.findAll);
router.put("/:id", colabo.update);
router.delete("/:id", colabo.delete);

module.exports = router;