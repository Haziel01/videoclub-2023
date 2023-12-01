const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user');

function home(req, res, next){
    res.render('index', {title: 'Express'})
}

function login(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const jwtKey = config.get("secret.key");

  User.findOne({ _email: email })
    .then((user) => {
      if (user) {
        bcrypt.hash(password, user.saltKey, (err, hash) => {
          if (err) {
            // regresar 403
            res.status(403).json({
              message: res.__("login.wrong"),
              obj: err,
            });
          }
          if (hash == user.password) {
            res.status(200).json({
              message: res.__("login.ok"),
              obj: jwt.sign(
                { data: user.data, exp: Math.floor(Date.now() / 1000) + 600 },
                jwtKey
              ),
            });
          } else {
            // regresar 403
            res.status(403).json({
              message: res.__("login.wrong"),
              obj: null,
            });
          }
        });
      } else {
        // regresar 403
        res.status(403).json({
          message: res.__("login.wrong"),
          obj: null,
        });
      }
    })
    .catch((ex) =>
      res.status(403).json({
        // regresar 403
        message: res.__("login.wrong"),
        obj: ex,
      })
    );
}

module.exports = {
    home,
    login
}