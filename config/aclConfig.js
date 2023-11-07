const mongoose = require("mongoose");
const Acl = require("acl");

// Crea una instancia del acl
const acl = new Acl(
  new Acl.mongodbBackend(mongoose.connection.db, "video-club")
);

// Abre la conexión de MongoDB
mongoose.connection.on("open", () => {
  console.log("Conexión a MongoDB establecida");
  // Puedes omitir la configuración del backend aquí, ya que se hizo al crear la instancia de acl.
});

// Configura roles y permisos
acl.allow([
  {
    roles: "admin",
    allows: [
      { resources: "/directors", permissions: "post" },
      { resources: "/directors/list/:page?", permissions: "get" },
      {
        resources: "/directors/:id",
        permissions: ["get", "put", "patch", "delete"],
      },
    ],
  },
  {
    roles: "user",
    allows: [
      { resources: "/directors", permissions: "post" },
      { resources: "/directors/list/:page?", permissions: "get" },
      { resources: "/directors/:id", permissions: "get" },
    ],
  },
]);


// Otorga roles a usuarios
acl.addUserRoles("admin456", "admin");//Contraseña: 654321
acl.addUserRoles("user123", "user");;//Constraseña: 123456

module.exports = acl;