const express = require("express");
const Movie = require('../models/movie');
const Copy = require("../models/copy");

async function create(req, res, next) {
  const number = req.body.number;
  const movieId = req.body.movieId;
  const formate = req.body.formate;
  const estatus = req.body.estatus;

  let movie = await Movie.findOne({"_id": movieId});
  let copy = new Copy({
    number: number,
    movie: movie,
    formate: formate,
    estatus: estatus,
  });

  copy.save().then((obj) => res.status(200).json({
        message: res.__("Copy.created"),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("Copy.notcreated"),
        obj: ex,
      }));
}

function list(req, res, next) {
  let page = req.params.page? req.params.page: 1;
  const options = {
    page: page,
    limit: 5
  };
  Copy.paginate({},options).then((objs) => res.status(200).json({
        message: res.__("Copy.list"),
        obj: objs,
      })).catch((ex) => res.status(500).json({
        message: res.__("Copy.notlist"),
        obj: ex,
      }));
}

function index(req, res, next) {
  const id = req.params.id;

  Copy.findOne({ _id: id }).then((obj) => res.status(200).json({
        message: res.__("Copy.index"),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("Copy.notindex"),
        obj: ex,
      }));
}

function replace(req, res, next) {
  const id = req.params.id;
  let number = req.body.number ? req.body.number : "";
  let movie = req.body.movie ? req.body.movie : "";
  let formate = req.body.formate ? req.body.formate : "";
  let estatus = req.body.estatus ? req.body.estatus : "";

  let copy = new Object({
    _number: number,
    _movie: movie,
    _formate: formate,
    _estatus: estatus,
  });

  Copy.findOneAndUpdate({ _id: id }, copy, { new: true }).then((obj) => res.status(200).json({
        message: res.__("Copy.replaced"),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("Copy.notreplaced"),
        obj: ex,
      }));
}

function update(req, res, next) {
  const id = req.params.id;
  let number = req.body.number;
  let movie = req.body.movie;
  let formate = req.body.formate;
  let estatus = req.body.estatus;

  let copy = new Object();
  if (number) copy._number = number;
  if (movie) copy._movie = movie;
  if (formate) copy._formate = formate;
  if (estatus) copy._estatus = estatus;

  Copy.findOneAndUpdate({ _id: id }, copy).then((obj) => res.status(200).json({
        message: res.__("Copy.updated"),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("Copy.notupdated"),
        obj: ex,
      }));
}

function destroy(req, res, next) {
  const id = req.params.id;

  Copy.findByIdAndRemove({ _id: id }).then((obj) => res.status(200).json({
        message: res.__("Copy.deleted"),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("Copy.notdeleted"),
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
