const express = require("express");
const Genre = require("../models/genre");

function create(req, res, next) {
  const description = req.body.description;

  let genre = new Genre({
    description: description
  });

  genre.save().then((obj) => res.status(200).json({
        message: res.__("Genre.crate"),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("Genre.nocreate"),
        obj: ex,
      }));
}

function list(req, res, next) {
  let page = req.params.page? req.params.page: 1;
  const options = {
    page: page,
    limit: 5
  };
  Genre.paginate({},options).then((objs) => res.status(200).json({
        message: res.__("Genre.list"),
        obj: objs,
      })).catch((ex) => res.status(500).json({
        message: res.__("Genre.notlist"),
        obj: ex,
      }));
}

function index(req, res, next) {
  const id = req.params.id;

  Genre.findOne({ _id: id }).then((obj) => res.status(200).json({
        message: res.__("Genre.index"),
        obj: obj,
      })).catch((ex) =>
      res.status(500).json({
        message: res.__("Genre.notindex"),
        obj: ex,
      }));
}

function replace(req, res, next) {
  const id = req.params.id;
  let description = req.body.description ? req.body.description : "";

  let genre = new Object({
    _description: description
  });

  Genre.findOneAndUpdate({ _id: id }, genre, { new: true }).then((obj) => res.status(200).json({
        message: res.__("Genre.replace"),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("Genre.notreplace"),
        obj: ex,
      }));
}

function update(req, res, next) {
  const id = req.params.id;
  let description = req.body.description;

  let genre = new Object();
  if (description) genre._description = description;

  Genre.findOneAndUpdate({ _id: id }, genre).then((obj) => res.status(200).json({
        message: res.__("Genre.update"),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("Genre.notupdate"),
        obj: ex,
      }));
}

function destroy(req, res, next) {
  const id = req.params.id;

  Genre.findByIdAndRemove({ _id: id }).then((obj) => res.status(200).json({
        message: res.__("Genre.delete"),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("Genre.notdeleted"),
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
