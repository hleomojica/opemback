const db = require('../db')
const {
    CuentaAcceso
} = require('../models');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const tkn = process.env.JWT_TOKEN_SECRET

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            [Op.like]: `%${title}%`
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
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

async function create(req, res, next) {
    const data = req.body
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const passcryp = await bcrypt.hash(data.password, salt);
    try {
        const result = await db.pool.query("insert into cuentaacceso (username_cue,password_cue,idcolaborador_cue,idroles_cue) values (?,?,?,?)", [data.username, passcryp, data.idcolaborador, data.idrol]);
        res.status(200).json(result);

    } catch (err) {
        next(err);
    }

}
module.exports.create = create;

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

async function auth(req, res, next) {
    const context = req.body;
    let sqlquery = `select username_cue,password_cue,idroles_cue,correopersonal_col,nombres_col,id_col,apellidos_col from cuentaacceso cas INNER JOIN colaboradores cola ON cas.idcolaborador_cue = cola.id_col`

    try {
        if (context.username) {
            sqlquery += ` where username_cue = "${context.username}" `;
        } else {
            return res.status(400).send("Bad request");
        }
        const user = await db.pool.query(sqlquery);

        if (!user) return res.status(400).send("Usuario o contraseña incorrecto");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user[0].password_cue
        );
        delete user[0].password_cue
        if (!validPassword)
            return res.status(401).send("Invalid email or password");

        const token = jwt.sign({
            username: user.username_cue
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
module.exports.auth = auth;