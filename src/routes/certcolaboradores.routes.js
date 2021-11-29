const express = require('express');
const router = express.Router();

const cercol = require("../controllers/certcolaboradores.controller");

router.post("/", cercol.create);
router.get("/", cercol.findAll);
router.put("/:id", cercol.update);
router.delete("/:id", cercol.delete);

module.exports = router;