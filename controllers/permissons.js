const express = require("express");
const Permission = require("../models/permission");

async function create(req, res, next) {
  const description = req.body.description;
  const type = req.body.type;

  let permission = new Permission({
    description: description,
    type: type
  });

  permission.save().then((obj) => res.status(200).json({
        message: "Permiso almacenado correctamente",
        obj: obj,
      })
    )
    .catch((ex) => res.status(500).json({
        message: "No se pudo crear el permiso",
        obj: ex,
      })
    );
}

function list(req, res, next) {
  let page = req.params.page ? req.params.page : 1;
  const options = {
    page: page,
    limit: 5,
  };
  Permission.paginate({}, options).then((objs) => res.status(200).json({
        message: "Lista de permisos",
        obj: objs,
      })
    )
    .catch((ex) => res.status(500).json({
        message: "No se pudo obtener la lista de permisos",
        obj: ex,
      })
    );
}

function index(req, res, next) {
  const id = req.params.id;

  Permission.findOne({ _id: id }).then((obj) => res.status(200).json({
        message: `Permiso con el id ${id}`,
        obj: obj,
      })
    )
    .catch((ex) => res.status(500).json({
        message: "No se pudo consultar el permiso.",
        obj: ex,
      })
    );
}

function replace(req, res, next) {
  const id = req.params.id;
  let description = req.body.description ? req.body.description : "";
  let type = req.body.type ? req.body.type : "";

  let permission = new Object({
    _description: description,
    _type: type
  });

  Permission.findOneAndUpdate({ _id: id }, permission, { new: true })
    .then((obj) => res.status(200).json({
        message: "Permiso remplazado correctamente",
        obj: obj,
      })
    )
    .catch((ex) =>
      res.status(500).json({
        message: "No se pudo rempazar el permiso.",
        obj: ex,
      })
    );
}

function update(req, res, next) {
  const id = req.params.id;
  let description = req.body.description;
  let type = req.body.type;

  let permission = new Object();
  if (description) permission._description = description;
  if (type) permission._type = type;

  Permission.findOneAndUpdate({ _id: id }, permission)
    .then((obj) => res.status(200).json({
        message: "Permiso actualizado correctamente.",
        obj: obj,
      })
    )
    .catch((ex) =>
      res.status(500).json({
        message: "No se pudo actualizar el permiso.",
        obj: ex,
      })
    );
}

function destroy(req, res, next) {
  const id = req.params.id;
  Permission.findByIdAndRemove({ _id: id })
    .then((obj) =>
      res.status(200).json({
        message: "Permiso eliminado correctamente",
        obj: obj,
      })
    )
    .catch((ex) =>
      res.status(500).json({
        message: "No se pudo eliminar el permiso.",
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

// npm run dev
