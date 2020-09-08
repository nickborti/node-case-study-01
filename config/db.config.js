const Sequelize = require('sequelize');
const config = require('./env');

const sequelize = new Sequelize(config.db, config.uname, config.pw, {
    host: config.host,
    dialect: config.dialect,
});

const Role = require('./../model/Role')(sequelize);
const User = require('./../model/User')(sequelize);

// Tutorial.belongsToMany(Tag, {
//     through: "tutorial_tag",
//     as: "tags",
//     foreignKey: "tutorial_id",
//   });
  
//   Tag.belongsToMany(Tutorial, {
//     through: "tutorial_tag",
//     as: "tutorials",
//     foreignKey: "tag_id",
//   });

Role.belongsToMany(User, { 
    through: 'user_roles', as: "users", foreignKey: 'roleId'
});
User.belongsToMany(Role, { 
    through: 'user_roles', as: "roles", foreignKey: 'userId'
});

module.exports = sequelize;

