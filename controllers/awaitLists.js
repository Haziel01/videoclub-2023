const express = require("express");
const Member = require("../models/member");
const Movie = require("../models/movie");
const AwaitList = require("../models/awaitList");

async function create(req, res, next) {
  const memberId = req.body.memberId;
  const movieId = req.body.movieId;

  let member = await Member.findOne({ _id: memberId });
  let movie = await Movie.findOne({ _id: movieId });
  let awaitList = new AwaitList({
    member: member,
    movie: movie,
  });

  awaitList.save().then((obj) => res.status(200).json({
        message: "awaitList almacenado correctamente.",
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: "No se pudo crear el awaitList.",
        obj: ex,
      }));
}

function list(req, res, next) {
  let page = req.params.page ? req.params.page : 1;
  const options = {
    page: page,
    limit: 5,
  };
  AwaitList.paginate({}, options).then((objs) => res.status(200).json({
        message: "Lista de espera.",
        obj: objs,
      })).catch((ex) => res.status(500).json({
        message: "No se pudo obtener la lista de espera.",
        obj: ex,
      }));
}

function index(req, res, next) {
  const id = req.params.id;

  AwaitList.findOne({ _id: id }).then((obj) => res.status(200).json({
        message: `awaitList con el id ${id}`,
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: "No se pudo consultar el awaitList.",
        obj: ex,
      }));
}

function replace(req, res, next) {
  const id = req.params.id;
  let member = req.body.member ? req.body.member : "";
  let movie = req.body.movie ? req.body.movie : "";

  let awaitList = new Object({
    _member: member,
    _movie: movie,
  });

  AwaitList.findOneAndUpdate({ _id: id }, awaitList, { new: true })
    .then((obj) => res.status(200).json({
        message: "AwaitList remplazado correctamente.",
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: "No se pudo rempazar el awaitList.",
        obj: ex,
      }));
}

function update(req, res, next) {
  const id = req.params.id;
  let member = req.body.member;
  let movie = req.body.movie;

  let awaitList = new Object();
  if (member) awaitList._member = member;
  if (movie) awaitList._movie = movie;

  AwaitList.findOneAndUpdate({ _id: id }, awaitList)
    .then((obj) => res.status(200).json({
        message: "AwaitList actualizado correctamente.",
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: "No se pudo actualizar el awaitList.",
        obj: ex,
      }));
}

function destroy(req, res, next) {
  const id = req.params.id;

  AwaitList.findByIdAndRemove({ _id: id })
    .then((obj) => res.status(200).json({
        message: "AwaitList eliminado correctamente",
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: "No se pudo eliminar el awaitList.",
        obj: ex,
      }));
}

module.exports = {
  list,
  index,
  create,
  replace,
  update,
  destroy,
};

// npm run dev
