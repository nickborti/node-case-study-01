const Sequelize = require('sequelize');

module.exports = sequelize => {
  const UserM = sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: Sequelize.STRING,
    username: {
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

  // UserM.associate = function (models) {
  //   // user.hasOne(models.role, {foreignKey: 'id',sourceKey: 'roleId'});
  //   UserM.belongsToMany(models.role, {
  //     through: 'user_roles',
  //     // as: 'roles',
  //     foreignKey: 'user_id',
  //     // otherKey: 'role_id'
  //   });

  // }

  return UserM;
}