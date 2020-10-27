const Sequelize = require('sequelize');
const config = require('./env');

const sequelize = new Sequelize(config.db, config.uname, config.pw, {
    host: config.host,
    dialect: config.dialect,
});

const Role = require('./../model/Role')(sequelize);
const User = require('./../model/User')(sequelize);
const UserRole = require('./../model/UserRole')(sequelize);

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


User.belongsToMany(Role, {
    through: UserRole,
    // as: 'roles',
    // foreignKey: 'user_id',
    // foreignKey: 'user_id'
    // otherKey: 'role_id'
});

Role.belongsToMany(User, {
    through: UserRole,
    // as: 'users',
    // foreignKey: 'role_id',
    // foreignKey: 'role_id',
    // otherKey: 'user_id'
});


// sequelize.sync({
//     force: true
// }).then(() => {
//     Role.create({
//         id: 1,
//         name: "USER"
//     });

//     Role.create({
//         id: 2,
//         name: "ADMIN"
//     });

//     Role.create({
//         id: 3,
//         name: "PM"
//     });
// })

module.exports = sequelize;