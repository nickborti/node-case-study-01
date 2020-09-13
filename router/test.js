const express = require('express');

const db = require('./../config/db.config');
const User = require('./../model/User')(db);
const Role = require('./../model/Role')(db);
const UserRole = require('./../model/UserRole')(db);
const {
    Op
} = require('sequelize');
const router = express.Router();
const verifyJwt = require('./../utils/verifyJwt');

const getUserRoleDetails = require('./../utils/getRoleDetails');
const isAuthorized = require('../utils/isAuthorized');

router.get('/user', verifyJwt, (req, res) => {

    User.findOne({
        where: {
            id: req.userId
        },
    }).then(user => {

        getUserRoleDetails(req.userId, (result) => {
            const userObj = {
                name: user.name,
                username: user.username,
                email: user.email,
                roles: result
            }

            res.status(200).json({
                description: 'User contents',
                user: userObj
            });
        });

    })
});

router.get('/admin', verifyJwt, (req, res) => {
    isAuthorized(req.userId, 'ADMIN', (result) => {
        if (!result.length) {
            return res.status(403).json({
                auth: false,
                message: 'Unauthorized access'
            })
        }

        User.findOne({
            where: {
                id: req.userId
            },
        }).then(user => {

            getUserRoleDetails(req.userId, (result) => {
                const userObj = {
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    roles: result
                }

                res.status(200).json({
                    description: 'Admin Panel',
                    user: userObj
                });
            });

        })
    })
});

router.get('/pm', verifyJwt, (req, res) => {
    isAuthorized(req.userId, 'PM', (result) => {
        if (!result.length) {
            return res.status(403).json({
                auth: false,
                message: 'Unauthorized access'
            })
        }

        User.findOne({
            where: {
                id: req.userId
            },
        }).then(user => {

            getUserRoleDetails(req.userId, (result) => {
                const userObj = {
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    roles: result
                }

                res.status(200).json({
                    description: 'Project Management Board',
                    user: userObj
                });
            });

        })
    })
});

module.exports = router;