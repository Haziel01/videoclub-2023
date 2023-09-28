const express = require("express");

function list(req, res, next) {
  res.send("Users list");
}

function create(req, res, next) {
  res.send("Users create");
}

function replace(req, res, next) {
  res.send("Users replace");
}

function index(req, res, next) {
  res.send("Users index");
}

function update(req, res, next) {
  res.send("Users update");
}

function destroy(req, res, next) {
  res.send("Users destroy");
}

module.exports = {
  list,
  index,
  create,
  replace,
  update,
  destroy,
};
