const db = require('../db')

async function get(req, res, next) {
    try {
        let sqlquery = `SELECT * FROM cursos `
        let arrayWhere = []
        const context = req.params
        if (context.id) {
            arrayWhere.push(` id_cur = ${context.id} `);
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
        const result = await db.pool.query("INSERT INTO cursos (nombre_cur,descripcion_cur) VALUES (?, ?)", [data.nombre, data.descripcion]);
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
        const result = await db.pool.query("UPDATE cursos set nombre_cur = ?, descripcion_cur = ?  where id_cur = ?", [data.nombre, data.descripcion,data.id]);
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
        const result = await db.pool.query("DELETE FROM cursos where id_cur = ?", [data.id]);
        res.status(201).json(result);
        return result;
    } catch (err) {
        next(err);
    }
}
module.exports.remove = remove;