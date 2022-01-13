
const CuentaAcceso = require('./../db/cuentaacceso');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const tkn = process.env.JWT_TOKEN_SECRET

exports.findAll = async (req, res, next) => {
    CuentaAcceso.findAll(req.query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err)
        });
}

exports.findOne = (req, res, next) => {
    const id = req.params.id;

    CuentaAcceso.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find certificados with id=${id}.`
                });
            }
        })
        .catch(err => {
            next(err)
        });
};

exports.create = async (req, res, next) => {
    if (!req.body.username) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    if (!req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    CuentaAcceso.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err)
        });
}

exports.update = async (req, res, next) => {
    const id = req.params.id;
    CuentaAcceso.update(req.body, id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err)
        });
}

exports.auth = async (req, res, next) => {
    const context = req.body;

    if (!context.username || !context.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    try {
        const user = await CuentaAcceso.auth(context)

        if (!user) return res.status(401).send("Usuario o contraseña incorrecto");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user[0].password_cue
        );
        delete user[0].password_cue
        if (!validPassword)
            return res.status(401).send("Invalid email or password");

        const token = jwt.sign({
            user_id: user[0].id_cue.toString(),
            username: user[0].username_cue
        }, tkn, {
            expiresIn: '10h'
        });
        res.send({
            accesToken: token,
            dataUser: user[0]
        });

    } catch (err) {
        next(err);
    }
}