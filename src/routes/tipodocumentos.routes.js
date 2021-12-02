const express = require('express');
const router = express.Router();

const tipodoc = require("../controllers/tipodocuementos.controller");

router.get("/", tipodoc.findAll);

module.exports = router;