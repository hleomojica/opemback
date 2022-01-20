const { Colaboradores, Sequelize, Paises, TipoDocumentos, Empresa, CuentaAcceso } = require('../models');
const paging = require("./../utils/Paging.utils");
const Op = Sequelize.Op;

exports.findAll = (req, res, next) => {
    const id = req.params.id;
    const {
        idemp
    } = req.query;

    var condition = {}
    if (id) {
        condition.id_col = {
            [Op.eq]: id
        }
    }

    if (idemp) {
        condition.idemp_col = {
            [Op.eq]: idemp
        }
    }

    Colaboradores.findAll({
        include: [
            { model: Paises },
            { model: TipoDocumentos },
            { model: Empresa }
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

exports.findAllPaging = (req, res, next) => {
    const id = req.params.id;
    const {
        page,
        size,
        nombre,
        idemp,
        cedula
    } = req.query;

    var condition = {};

    if (id) {
        condition.id_col = {
            [Op.eq]: id
        }
    }
    if (idemp) {
        condition.idemp_col = {
            [Op.eq]: idemp
        }
    }
    if (nombre) {
        condition.nombres_col = {
            [Op.like]: `%${nombre}%`
        }
    }
    if (cedula) {
        condition.numerodocumento_col = {
            [Op.like]: `%${cedula}%`
        }
    }
    const {
        limit,
        offset
    } = paging.getPagination(page, size);

    Colaboradores.findAndCountAll({
        include: [
            { model: Paises },
            { model: TipoDocumentos },
            { model: Empresa },
            {
                model: CuentaAcceso,
                attributes: ['id_cue', 'idcolaborador_cue', 'username_cue', 'idroles_cue'],
            }
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

exports.create = (req, res, next) => {

    if (!req.body.numerodocumento) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const cola = {
        paisdocumento_col: req.body.paisdocumento,
        tipodocumento_col: req.body.tipodocumento,
        numerodocumento_col: req.body.numerodocumento,
        nombres_col: req.body.nombres,
        apellidos_col: req.body.apellidos,
        fechanacimiento_col: req.body.fechanacimiento,
        correopersonal_col: req.body.correopersonal,
        telefono_col: req.body.telefono,
        direccion_col: req.body.direccion,
        idemp_col: req.body.idemp,
        estado_col: req.body.estado,
        terminos_col: req.body.terminos,
    };
    Colaboradores.create(cola)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err)
        });
};

exports.update = (req, res, next) => {
    const id = req.params.id;
    const cola = {
        paisdocumento_col: req.body.paisdocumento,
        tipodocumento_col: req.body.tipodocumento,
        numerodocumento_col: req.body.numerodocumento,
        nombres_col: req.body.nombres,
        apellidos_col: req.body.apellidos,
        fechanacimiento_col: req.body.fechanacimiento,
        correopersonal_col: req.body.correopersonal,
        telefono_col: req.body.telefono,
        direccion_col: req.body.direccion,
        idemp_col: req.body.idemp,
        estado_col: req.body.estado
    };
    Colaboradores.update(cola, {
        where: {
            id_col: id
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Colaboradores was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Colaboradores with id=${id}. Maybe Colaboradores was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            next(err)
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Colaboradores.destroy({
        where: {
            id: id
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Colaboradores was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Colaboradores with id=${id}. Maybe Colaboradores was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Colaboradores with id=" + id
            });
        });
};