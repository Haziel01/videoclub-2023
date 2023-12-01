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
        message: res.__("Awaitlist.created"),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("Awaitlist.notcreated"),
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
        message: res.__("Awaitlist.list"),
        obj: objs,
      })).catch((ex) => res.status(500).json({
        message: res.__("Awaitlist.not"),
        obj: ex,
      }));
}

function index(req, res, next) {
  const id = req.params.id;

  AwaitList.findOne({ _id: id }).then((obj) => res.status(200).json({
        message: res.__('Awaitlist.index'),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("Awaitlist.noindex"),
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
        message: res.__("Awaitlist.replaced"),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("Awaitlist.notreplaced"),
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
        message: res.__("Awaitlist.updated"),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("Awaitlist.notupdated"),
        obj: ex,
      }));
}

function destroy(req, res, next) {
  const id = req.params.id;

  AwaitList.findByIdAndRemove({ _id: id })
    .then((obj) => res.status(200).json({
        message: res.__("Awaitlist.destroy"),
        obj: obj,
      })).catch((ex) => res.status(500).json({
        message: res.__("Awaitlist.notdestroy"),
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
