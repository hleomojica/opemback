const express = require('express');
const router = express.Router();

const cuentaacce = require("../controllers/cuentaacceso.controller");

router.post("/", cuentaacce.create);
router.get("/", cuentaacce.findAll);
//router.put("/:id", cuentaacce.update);
//router.delete("/:id", cuentaacce.delete);
router.post("/auth", cuentaacce.auth);

module.exports = router;