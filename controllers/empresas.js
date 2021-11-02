const db = require('../db')

async function get(req, res, next) {
    try {
        let sqlquery = `SELECT * FROM empresa`
        let arrayWhere = []
        const context = req.params
        if (context.id) {
            arrayWhere.push(` id_emp = ${context.id} `);
        }
        if (context.iduser) {
            arrayWhere.push(` idcuentaacceso_reg = ${context.iduser}`);
        }
        if (arrayWhere.length > 0) {
            sqlquery += ` where ${arrayWhere.join(" and ")}`
        }
        const rows = await db.pool.query(sqlquery);
        if (rows) {
            res.status(200).json(rows);
        } else {
            res.status(500).end();
        }
    } catch (err) {
        next(err);
    }
}
module.exports.get = get;

async function create(req, res, next) {
    const data = req.body
    try {
        const result = await db.pool.query("INSERT INTO colaboradores (tipodocumento_col,numerodocumento_col, nombres_col, apellidos_col, fechanacimiento_col, correopersonal_col, telefono_col, direccion_col,idemp_col) VALUES (?, ?, ?, ?, ?, ?, ?,?)", [data.tipoducumento, data.numerodocumento, data.nombres, data.apellidos, data.fechanacimiento, data.correo, data.telefono, data.direccion, idempresa]);
        res.status(201).json(newuser);
        return result;
    } catch (err) {
        next(err);
    }
}
module.exports.create = create;