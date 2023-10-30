const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

//schema
const schema = mongoose.Schema({
  _description: String,
});
//clase
class Genre {
  constructor(description) {
    this._description = description;
  }

  get description() {
    return this._description;
  }

  set description(v) {
    this._description = v;
  }
}

schema.loadClass(Genre);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model("Genre", schema);
