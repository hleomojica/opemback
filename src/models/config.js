require('dotenv').config()
module.exports = (Sequelize) => {
    return new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        port: process.env.DB_PORT, host: process.env.DB_HOST, dialect: "mysql", define: { timestamps: false }
    });
}