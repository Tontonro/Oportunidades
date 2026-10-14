const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DATABASE_PATH || "oportunidades.sqlite",
  logging: false
});

const Oportunidade = require("./oportunidade")(sequelize);

module.exports = { sequelize, Oportunidade };
