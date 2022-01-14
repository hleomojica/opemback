const {
    CertColaboradores,
    Colaboradores,
    Sequelize,
    Certificaciones,
    Empresa,
    Cursos
} = require('../models');

const Op = Sequelize.Op;
const paging = require("./../utils/Paging.utils");

exports.findAll = async (req, res, next) => {

    const {
        page,
        size,
        idcer,
        idcol,
        idemp
    } = req.query;

    var condition = {};

    if (idcer) {
        condition.idcer_ceco = {
            [Op.eq]: idcer
        }
    }
    if (idcol) {
        condition.idcol_ceco = {
            [Op.eq]: idcol
        }
    }
    if (idemp) {
        condition.idemp_ceco = {
            [Op.eq]: idemp
        }
    }

    const {
        limit,
        offset
    } = paging.getPagination(page, size);

    CertColaboradores.findAndCountAll({
        include: [
            { model: Colaboradores },
            {
                model: Certificaciones,
                include: [
                    { model: Cursos }
                ]

            },
            { model: Empresa },
        ],
        where: condition,
        limit,
        offset
    })
        .then(data => {
            const response = paging.getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            next(err)
        });
};

exports.findOne = async (req, res, next) => {
    const id = req.params.id;

    CertColaboradores.findByPk(id)
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
    CertColaboradores.create(cercol)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err)
        });
};

exports.update = async (req, res, next) => {
    const id = req.params.id;

    const cercol = {
        idcer_ceco: req.body.idcer,
        idcol_ceco: req.body.idcol,
        idemp_ceco: req.body.idemp,
        estado_ceco: req.body.estado,
        descargado_ceco: req.body.descargado
    };
    console.log(id)
    CertColaboradores.update(cercol, {
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

exports.delete = async (req, res, next) => {
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