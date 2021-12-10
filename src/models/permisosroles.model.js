module.exports = (sequelize, type) => {
    return sequelize.define('permisosroles', {
        id_prol: {
            type: type.INTEGER,
            primaryKey: true
        },
        idrol_prol:type.INTEGER,
        idmodulo_prol:type.INTEGER,
        ver_prol:type.INTEGER,
        crear_prol:type.INTEGER,
        editar_prol:type.INTEGER,
        eliminar_prol: type.INTEGER    
    });
}