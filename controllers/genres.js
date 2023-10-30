const express = require("express");
const Genre = require("../models/genre");

function create(req, res, next) {
  const description = req.body.description;

  let genre = new Genre({
    description: description
  });

  genre.save().then((obj) => res.status(200).json({
        message: "Genero creado correctamente.",
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: "No se pudo almacenar el genero.",
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
        message: "Lista de generos",
        obj: objs,
      })).catch((ex) => res.status(500).json({
        message: "No se pudo obtener la lista de generos",
        obj: ex,
      }));
}

function index(req, res, next) {
  const id = req.params.id;

  Genre.findOne({ _id: id }).then((obj) => res.status(200).json({
        message: `Genero con el id ${id}`,
        obj: obj,
      })).catch((ex) =>
      res.status(500).json({
        message: "No se pudo consultar el genero.",
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
        message: "Genero remplazado correctamente",
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: "No se pudo rempazar el genero.",
        obj: ex,
      }));
}

function update(req, res, next) {
  const id = req.params.id;
  let description = req.body.description;

  let genre = new Object();
  if (description) genre._description = description;

  Genre.findOneAndUpdate({ _id: id }, genre).then((obj) => res.status(200).json({
        message: "Genero actualizado correctamente.",
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: "No se pudo actualizar el genero.",
        obj: ex,
      }));
}

function destroy(req, res, next) {
  const id = req.params.id;

  Genre.findByIdAndRemove({ _id: id }).then((obj) => res.status(200).json({
        message: "Genero eliminado correctamente.",
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: "No se pudo eliminar el genero.",
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
