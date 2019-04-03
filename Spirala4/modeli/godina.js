const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes){
    const godina = sequelize.define('godina', {
        nazivGod: {
            type: Sequelize.STRING,
            unique: true
        },
        nazivRepSpi: {
            type: Sequelize.STRING
        },
        nazivRepVje: {
            type: Sequelize.STRING
        }
    });
    return godina;

}