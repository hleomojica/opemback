const {
    Paises,
    Sequelize
} = require('../models');
const Op = Sequelize.Op;

exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? {
        id_pais: {
            [Op.eq]: id
        }
    } : null;

    Paises.findAll({
        where: condition
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving roles."
            });
        });
};