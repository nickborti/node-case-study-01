const Sequelize = require('sequelize');

module.exports = sequelize => {
    return sequelize.define('user_role', {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: Sequelize.INTEGER(11),
        role_id: Sequelize.INTEGER(11),
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    })
}