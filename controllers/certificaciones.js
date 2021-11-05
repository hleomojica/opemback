const db = require('../db')

async function get(req, res, next) {
    try {
        let sqlquery = `SELECT * FROM certificaciones `
        let arrayWhere = []
        const context = req.params
        if (context.id) {
            arrayWhere.push(` id_cer = ${context.id} `);
        }
        if (context.iduser) {
            arrayWhere.push(` idcur_cer = ${context.idempresa}`);
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
        console.log(data.fechainicio)
        const result = await db.pool.query("INSERT INTO certificaciones (fechainicio_cer,fechafin_cer,horas_cer, idcur_cer) VALUES (?, ?, ?, ?)", [data.fechainicio, data.fechafin, data.horas, data.idcur]);
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
        const result = await db.pool.query("UPDATE certificaciones set fechainicio_cer = ?, fechafin_cer = ? , horas_cer= ?, idcur_cer = ? where id_cer = ?", [data.fechainicio, data.fechafin, data.horas, data.idcur, data.id]);
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
        const result = await db.pool.query("DELETE FROM certificaciones where id_cer = ?", [data.id]);
        res.status(201).json(result);
        return result;
    } catch (err) {
        next(err);
    }
}
module.exports.remove = remove;