const supertest = require("supertest");
const app = require("../app");
var key = "";
var id = "";

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

describe("Probar las rutas de las peliculas", () => {
  it("Deberia de crear una pelicula", (done) => {
    supertest(app)
      .post("/movies")
      .send({
        genre: "Terror",
        title: "El Conjuro",
        directorName: "James",
        directorLastName: "Wan",
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
  it("deberia de obtener la lista de peliculas", (done) => {
    supertest(app)
      .get("/movies")
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
  it("deberia de encontrar una pelicula", (done) => {
    supertest(app)
      .get(`/movies/${id}`)
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
  it("deberia de editar una pelicula", (done) => {
    supertest(app)
      .patch(`/movies/${id}`)
      .send({
        genre: "Terror",
        title: "El Conjuro 2",
        directorName: "James",
        directorLastName: "Wan",
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
  it("deberia de reemplazar una pelicula", (done) => {
    supertest(app)
      .put(`/movies/${id}`)
      .send({
        genre: "Terror",
        title: "El Conjuro 3",
        directorName: "James",
        directorLastName: "Wan",
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
  it("eliminar una pelicula", (done) => {
    supertest(app)
      .delete(`/movies/${id}`)
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
