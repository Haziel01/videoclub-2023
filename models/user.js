const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

//schema
const schema = mongoose.Schema({
  _name: String,
  _lastName: String,
  _email: String,
  _password: String
});
//clase
class User {
  constructor(name, lastName, email, password) {
    this._name = name;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
  }

  get name() {
    return this._name;
  }

  set name(v) {
    this._name = v;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(v) {
    this._name = v;
  }

  get email() {
    return this._email;
  }

  set email(v) {
    this._email;
  }

  get password() {
    return this._password;
  }

  set password(v) {
    this._password;
  }
}

schema.loadClass(User);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", schema);
