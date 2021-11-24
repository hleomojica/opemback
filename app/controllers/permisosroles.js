const db = require('../../db')

async function get(req, res, next) {
    try {
        const context = {};
        context = req.params

        let sqlquery = 'select * from permisosroles '
        let arrayWhere = []

        if (context.id) {
            arrayWhere.push(` id_prol = ${context.id}`);
        }
        if (context.idrol) {
            arrayWhere.push(` idrol_prol = ${context.idrol}`);
        }
        if (arrayWhere.length > 0) {
            sqlquery += ` where ${arrayWhere.join(" and ")}`
        }
        const rows = await db.pool.query(sqlquery);

        if (rows) {
            if (rows.length > 0) {
                res.status(200).json(rows);
            } else {
                res.status(404).end();
            }
        }
    } catch (err) {
        next(err);
    }
}
module.exports.get = get;

async function post(req, res, next) {
    const data = req.body
    try {
        const result = await db.pool.query("INSERT INTO permisosroles (idrol_prol, idmodulo_prol,ver_prol,crear_prol,editar_prol,eliminar_prol) VALUES (?, ?, ?,?,?,?)", [data.idrol, data.idmodulo, data.ver, data.crear, data.editar, data.eliminar]);

        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
}
module.exports.post = post;

async function put(req, res, next) {
    try {
        const data = req.body;
        const result = await db.pool.query("UPDATE permisosroles SET idmodulo_prol=?,idrol_prol =?,ver_prol=?,editar_prol =?,crear_prol = ?, eliminar_prol = ? WHERE  id_prol=?", [data.idmodulo, data.idrol, data.ver, data.editar, data.crear, data.eliminar, data.id]);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
}
module.exports.put = put;