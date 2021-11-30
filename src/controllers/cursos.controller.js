const {
    Cursos,
    Sequelize
} = require('../models');
const Op = Sequelize.Op;

exports.findAll = (req, res) => {
    const id = req.params.id;
    var condition = id ? {
        id_cur: {
            [Op.like]: `%${id}%`
        }
    } : null;

    Cursos.findAll({
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

    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const cursos = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
    };
    Cursos.create(cursos)
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
    const cursos = {
        nombre_cur: req.body.nombre,
        descripcion_cur: req.body.descripcion,
    };
    Cursos.update(cursos, {
            where: {
                id_cur: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Curso was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Curso with id=${id}. Maybe Curso was not found or req.body is empty!`
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

    Cursos.destroy({
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
            res.status(500).send({
                message: "Could not delete Cursos with id=" + id
            });
        });
};