const Sequelize = require('sequelize');

module.exports = sequelize => {
  const UserM = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: Sequelize.STRING,
    username:{
      type: Sequelize.STRING(15),
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING(40),
      allowNull: false,
      unique: true
    },
    password: Sequelize.STRING(100),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });

  return UserM;
}