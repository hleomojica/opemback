const { Modulos, Sequelize, Roles, PermisosRoles, } = require('../models');
const Op = Sequelize.Op;

exports.findAll = (req, res, next) => {
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
            {
                model: Modulos,
                as: "Submodulos",
                include: [{ model: Roles }]
            }
        ],
        where: condition
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err)
        });
};

exports.update = (req, res, next) => {
    const id = req.params.id;
    const modu = {
        title_mod: req.body.title,
        father_mod: req.body.father,     
    };
    Modulos.update(modu, {
            where: {
                id_mod: id
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
            next(err);
        });
};