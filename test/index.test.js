const supertest = require("supertest");

const app = require("../app");

describe("Probar el sistema de autenticacion", () => {
  it("deberia de obtener un login con un user y password correctos", (done) => {
    supertest(app)
      .post("/login")
      .send({ email: "corrreo bueno", password: "contraseña buena" })
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("No deberia de obtener un login con user y password incorrectos", (done) => {
    supertest(app)
      .post("/login")
      .send({ email: "123456@gmail.com", password: "9876543210" })
      .expect(403)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});
