const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('postgres://postgres:123456@0.0.0.0:5432/disneyDB') // Example for postgres

export default sequelize;



