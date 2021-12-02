module.exports = (sequelize, type) => {
    return sequelize.define('tipodocumentos', {
        id_tipo: {
            type: type.INTEGER,
            primaryKey: true
        },
        nombre_tipo: type.STRING,
        iniciales_tipo: type.STRING
    });    
}