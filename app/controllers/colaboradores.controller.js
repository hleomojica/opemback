const {
    Colaboradores
} = require('../models');

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            [Op.like]: `%${title}%`
        }
    } : null;

    Colaboradores.findAll({
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
        idemp_col: req.body.idempresa
    };
    Colaboradores.create(cola)
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
        idemp_col: req.body.idemp

    };
    Colaboradores.update(cola, {
            where: {
                id: id
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
            res.status(500).send({
                message: "Error updating Colaboradores with id=" + id
            });
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