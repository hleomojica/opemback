module.exports = app => {
    const cursos = require("./../controllers/cursos.controller");
  
    var router = require("express").Router();
  
    router.post("/", cursos.create);  
    router.get("/", cursos.findAll);
    router.put("/:id", cursos.update);
    router.delete("/:id", cursos.delete);  
    app.use('/api/tutorials', router);
  };