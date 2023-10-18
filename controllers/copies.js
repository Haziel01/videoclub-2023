const express = require("express");
const { Copie, Member } = require("../db");
const copie = require('../models/copie');

function create(req, res, next) {
  const number = req.body.number;
  const format = req.body.format;
  const movieId = req.body.movieId;
  const estatus = req.body.estatus;

  Copie.create({
    number: number,
    format: format,
    movieId: movieId,
    estatus: estatus,
  })
    .then((object) => res.json(object))
    .catch((err) => res.send(err));
}

function list(req, res, next) {
  Copie.findAll()
    .then((objects) => res.json(objects))
    .catch((err) => res.send(err));
}

function index(req, res, next) {
  const id = req.params.id;
  Copie.findByPk(id)
    .then((object) => res.json(object))
    .catch((err) => res.send(err));
}

function replace(req, res, next) {
  const id = req.params.id;
  Copie.findByPk(id)
    .then((object) => {
      const number = req.body.number ? req.body.number : "";
      const format = req.body.format ? req.body.format : BLU-RAY;
      const estatus = req.body.estatus ? req.body.estatus : AVAILABLE;
      object
        .update({ number: number, format: format, estatus: estatus })
        .then((obj) => res.json(obj))
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
}

function update(req, res, next) {
  const id = req.params.id;
  Copie.findByPk(id)
    .then((object) => {
      const number = req.body.number ? req.body.number : object.number;
      const format = req.body.format ? req.body.format : object.format;
      const estatus = req.body.estatus ? req.body.estatus : object.estatus;
      object
        .update({ number: number, format: format, estatus: estatus })
        .then((obj) => res.json(obj))
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
}

function destroy(req, res, next) {
  const id = req.params.id;
  Copie.destroy({ where: { id: id } })
    .then((obj) => res.json(obj))
    .catch((err) => res.send(err));
}

function addMember(req, res, next) {
  const idMember = req.body.idMember;
  const idCopie = req.body.idCopie;

  Member.findByPk(idCopie).then((copie) => {
      Copie.findByPk(idMember).then((member) => {
          copie.addMovie(member);
          res.json(copie);
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
}

module.exports = {
  list,
  index,
  create,
  replace,
  update,
  destroy,
  addMember,
};
