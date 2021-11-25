const express = require('express');
const router = express.Router();

const cursos = require("../controllers/cursos.controller");

router.post("/", cursos.create);
router.get("/", cursos.findAll);
router.put("/:id", cursos.update);
router.delete("/:id", cursos.delete);

module.exports = router;