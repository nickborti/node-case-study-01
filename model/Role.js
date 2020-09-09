const Sequelize = require('sequelize');

module.exports = sequelize => {
  const RoleM = sequelize.define('roles', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: Sequelize.STRING(60),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });

  return RoleM
}