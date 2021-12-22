const {
    Empresa,
    Sequelize
} = require('../models');
const Op = Sequelize.Op;
const paging = require("./../utils/Paging.utils");

exports.findAll = (req, res, next) => {
    const id = req.params.id;
    const {
        page,
        size
    } = req.query;

    var condition = id ? {
        id_emp: {
            [Op.eq]: id
        }
    } : null;

    const {
        limit,
        offset
    } = paging.getPagination(page, size);

    Empresa.findAndCountAll({
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
};

exports.create = (req, res, next) => {

    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const empresa = {
        nombre_emp: req.body.nombre,
        nit_emp: req.body.nit,
        telefono_emp: req.body.telefono,
        correo_emp: req.body.correo,
        direccion_emp: req.body.direccion,
        personacontacto_emp: req.body.personacontacto
    };
    Empresa.create(empresa)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err)
        });
};

exports.update = (req, res, next) => {
    const id = req.params.id;

    Empresa.update(req.body, {
        where: {
            id: id
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Empresa was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Empresa with id=${id}. Maybe Empresa was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            next(err)
        });
};

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Empresa.destroy({
        where: {
            id: id
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
            next(err)
        });
};