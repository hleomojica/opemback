module.exports = (sequelize, type) => {
    return sequelize.define('certificaciones_colaboradores', {
        id_ceco: {
            type: type.INTEGER,
            primaryKey: true
        },
        idcer_ceco: {
            type: type.INTEGER
        },
        idcol_ceco: {
            type: type.INTEGER
        },
        idemp_ceco: type.INTEGER,
        estado_ceco: type.STRING,
        descargado_ceco: type.INTEGER,        
    });
}