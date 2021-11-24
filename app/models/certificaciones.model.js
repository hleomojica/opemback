module.exports = (sequelize, type) => {
    return sequelize.define('certificaciones', {
        id_cer: {
            type: type.INTEGER,
            primaryKey: true
        },
        fechainicio_cer: type.STRING,
        fechafin_cer: type.STRING,
        horas_cer: type.INTEGER,
        idcur_cer: {
            type: type.INTEGER           
        }
    });
}