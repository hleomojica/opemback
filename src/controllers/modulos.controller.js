const { Modulos, Sequelize, Roles, PermisosRoles, } = require('../models');
const Op = Sequelize.Op;

exports.findAll = (req, res) => {
    const id = req.query.id;
    const {
        idrol,
        menu
    } = req.query;

    var conditionrol = {};
    var condition = {};

    if (idrol) {
        conditionrol.id_rol = {
            [Op.eq]: idrol
        }
    }
    if (menu) {
        condition.father_mod = {
            [Op.eq]: null
        }
    }
    Modulos.findAll({
        include: [
            {
                model: Roles,
                where: conditionrol,
                required: false
            },
            { model: Modulos, as: "Submodulos" }
        ],
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