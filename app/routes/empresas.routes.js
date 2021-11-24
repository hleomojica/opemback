const express = require('express');
const router = express.Router();

const empresas = require("../controllers/empresas.controller");

router.post("/", empresas.create);
router.get("/", empresas.findAll);
router.put("/:id", empresas.update);
router.delete("/:id", empresas.delete);

module.exports = router;