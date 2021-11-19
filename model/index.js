const Sequelize = require("sequelize");
const sequelize = new Sequelize("opem", "root", "mojica123", {
  host: "127.0.0.1",
  dialect: "mariadb",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.cursos = require("./cursos.model.js")(sequelize, Sequelize);

module.exports = db;