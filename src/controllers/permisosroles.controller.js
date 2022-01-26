const {
    PermisosRoles, Roles, Modulos, Sequelize
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

    const perol = {
        idrol_prol: req.body.idrol,
        idmodulo_prol: req.body.idmodulo,
        ver_prol: req.body.ver,
        crear_prol: req.body.crear,
        editar_prol: req.body.editar,
        eliminar_prol: req.body.eliminar,
        filtrar_prol: req.body.filtrar,
    };
    PermisosRoles.create(perol)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err)
        });
};

exports.update = (req, res, next) => {
    const id = req.params.id;

    const perol = {
        idrol_prol: req.body.idrol,
        idmodulo_prol: req.body.idmodulo,
        ver_prol: req.body.ver,
        crear_prol: req.body.crear,
        editar_prol: req.body.editar,
        eliminar_prol: req.body.eliminar,
        filtrar_prol: req.body.filtrar,
    };

    PermisosRoles.update(perol, {
        where: {
            id_prol: id
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