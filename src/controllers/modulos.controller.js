const { Modulos, Sequelize, Roles, PermisosRoles, } = require('../models');
const Op = Sequelize.Op;

exports.findAll = (req, res) => {
    const id = req.query.id;
    const {
        idrol
    } = req.query;

    var conditionrol = {};
    var condition = {};

    if (idrol) {
        conditionrol.id_rol = {
            [Op.eq]: idrol
        }
    }
    Modulos.findAll({
        include: [
            {
                model: Roles,
                where: conditionrol,
                required: false                
            },           
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