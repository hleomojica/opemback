const { Roles, Modulos } = require('../models');

exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? {
        id: {
            [Op.like]: id
        }
    } : null;

    Roles.findAll({        
        where: condition
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving roles."
            });
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