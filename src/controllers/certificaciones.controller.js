const {Certificaciones} = require('../models');

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            [Op.like]: `%${title}%`
        }
    } : null;

    Certificaciones.findAll({
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
};

exports.create = (req, res) => {

    if (!req.body.fechainicio) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const cert = {
        fechainicio_cer: req.body.fechainicio,
        fechafin_cer: req.body.fechafin,
        horas_cer:req.body.horas,
        idcur_cer:req.body.idcur,
    };
    Certificaciones.create(cert)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Certificaciones."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Certificaciones.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Certificaciones was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Certificaciones with id=${id}. Maybe Certificaciones was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Certificaciones with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Certificaciones.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Certificaciones was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Certificaciones with id=${id}. Maybe Certificaciones was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Certificaciones with id=" + id
            });
        });
};