const db = require('./../config/db.config');
const Role = require('./../model/Role')(db);
const UserRole = require('./../model/UserRole')(db);
const {
    Op
} = require('sequelize');

module.exports = (userId, callback) => {

    const rolesAssc = [];
    const userRolesIds = [];
    // get user id
    UserRole.findAll({
            where: {
                user_id: userId
            }
        })
        .then(res => {

            if (res.length) {
                res.forEach(role => {
                    const roleObj = {
                        userId: role.dataValues.user_id,
                        roleId: role.dataValues.role_id
                    };

                    userRolesIds.push(role.dataValues.role_id);
                    rolesAssc.push(roleObj)
                })
            } else {
                return callback([]);
            }

            return userRolesIds;
        }).then(userRolesIds => {
            console.log("role association :: ", rolesAssc);
            Role.findAll({
                where: {
                    id: {
                        [Op.in]: userRolesIds
                    }
                }
            }).then(roleFetch => {
                console.log("role names :: ", roleFetch);
                const roleNames = roleFetch.map(role => {
                    return {
                        id: role.dataValues.id,
                        name: role.dataValues.name,
                        user_roles: rolesAssc.filter(eachRole => eachRole.roleId === role.dataValues.id)
                    };
                });

                console.log("ROLENAMES :::: ", roleNames);
                return callback(roleNames);

            })
        })
}