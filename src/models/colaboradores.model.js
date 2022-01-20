module.exports = (sequelize, type) => {
    return sequelize.define('colaboradores', {
        id_col: {
            type: type.INTEGER,
            primaryKey: true
        },
        paisdocumento_col: type.INTEGER,
        tipodocumento_col: type.INTEGER,
        numerodocumento_col: type.STRING,
        nombres_col: type.STRING,
        apellidos_col: type.STRING,
        fechanacimiento_col: type.DATE,
        correopersonal_col: type.STRING,
        telefono_col: type.STRING,
        direccion_col: type.STRING,
        idemp_col: {
            type: type.INTEGER
        },
        estado_col: type.INTEGER,
        terminos_col: type.INTEGER,
    });
}