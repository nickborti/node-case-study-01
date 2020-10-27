const express = require('express');

const db = require('./../config/db.config');
const User = require('./../model/User')(db);
const Role = require('./../model/Role')(db);
const UserRole = require('./../model/UserRole')(db);
const {
  Op
} = require('sequelize');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('./../config/env');

const getUserRoles = require('./../utils/getRoles');

router.route('/test').get((req, res) => {
  res.json({
    success: true
  });
});

router.route('/signin').post((req, res) => {
  const {
    username,
    password
  } = req.body;

  // Check if user is available
  User.findOne({
    where: {
      username
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send('User Not Found.');
    }

    // Compare user password with db password
    const validatePass = bcrypt.compareSync(password, user.password);

    if (!validatePass) {
      return res.status(401).send({
        message: "wrong password"
      });
    }

    const token = jwt.sign({
      id: user.id
    }, config.tokensecret, {
      expiresIn: 86400
    });

    getUserRoles(user.id, (authorities) => {
      res.status(200).send({
        auth: true,
        accessToken: token,
        username,
        authorities
      });
    });

  }).catch(err => {
    res.status(500).send('Error -> ' + err);
  });
})

router.route('/signup').post((req, res) => {
  const {
    name,
    username,
    email,
    password
  } = req.body;

  // Check if username exists
  User.findOne({
    where: {
      username
    }
  }).then(user => {
    if (user) {
      res.status(400).send("Username in use");
      return;
    }
  });

  // Check if email exists
  User.findOne({
    where: {
      email
    }
  }).then(user => {
    if (user) {
      res.status(400).send("Email in use");
      return;
    }
  });


  User.create({
      name,
      username,
      email,
      password: bcrypt.hashSync(password, 8),
    })
    .then((user) => {

      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      }).then(roles => {
        // console.log("roles: ", roles);

        roles.map(role => {
          const ur = {
            user_id: parseInt(user.dataValues.id),
            role_id: parseInt(role.dataValues.id),
          }

          console.log("user URR :: ", ur)

          UserRole.create(ur).then(() => {
            console.log('inserted');
          })

          // UserRole.create(ur, { w: 1 }, { returning: true });
        })

        res.send("User registered successfully!");
      })

    })
    .catch((err) => {
      res.status(500).send({
        reason: err.message
      });
    });
});

module.exports = router;