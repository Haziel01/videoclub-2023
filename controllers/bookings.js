const express = require("express");
const Member = require('../models/member');
const Copy = require('../models/copy');
const Booking = require('../models/booking');

async function create(req, res, next) {
  const date = req.body.date;
  const memberId = req.body.memberId;
  const copyId = req.body.copyId;

  let member = await Member.findOne({"_id": memberId});
  let copy = await Copy.findOne({"_id": copyId});
  let booking = new Booking({
    date: date,
    member: member,
    copy: copy
  });

  booking.save().then(obj => res.status(200).json({
    message: "Booking almacenado correctamente.",
    obj: obj
  })).catch(ex => res.status(500).json({
    message: "No se pudo crear el booking.",
    obj: ex
  }));
}

function list(req, res, next) {
  let page = req.params.page? req.params.page: 1;
  const options = {
    page: page,
    limit: 5
  };
  Booking.paginate({},options).then(objs => res.status(200).json({
    message: "Lista de bookings.",
    obj: objs
  })).catch(ex => res.status(500).json({
    message: "No se pudo obtener la lista de bookings.",
    obj: ex
  }));
}

function index(req, res, next) {
  const id = req.params.id;

  Booking.findOne({ _id: id }).then((obj) => res.status(200).json({
        message: `Booking con el id ${id}`,
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: "No se pudo consultar el booking.",
        obj: ex,
      }));
}

function replace(req, res, next) {
  const id = req.params.id;
  let date = req.body.date ? req.body.date : "";
  let member = req.body.member ? req.body.member : "";
  let copy = req.body.copy ? req.body.copy : "";

  let booking = new Object({
    _date: date,
    _member: member,
    _copy: copy,
  });

  Booking.findOneAndUpdate({ _id: id }, booking, { new: true }).then((obj) => res.status(200).json({
        message: "Booking remplazado correctamente.",
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: "No se pudo rempazar el booking.",
        obj: ex,
      }));
}

function update(req, res, next) {
  const id = req.params.id;
  let date = req.body.date;
  let member = req.body.member;
  let copy = req.body.copy;

  let booking = new Object();
  if (date) booking._date = date;
  if (member) booking._member = member;
  if (copy) booking._copy = copy;

  Booking.findOneAndUpdate({ _id: id }, booking).then((obj) => res.status(200).json({
        message: "Booking actualizado correctamente.",
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: "No se pudo actualizar el booking.",
        obj: ex,
      }));
}

function destroy(req, res, next) {
  const id = req.params.id;
  Booking.findByIdAndRemove({ _id: id }).then((obj) => res.status(200).json({
        message: "Booking eliminado correctamente",
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: "No se pudo eliminar el booking.",
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