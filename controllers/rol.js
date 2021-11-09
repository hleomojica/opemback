const db = require('../db')

async function get(req, res, next) {
    try {
        let sqlquery = `SELECT * FROM roles `
        let arrayWhere = []
        const context = req.params
        if (context.id) {
            arrayWhere.push(` id_rol = ${context.id} `);
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