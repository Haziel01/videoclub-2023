const supertest = require("supertest");
const app = require("../app");
var key = "";

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

describe("Probar las rutas de usuarios", () => {
  it("Deberia de crear un usuario", (done) => {
    supertest(app)
      .post("/users")
      .send({
        name: "Aldo",
        lastName: "Martinez",
        email: "aldo@uach.mx",
        password: "654321",
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
  it("Deberia de obtener la lista usuarios", (done) => {
    supertest(app)
      .get("/users")
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
  it("Deberia de encontrar un usuario", (done) => {
    supertest(app)
      .get(`/users/show/${id}`)
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
  it("Deberia de editar un usuario", (done) => {
    supertest(app)
      .patch(`/users/${id}`)
      .send({
        name: "Aldo",
        lastName: "Meza",
        email: "aldo@uach.mx",
        password: "654321",
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
  it("deberia de reemplazar un usuario", (done) => {
    supertest(app)
      .put(`/users/${id}`)
      .send({
        name: "Manuel",
        lastName: "Rodriguez",
        email: "mrodriguez@uach.mx",
        password: "987654",
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
  it("eliminar un usuario", (done) => {
    supertest(app)
      .delete(`/users/${id}`)
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
