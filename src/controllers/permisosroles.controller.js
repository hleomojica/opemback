const {
    PermisosRoles, Roles, Modulos
} = require('../models');

const Op = Sequelize.Op;

exports.findAll = (req, res, next) => {

    const {
        idrol
    } = req.query;

    var condition = {};

    if (idrol) {
        condition.idrol_prol = {
            [Op.eq]: idrol
        }
    }

    PermisosRoles.findAll({
        include: [
            { model: Roles },
            { model: Modulos }
        ],
        where: condition,
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err)
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    PermisosRoles.findByPk(id)
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
            res.status(500).send({
                message: "Error retrieving certificados with id=" + id
            });
        });
};

exports.create = async (req, res, next) => {

    if (!req.body.idcer) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const cercol = {
        idcer_ceco: req.body.idcer,
        idcol_ceco: req.body.idcol,
        idemp_ceco: req.body.idemp,
        estado_ceco: req.body.estado,
        descargado_ceco: req.body.descargado
    };
    PermisosRoles.create(cercol)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err)
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    const cercol = {
        idcer_ceco: req.body.idcer,
        idcol_ceco: req.body.idcol,
        idemp_ceco: req.body.idemp,
        estado_ceco: req.body.estado,
        descargado_ceco: req.body.descargado
    };
    console.log(id)
    PermisosRoles.update(cercol, {
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

    PermisosRoles.destroy({
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