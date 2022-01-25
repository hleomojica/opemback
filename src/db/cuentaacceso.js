const {
    QueryTypes
} = require('sequelize');
const {
    CuentaAcceso,
    sequelize,
    Sequelize,
    Colaboradores
} = require('../models');
const Op = Sequelize.Op;
const bcrypt = require("bcrypt");


exports.findAll = async (params) => {

    var condition = {};

    const {
        idcol,
        username
    } = params;

    if (idcol) {
        condition.idcolaborador_cue = {
            [Op.eq]: idcol
        }
    }
    if (username) {
        condition.username_cue = {
            [Op.eq]: username
        }
    }
    return await CuentaAcceso.findAll({
        attributes: ['id_cue', 'idcolaborador_cue', 'username_cue', 'idroles_cue'],
        include: [
            { model: Colaboradores }
        ],
        where: condition
    })
}

exports.findOne = async (params) => {
    const id = params.id;
    const cuentas = await CuentaAcceso.findByPk(id)
    if (cuentas) {
        return cuentas
    } else {
        return null
    }
};

exports.create = async (params) => {

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const passcryp = await bcrypt.hash(params.password, salt);

    const cuentas = {
        username_cue: params.username,
        password_cue: passcryp,
        idcolaborador_cue: params.idcolaborador,
        idroles_cue: params.idrol,
    };
    return await CuentaAcceso.create(cuentas)
}

exports.update = async (params, id) => {

    const cas = {
        username_cue: params.username,
        password_cue: passcryp,
        idcolaborador_cue: params.idcolaborador,
        idroles_cue: params.idroles,
        intentosbloqueo_cue:params.intentosbloqueo,
    };
    return await CuentaAcceso.update(cas, {
        where: {
            id_cue: id
        }
    })
};

exports.auth = async (params) => {
    try {
        const user = await sequelize.query(`select id_cue, username_cue,password_cue,idroles_cue,correopersonal_col,nombres_col,id_col,apellidos_col from cuentaaccesos cas INNER JOIN colaboradores cola ON cas.idcolaborador_cue = cola.id_col  WHERE username_cue = :username`, {
            replacements: {
                username: params.username
            },
            type: QueryTypes.SELECT
        });
        return user
    } catch (err) {
        return err;
    }
}