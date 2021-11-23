module.exports = app => {
    
    const cursos = require('./cursos.routes')
    
    app.use('/cursos',cursos);

  };