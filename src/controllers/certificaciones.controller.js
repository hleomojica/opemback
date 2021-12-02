const {
    Certificaciones,
    Cursos,
    Sequelize
} = require('../models');
const Op = Sequelize.Op;
const paging = require("./../utils/Paging.utils");

exports.findAll = (req, res) => {
    
    const {
        idcur
    } = req.query;
    var condition = {}
    if (idcur) {
        condition.idcur_cer = {
            [Op.eq]: idcur
        }
    }
    Certificaciones.findAll({
            include: [{
                model: Cursos,
            }],
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

exports.findAllPaging = (req, res) => {

    const id = req.params.id;
    const {
        page,
        size
    } = req.query;

    var condition = {}

    if (id) {
        condition.id_cer = {
            [Op.eq]: id
        }
    }

    const {
        limit,
        offset
    } = paging.getPagination(page, size);

    Certificaciones.findAndCountAll({
            include: [{
                model: Cursos,
            }],
            where: condition,
            limit,
            offset
        })
        .then(data => {
            const response = paging.getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });

}

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
        horas_cer: req.body.horas,
        idcur_cer: req.body.idcur,
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

    const cert = {
        fechainicio_cer: req.body.fechainicio,
        fechafin_cer: req.body.fechafin,
        horas_cer: req.body.horas,
        idcur_cer: req.body.idcur,
    };
    Certificaciones.update(cert, {
            where: {
                id_cer: id
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
                id_cer: id
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
                message: "Could not delete Certificaciones with id=" + id + " Error " + err
            });
        });
};