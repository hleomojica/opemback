module.exports = (sequelize, type) => {
    return sequelize.define('empresas', {
        id_emp: {
            type: type.INTEGER,
            primaryKey: true
        },
        nombre_emp: type.STRING,
        nit_emp: type.STRING,
        telefono_emp: type.STRING,
        correo_emp: type.STRING,
        direccion_emp: type.STRING,
        personacontacto_emp: type.STRING,
    });    
}