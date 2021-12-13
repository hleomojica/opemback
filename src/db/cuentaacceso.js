const {
    QueryTypes
} = require('sequelize');
const {
    CuentaAcceso,
    sequelize
} = require('../models');

const bcrypt = require("bcrypt");
require('dotenv').config()

const tkn = process.env.JWT_TOKEN_SECRET

exports.findAll = (params) => {
    const username = params.username;
    var condition = username ? {
        username_cue: {
            [Op.like]: `%${username}%`
        }
    } : null;

    CuentaAcceso.findAll({
            where: condition
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving cuenta acceso."
            });
        });
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
    const passcryp = await bcrypt.hash(params.password_cue, salt);

    const cursos = {
        username_cue: params.username_cue,
        password_cue: passcryp,
        idcolaborador_cue: params.idcolaborador_cue,
        idroles_cue: params.idroles_cue,
    };
    CuentaAcceso.create(cursos)
        .then(data => {
            return data;
        })
        .catch(err => {
            return err
        });

}

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