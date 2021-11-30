const express = require('express');
const router = express.Router();

const certi = require("../controllers/certificaciones.controller");


router.post("/", certi.create);
router.get("/:id?", certi.findAll);
router.put("/:id", certi.update);
router.delete("/:id", certi.delete);

module.exports = router;