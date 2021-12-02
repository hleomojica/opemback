module.exports = (sequelize, type) => {
    return sequelize.define('certificaciones', {
        id_cer: {
            type: type.UUID,
            defaultValue: type.UUIDV4,
            primaryKey: true
        },
        fechainicio_cer: type.STRING,
        fechafin_cer: type.STRING,
        horas_cer: type.INTEGER,
        idcur_cer: {
            type: type.INTEGER           
        },
        cohorte_cer: type.INTEGER
    });
}