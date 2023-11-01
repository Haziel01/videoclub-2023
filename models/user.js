const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

//schema
const schema = mongoose.Schema({
  _name: String,
  _lastName: String,
  _email: String,
  _password: String,
  _saltKey: String
});
//clase
class User {
  constructor(name, lastName, email, password, saltKey) {
    this._name = name;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
    this._saltKey = saltKey;
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
    this._email= v;
  }

  get password() {
    return this._password;
  }

  set password(v) {
    this._password = v;
  }

  get saltKey() {
    return this._saltKey;
  }

  set saltKey(v) {
    this._saltKey = v;
  }
}

schema.loadClass(User);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", schema);
