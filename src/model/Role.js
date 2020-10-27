const Sequelize = require('sequelize');

module.exports = sequelize => {
  const RoleM = sequelize.define('Role', {
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

  // RoleM.associate = function (models) {
  //   // user.hasOne(models.role, {foreignKey: 'id',sourceKey: 'roleId'});
  //   RoleM.belongsToMany(models.user, {
  //     through: 'user_roles',
  //     // as: 'roles',
  //     foreignKey: 'role_id',
  //     // otherKey: 'role_id'
  //   });
  // }

  return RoleM
}