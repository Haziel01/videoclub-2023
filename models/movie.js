const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const schema = mongoose.Schema({
  _title: String,
  _director: {
    type: mongoose.Schema.ObjectId,
    ref: "Director",
  },
  _genre: {
    type: mongoose.Schema.ObjectId,
    ref: "Genre",
  },
});

class Movie {
  constructor(title, director, genre) {
    this._title = title;
    this._director = director;
    this._genre = genre;
  }

  get title() {
    return this._title;
  }

  set title(v) {
    this._title = v;
  }

  get director() {
    return this._director;
  }

  set director(v) {
    this._director = v;
  }

  get genre() {
    return this._genre;
  }

  set genre(v) {
    this._genre = v;
  }
}

schema.loadClass(Movie);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Movie', schema);
