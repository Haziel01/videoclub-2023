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
        message: res.__("Member.create"),
        obj: obj,
      })
    )
    .catch((ex) => res.status(500).json({
        message: res.__("Member.notcreate"),
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
        message: res.__("Member.list"),
        obj: objs,
      })).catch((ex) => res.status(500).json({
        message: res.__("Member.notlist"),
        obj: ex,
      }));
}

function index(req, res, next) {
  const id = req.params.id;

  Member.findOne({ _id: id })
    .then((obj) =>
      res.status(200).json({
        message: res.__("Member.index"),
        obj: obj,
      })
    )
    .catch((ex) =>
      res.status(500).json({
        message: res.__("Member.notindex"),
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
        message: res.__("Member.replaced"),
        obj: obj,
      })
    )
    .catch((ex) => res.status(500).json({
        message: res.__("Member.notreplaced"),
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
        message: res.__("Member.update"),
        obj: obj,
      })
    )
    .catch((ex) => res.status(500).json({
        message: res.__("Member.notupdate"),
        obj: ex,
      })
    );
}

function destroy(req, res, next) {
  const id = req.params.id;
  Member.findByIdAndRemove({ _id: id })
    .then((obj) => res.status(200).json({
        message: res.__("Member.delete"),
        obj: obj,
      })
    ).catch((ex) => res.status(500).json({
        message: res.__("Member.notdeleted"),
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
