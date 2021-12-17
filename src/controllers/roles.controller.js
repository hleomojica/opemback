const { Roles,Sequelize } = require('../models');
const Op = Sequelize.Op

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

exports.update = (req, res) => {
    const id = req.params.id;

    const rols = {
        id_rol: req.body.id,
        nombre_rol: req.body.nombre,
        descripcion_rol: req.body.descripcion
    };
    Roles.update(rols, {
        where: {
            id_ceco: id
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
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id + " error " + err
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Roles.destroy({
        where: {
            id_ceco: id
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cursos was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Cursos with id=${id}. Maybe Cursos was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Cursos with id=" + id
            });
        });
};