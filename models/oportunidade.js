const { DataTypes } = require("sequelize");

module.exports = (sequelize) => sequelize.define("Oportunidade", {
  titulo: { type: DataTypes.STRING, allowNull: false },
  instituicao: { type: DataTypes.STRING, allowNull: false },
  modalidade: { type: DataTypes.STRING, allowNull: false },
  prazo: { type: DataTypes.DATEONLY, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: false }
});
