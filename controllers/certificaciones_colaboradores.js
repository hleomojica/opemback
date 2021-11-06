const db = require('../db')

async function get(req, res, next) {
    try {
        let sqlquery = `SELECT * FROM certificaciones_colaboradores `
        let arrayWhere = []
        const context = req.params
        if (context.id) {
            arrayWhere.push(` id_ceco = ${context.id} `);
        }
        if (context.idcer) {
            arrayWhere.push(` idcer_ceco = ${context.idcer}`);
        }
        if (context.idcol) {
            arrayWhere.push(` idcol_ceco = ${context.idcol}`);
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
        const result = await db.pool.query("INSERT INTO certificaciones_colaboradores (idcer_ceco,idcol_ceco,idemp_ceco, estado_ceco,descargado_ceco) VALUES (?, ?, ?, ?, ?)", [data.idcer, data.idcol, data.idemp, data.estado, data.descargado]);
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
        const result = await db.pool.query("UPDATE certificaciones_colaboradores set idcer_ceco = ?, idcol_ceco = ? , idemp_ceco= ?, estado_ceco = ? ,descargado_ceco = ? where id_ceco = ?", [data.idcer, data.idcol, data.idemp, data.estado, data.descargado, data.id]);
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
        const result = await db.pool.query("DELETE FROM certificaciones_colaboradores where id_ceco = ?", [data.id]);
        res.status(201).json(result);
        return result;
    } catch (err) {
        next(err);
    }
}
module.exports.remove = remove;