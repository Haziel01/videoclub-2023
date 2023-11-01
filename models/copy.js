const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const EnumFormat = ['VHS', 'DVD', 'BLU-RAY'];
const EnumStatus = ['AVAILABLE', 'RENTED'];
//schema
const schema = mongoose.Schema({
  _number: Number,
  _movie: {
    type: mongoose.Schema.ObjectId,
    ref: "Movie",
  },
  _formate: {
    type: String,
    enum: EnumFormat,
  },
  _estatus: {
    type: String,
    enum: EnumStatus,
  }
});
//clase
class Copy {
  constructor(number, movie, formate, estatus) {
    this._number = number;
    this._movie = movie;
    this._formate = formate;
    this._estatus = estatus;
  }

  get number() {
    return this._number;
  }

  set number(v) {
    this._number = v;
  }

  get movie() {
    return this._movie;
  }

  set movie(v) {
    this._movie = v;
  }

  get format() {
    return this._format;
  }

  set format(v) {
    this._format = v;
  }

  get estatus() {
    return this._estatus;
  }

  set estatus(v) {
    this._estatus = v;
  }
}

schema.loadClass(Copy);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model("Copy", schema);
