module.exports = (sequelize, type) => {
    return sequelize.define('cuentaaccesos', {
        id_cue: {
            type: type.INTEGER,
            primaryKey: true
        },
        username_cue: type.STRING,
        password_cue: type.STRING,
        idcolaborador_cue : type.INTEGER,
        idroles_cue : type.INTEGER,
    });    
}