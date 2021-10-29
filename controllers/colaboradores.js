const db = require('../db')

async function get(req, res, next) {
    try {

        let sqlquery = `SELECT * FROM colaboradores`
        let arrayWhere = []
        const context = req.params
        if (context.id) {
            arrayWhere.push(` id_reg = ${context.id} `);
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