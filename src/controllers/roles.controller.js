const {
    Roles,
    Sequelize
} = require('../models');
const Op = Sequelize.Op
const { ValidationError } = require('sequelize');

exports.findAll = (req, res, next) => {
    const id = req.params.id;

    var condition = id ? {
        id_rol: {
            [Op.eq]: id
        }
    } : null;

    Roles.findAll({
            where: condition
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err)
        });
};

exports.create = async (req, res, next) => {

    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const rols = {
        nombre_rol: req.body.nombre,
        descripcion_rol: req.body.descripcion,
    };
    Roles.create(rols)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err)
        });
};

exports.update = (req, res, next) => {
    const id = req.params.id;

    const rols = {
        nombre_rol: req.body.nombre,
        descripcion_rol: req.body.descripcion
    };
    Roles.update(rols, {
            where: {
                id_rol: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Certificacion was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Certificacion with id=${id}. Maybe Certificacion was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            next(err)
        });
};

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Roles.destroy({
            where: {
                id_rol: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cursos was deleted successfully!"
                });
            } else {
                next({
                    message: `Cannot delete Cursos with id=${id}. Maybe Cursos was not found!`
                });
            }
        })
        .catch(err => {
            next(err)
        });
};