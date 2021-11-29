module.exports = (sequelize, type) => {
    return sequelize.define('cursos', {
        id_cur: {
            type: type.INTEGER,
            primaryKey: true
        },
        nombre_cur: type.STRING,
        descripcion_cur: type.STRING
    });    
}