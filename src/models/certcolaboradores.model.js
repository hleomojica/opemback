module.exports = (sequelize, type) => {
    return sequelize.define('certificaciones_colaboradores', {
        id_ceco: {
            type: type.UUID,           
            defaultValue: sequelize.literal('UUID()'),
            primaryKey: true
        },
        idcer_ceco: {
            type: type.INTEGER
        },
        idcol_ceco: {
            type: type.INTEGER
        },
        idemp_ceco: type.INTEGER,
        estado_ceco: type.INTEGER,
        descargado_ceco: type.INTEGER,
    });
}