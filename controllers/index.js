const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function home(req, res, next){
    res.render('index', {title: 'Express'})
}

function login(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const jwtKey = "6968b4c8e4312a684fbfb34761c8a00a";

  User.findOne({"_email": email}).then(user => {
    if(user){
      bcrypt.hash(password, user.saltKey, (err, hash)=>{
          if(err){
            // regresar 403
            res.status(403).json({
                message: "Usuario o contraseña incorrecto",
                obj: err
            });
          }
          if(hash == user.password){
              res.status(200).json({
                message: "Login ok",
                obj: jwt.sign({data: user.data, exp: Math.floor(Date.now()/1000)+600}, jwtKey)
              });
          }else{
            // regresar 403
            res.status(403).json({
              message: "Usuario o contraseña incorrecto",
              obj: null,
            });
          }
      });
    }else{
      // regresar 403
      res.status(403).json({
        message: "Usuario o contraseña incorrecto",
        obj: null
      });
    }}).catch(ex => res.status(403).json({
          // regresar 403
          message: "Usuario o contraseña incorrecto",
          obj: ex
    }));
}

module.exports = {
    home,
    login
}