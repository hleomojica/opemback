const {
    Cursos
} = require('../models');

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            [Op.like]: `%${title}%`
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

    Cursos.update(req.body, {
        where: { id: id }
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
  
    Cursos.destroy({
      where: { id: id }
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