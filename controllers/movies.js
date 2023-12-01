const express = require("express");
const Director = require('../models/director');
const Genre = require('../models/genre');
const Movie = require('../models/movie');

async function create(req, res, next) {
  const title = req.body.title;
  const directorId = req.body.directorId;
  const genreId = req.body.genreId;

  let director = await Director.findOne({"_id": directorId});
  let genre = await Genre.findOne({"_id": genreId});
  let movie = new Movie({
    title: title,
    director: director,
    genre: genre
  });

  movie.save().then(obj => res.status(200).json({
    message: res.__("Movie.create"),
    obj: obj
  })).catch(ex => res.status(500).json({
    message: res.__("Movie.notcreate"),
    obj: ex
  }));
}

function list(req, res, next) {
  let page = req.params.page? req.params.page: 1;
  const options = {
    page: page,
    limit: 5
  };
  Movie.paginate({},options).populate("_director").then(objs => res.status(200).json({
    message: res.__("Movie.list"),
    obj: objs
  })).catch(ex => res.status(500).json({
    message: res.__("Movie.notlist"),
    obj: ex
  }));
}

function index(req, res, next) {
  const id = req.params.id;

  Movie.findOne({ _id: id }).then((obj) => res.status(200).json({
        message: res.__("Movie.index"),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("Movie.noindex"),
        obj: ex,
      }));
}

function replace(req, res, next) {
  const id = req.params.id;
  let title = req.body.title ? req.body.title : "";
  let director = req.body.director ? req.body.director : "";
  let genre = req.body.genre ? req.body.genre : "";

  let movie = new Object({
    _title: title,
    _director: director,
    _genre: genre,
  });

  Movie.findOneAndUpdate({ _id: id }, movie, { new: true }).then((obj) => res.status(200).json({
        message: res.__("Movie.replace"),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("Movie.notreplace"),
        obj: ex,
      }));
}

function update(req, res, next) {
  const id = req.params.id;
  let title = req.body.title;
  let director = req.body.director;
  let genre = req.body.genre;

  let movie = new Object();
  if (title) movie._name = title;
  if (director) movie._director = director;
  if (genre) movie._genre = genre;

  Movie.findOneAndUpdate({ _id: id }, movie).then((obj) => res.status(200).json({
        message: res.__("Movie.update"),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("Movie.notupdate"),
        obj: ex,
      }));
}

function destroy(req, res, next) {
  const id = req.params.id;
  Movie.findByIdAndRemove({ _id: id }).then((obj) => res.status(200).json({
        message: res.__("Movie.delete"),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("Movie.notdelete"),
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
