const supertest = require("supertest");
const app = require("../app");
var key = "";
var id = "";
//Pasar una nueva cuenta con un nuevo id en los parametros del send
describe("Probar el inicio de sesion", () => {
  it("Deberia de obener un login con usuario y contraseña correcto", (done) => {
    supertest(app)
      .post("/login")
      .send({
        email: "a338866@uach.mx",
        password: "123456",
      })
      .expect(200)
      .end(function (err, res) {
        key = res.body.obj;
        done();
      });
  });
});

describe("Probar las rutas de los bookings", () => {
  it("Deberia de crear un booking", (done) => {
    supertest(app)
      .post("/bookings")
      .send({
        copy: "619875454",
        member: "61945645654658",
      })
      .set("Authorization", `Bearer ${key}`)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          id = res.body.objs._id;
          expect(res.statusCode).toEqual(200);
          done();
        }
      });
  });
  it("deberia de obtener la lista de bookings", (done) => {
    supertest(app)
      .get("/bookings")
      .set("Authorization", `Bearer ${key}`)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          expect(res.statusCode).toEqual(200);
          done();
        }
      });
  });
  it("deberia de encontrar un booking", (done) => {
    supertest(app)
      .get(`/bookings/${id}`)
      .set("Authorization", `Bearer ${key}`)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          expect(res.statusCode).toEqual(200);
          done();
        }
      });
  });
  it("deberia de editar un booking", (done) => {
    supertest(app)
      .patch(`/bookings/${id}`)
      .send({
        copy: "619d42e27d7430c",
        member: "619d42e27d7430c",
      })
      .set("Authorization", `Bearer ${key}`)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          expect(res.statusCode).toEqual(200);
          done();
        }
      });
  });
  it("deberia de reemplazar un booking", (done) => {
    supertest(app)
      .put(`/bookings/${id}`)
      .send({
        copy: "619d42e27d7430c",
        member: "619d42e27d7430c",
      })
      .set("Authorization", `Bearer ${key}`)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          expect(res.statusCode).toEqual(200);
          done();
        }
      });
  });
  it("eliminar un booking", (done) => {
    supertest(app)
      .delete(`/bookings/${id}`)
      .set("Authorization", `Bearer ${key}`)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          expect(res.statusCode).toEqual(200);
          done();
        }
      });
  });
});
