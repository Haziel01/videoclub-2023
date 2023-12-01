const express = require("express");
const bcrypt = require('bcrypt');
const Permission = require('../models/permission');
const User = require("../models/user");

async function create(req, res, next) {
  let name = req.body.name;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;
  let saltKey = await bcrypt.genSalt(10);
  let permissionId = req.body.permissionId; 

  const passwordHash = await bcrypt.hash(password, saltKey);
  let permission = await Permission.findOne({ _id: permissionId });

  let user = new User({
    name: name,
    lastName: lastName,
    email: email,
    password: passwordHash,
    saltKey: saltKey,
    permission: permission
  });

  user.save().then((obj) => res.status(200).json({
        message: res.__("user.create"),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("user.notcreate"),
        obj: ex,
      }));
}

function list(req, res, next) {
  let page = req.params.page? req.params.page: 1;
  const options = {
    page: page,
    limit: 5
  };
  User.paginate({}, options)
    .then((objs) =>
      res.status(200).json({
        message: res.__("user.create"),
        obj: objs,
      })
    )
    .catch((ex) =>
      res.status(500).json({
        message: res.__("user.notcreate"),
        obj: ex,
      })
    );
}

function index(req, res, next) {
  const id = req.params.id;

  User.findOne({ _id: id })
    .then((obj) =>
      res.status(200).json({
        message: res.__("user.create"),
        obj: obj,
      })
    )
    .catch((ex) =>
      res.status(500).json({
        message: res.__("user.notcreate"),
        obj: ex,
      })
    );
}

function replace(req, res, next) {
  const id = req.params.id;
  let name = req.body.name ? req.body.name : "";
  let lastName = req.body.lastName ? req.body.lastName : "";
  let email = req.body.email ? req.body.email : "";
  let password = req.body.password ? req.body.password : "";
  let permission = req.body.permission ? req.body.permission: "";

  let user = new Object({
    _name: name,
    _lastName: lastName,
    _email: email,
    _password: password,
    _permission: permission
  });

  User.findOneAndUpdate({ _id: id }, user, { new: true })
    .then((obj) =>
      res.status(200).json({
        message: res.__("user.create"),
        obj: obj,
      })
    )
    .catch((ex) =>
      res.status(500).json({
        message: res.__("user.notcreate"),
        obj: ex,
      })
    );
}

function update(req, res, next) {
  const id = req.params.id;
  let name = req.body.name;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;
  let permission = req.body.permission;

  let user = new Object();
  if (name) user._name = name;
  if (lastName) user._lastName = lastName;
  if (email) user._email = email;
  if (password) user._password = password;
  if (permission) user.permission = permission;

  User.findOneAndUpdate({ _id: id }, user)
    .then((obj) =>
      res.status(200).json({
        message: res.__("user.update"),
        obj: obj,
      })
    )
    .catch((ex) =>
      res.status(500).json({
        message: res.__("user.notupdate"),
        obj: ex,
      })
    );
}

function destroy(req, res, next) {
  const id = req.params.id;
  User.findByIdAndRemove({ _id: id })
    .then((obj) =>
      res.status(200).json({
        message: res.__("user.delete"),
        obj: obj,
      })
    )
    .catch((ex) =>
      res.status(500).json({
        message: res.__("user.notdeleted"),
        obj: ex,
      })
    );
}

module.exports = {
  list,
  index,
  create,
  replace,
  update,
  destroy,
};


// docker exec -ti name_base mongosh
// use name_base;
// db.users.