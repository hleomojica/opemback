const Sequelize = require("sequelize");
const cursosModel = require("./cursos.model.js")

const sequelize = new Sequelize("opem", "root", "mojica123", {
  host: "127.0.0.1",
  dialect: "mariadb",
  define: {
    timestamps: false
  }

});

const Cursos = cursosModel(sequelize, Sequelize);

sequelize.sync({
  force: false
}).then(() => {
  console.log('tablas sincronizadas')
})

module.exports = {
  Cursos
}