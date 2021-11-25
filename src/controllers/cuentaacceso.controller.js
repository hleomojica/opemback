
const { QueryTypes } = require('sequelize');
const { CuentaAcceso, sequelize } = require('../models');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const tkn = process.env.JWT_TOKEN_SECRET

exports.findAll = (req, res) => {
    const username = req.query.title;
    var condition = title ? {
        username: {
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
exports.create = async (req, res) => {
    if (!req.body.username_cue) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    if (!req.body.password_cue) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const passcryp = await bcrypt.hash(req.body.password_cue, salt);

    const cursos = {
        username_cue: req.body.username_cue,
        password_cue: passcryp,
        idcolaborador_cue: req.body.idcolaborador_cue,
        idroles_cue: req.body.idroles_cue,
    };
    CuentaAcceso.create(cursos)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        });

}
/*
async function update(req, res, next) {
    const data = req.body
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const passcryp = await bcrypt.hash(data.password, salt);

    try {
        const result = await db.pool.query("update cuentaacceso set password_cue = ?, idroles_cue= ? where id_cue = ?)", [passcryp, data.idrol, data.id]);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}
module.exports.update = update;
*/
exports.auth = async (req, res, next) => {
    const context = req.body;

    if (!context.username || !context.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    try {
        const user = await sequelize.query(`select username_cue,password_cue,idroles_cue,correopersonal_col,nombres_col,id_col,apellidos_col from cuentaaccesos cas INNER JOIN colaboradores cola ON cas.idcolaborador_cue = cola.id_col  WHERE username_cue = :username`,
            {
                replacements: { username: context.username },
                type: QueryTypes.SELECT
            });
        if (!user) return res.status(401).send("Usuario o contraseña incorrecto");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user[0].password_cue
        );
        delete user[0].password_cue
        if (!validPassword)
            return res.status(401).send("Invalid email or password");

        const token = jwt.sign({
            username: user[0].username_cue
        }, tkn, {
            expiresIn: '24h'
        });

        res.send({
            accesToken: token,
            dataUser: user[0]
        });

    } catch (err) {
        next(err);
    }
}