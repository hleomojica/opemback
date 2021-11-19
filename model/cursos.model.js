module.exports = (sequelize, Sequelize) => {
    const Cursos = sequelize.define("cursos", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        }
    });

    return Cursos;
};