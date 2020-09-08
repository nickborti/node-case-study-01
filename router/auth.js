const express = require('express');

const db = require('./../config/db.config');
const User = require('./../model/User')(db);
const Role = require('./../model/Role')(db);
const { Op } = require("sequelize");
const router = express.Router();

router.
    route('/test')
    .get((req, res) => {
        res.json({ success: true });
    });

router.
    route('/signup')
    .post((req, res) => {
        const { name, username, email, password } = req.body;
        User.create({
            name, username, email, password
        }).then(user => {
                user.setRoles(req.body.roles).then(() => {
                res.send({ message: 'Registered successfully!' });
            });
        }).catch(err => {
            res.status(500).send({ reason: err.message });
        });
          
    })

module.exports = router;