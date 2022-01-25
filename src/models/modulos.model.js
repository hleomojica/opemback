module.exports = (sequelize, type) => {
    return sequelize.define('modulos', {
        id_mod: {
            type: type.INTEGER,
            primaryKey: true
        },
        nombre_mod: type.STRING,
        title_mod: type.STRING,
        icon_mod: type.STRING,
        father_mod: type.INTEGER,
        route_mod: type.STRING,
        orden_mod:type.STRING
    });
}