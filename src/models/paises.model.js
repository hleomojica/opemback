module.exports = (sequelize, type) => {
    return sequelize.define('pais', {
        id_pais: {
            type: type.INTEGER,
            primaryKey: true
        },
        nombre_pais: type.STRING,
        inicianles_pais: type.STRING
    });    
}