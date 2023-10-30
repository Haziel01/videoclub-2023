const express = require("express");
const Member = require("../models/member");

function create(req, res, next) {
  let name = req.body.name;
  let lastName = req.body.lastName;
  let phone = req.body.phone;

  let address = new Object();
  address.street = req.body.street;
  address.number = req.body.number;
  address.zip = req.body.zip;
  address.city = req.body.city;
  address.state = req.body.state;
  address.country = req.body.country;

  let member = new Member({
    name: name,
    lastName: lastName,
    phone: phone,
    address: address
  });

  member
    .save()
    .then((obj) => res.status(200).json({
        message: "Member creado correctamente.",
        obj: obj,
      })
    )
    .catch((ex) => res.status(500).json({
        message: "No se pudo almacenar el miembro.",
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
  Member.paginate({}, options) .then((objs) => res.status(200).json({
        message: "Lista de miembros.",
        obj: objs,
      })).catch((ex) => res.status(500).json({
        message: "No se puede consultar la lista de miembros.",
        obj: ex,
      }));
}

function index(req, res, next) {
  const id = req.params.id;

  Member.findOne({ _id: id })
    .then((obj) =>
      res.status(200).json({
        message: `Miembro con el id ${id}`,
        obj: obj,
      })
    )
    .catch((ex) =>
      res.status(500).json({
        message: "No se pudo consultar el miembro.",
        obj: ex,
      })
    );
}

function replace(req, res, next) {
  const id = req.params.id;
  let name = req.body.name ? req.body.name : "";
  let lastName = req.body.lastName ? req.body.lastName : "";
  let phone = req.body.phone ? req.bod.phone: "";
  let address = req.body.address ? req.body.address: "";

  let member = new Object({
    _name: name,
    _lastName: lastName,
    _phone: phone,
    _address: address
  });

  Member.findOneAndUpdate({ _id: id }, member, { new: true })
    .then((obj) => res.status(200).json({
        message: "Miembro remplazado correctamente",
        obj: obj,
      })
    )
    .catch((ex) => res.status(500).json({
        message: "No se pudo rempazar el miembro.",
        obj: ex,
      })
    );
}

function update(req, res, next) {
  const id = req.params.id;
  let name = req.body.name;
  let lastName = req.body.lastName;
  let phone = req.body.phone;
  let address = req.body.address;

  let member = new Object();
  if (name) member._name = name;
  if (lastName) member._lastName = lastName;
  if (phone) member._phone = phone;
  if (address) member._address = address;

  Member.findOneAndUpdate({ _id: id }, member)
    .then((obj) => res.status(200).json({
        message: "Miembro eliminado correctamente.",
        obj: obj,
      })
    )
    .catch((ex) => res.status(500).json({
        message: "No se pudo rempazar el miembro.",
        obj: ex,
      })
    );
}

function destroy(req, res, next) {
  const id = req.params.id;
  Member.findByIdAndRemove({ _id: id })
    .then((obj) => res.status(200).json({
        message: "Miembro eliminado correctamente.",
        obj: obj,
      })
    ).catch((ex) => res.status(500).json({
        message: "No se pudo eliminar el miembro.",
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
