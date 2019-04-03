const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes){
    const vjezba = sequelize.define('vjezba', {
        naziv: {
            type: Sequelize.STRING,
            unique: true
        },
        spirala: {
            type: Sequelize.BOOLEAN
        }
    });
    return vjezba;

}