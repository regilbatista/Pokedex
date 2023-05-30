const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Pokemon = sequelize.define("pokemon", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imageurl: {
        type: Sequelize.STRING,
        allowNull: false,
    },

}); 

module.exports = Pokemon;