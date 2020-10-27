const db = require('./../config/db.config');
const Role = require('./../model/Role')(db);
const UserRole = require('./../model/UserRole')(db);
const {
    Op
} = require('sequelize');

module.exports = (userId, callback) => {

    const userRolesIds = [];
    // get user id
    UserRole.findAll({
            where: {
                user_id: userId
            }
        })
        .then(res => {
            // console.log("======== ", res[0].dataValues);
            if (res.length) {
                res.forEach(role => {
                    console.log("role by one ", role.dataValues.role_id)
                    userRolesIds.push(role.dataValues.role_id);
                })
            } else {
                return callback([]);
            }

            return userRolesIds
        }).then(roles => {
            // roles.forEach(role => {
            Role.findAll({
                where: {
                    id: {
                        [Op.in]: roles
                    }
                }
            }).then(roleFetch => {
                const roleNames = roleFetch.map(role => {
                    return role.dataValues.name;
                });

                return callback(roleNames);
            })

        })
}