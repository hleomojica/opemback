const db = require('../db')

async function get(req, res, next) {
    try {
        let sqlquery = `SELECT * FROM colaboradores `
        let arrayWhere = []
        const context = req.params
        if (context.id) {
            arrayWhere.push(` id_col = ${context.id} `);
        }
        if (context.iduser) {
            arrayWhere.push(` idemp_col = ${context.idempresa}`);
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
        const result = await db.pool.query("INSERT INTO colaboradores (paisdocumento_col,tipodocumento_col,numerodocumento_col, nombres_col, apellidos_col, fechanacimiento_col, correopersonal_col, telefono_col, direccion_col,idemp_col) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [data.paisdocumento, data.tipodocumento, data.numerodocumento, data.nombres, data.apellidos, data.fechanacimiento, data.correopersonal, data.telefono, data.direccion, data.idempresa]);
        res.status(201).json(result);
        return result;
    } catch (err) {
        next(err);
    }
}
module.exports.create = create;

async function edit(req, res, next) {
    const data = req.body
    try {
        const result = await db.pool.query("UPDATE colaboradores set paisdocumento_col = ?, tipodocumento_col = ? , numerodocumento_col= ?, nombres_col = ?, apellidos_col= ?, fechanacimiento_col = ?, correopersonal_col =?, telefono_col = ? ,direccion_col = ?, idemp_col= ? where id_col = ?", [data.paisdocumento, data.tipodocumento, data.numerodocumento, data.nombres, data.apellidos, data.fechanacimiento, data.correopersonal, data.telefono, data.direccion, data.idempresa, data.id]);
        res.status(201).json(result);
        return result;
    } catch (err) {
        next(err);
    }
}
module.exports.edit = edit;

async function remove(req, res, next) {
    const data = req.params
    try {
        const result = await db.pool.query("DELETE FROM colaboradores where id_col = ?", [data.id]);
        res.status(201).json(result);
        return result;
    } catch (err) {
        next(err);
    }
}
module.exports.remove = remove;