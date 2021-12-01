const {
    CertColaboradores,
    Colaboradores,
    Sequelize
} = require('../models');
const Op = Sequelize.Op;

exports.findAll = (req, res) => {

    const id = req.query.id;
    const idcert = req.query.idcert;
    const idcol = req.query.idcert;

    var condition = id ? {
        id_ceco: {
            [Op.like]: `%${id}%`
        }
    } : null;

    CertColaboradores.findAll({
            include: [{
                model: Colaboradores,
            }],
            where: condition
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Certificadores."
            });
        });
};

exports.create = (req, res) => {

    if (!req.body.nombre) {
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
    CertColaboradores.create(cercol)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
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

    CertColaboradores.update(cercol, {
            where: {
                id_ceco: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    CertColaboradores.destroy({
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