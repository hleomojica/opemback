module.exports = (sequelize, type) => {
    return sequelize.define('modulos', {
        id_mod: {
            type: type.INTEGER,
            primaryKey: true
        },
        nombre_mod: type.STRING    
    });
}