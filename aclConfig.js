const {acl} = require("./app");
// Configura roles y permisos
if (acl) {
  acl.allow([
    {
      roles: "user",
      allows: [
        {
          resources: [
            "/directors",
            "/actors",
            "/awaitLists",
            "/bookings",
            "/copyes",
            "/genres",
            "/members",
            "/index",
            "/movies",
            "/permissions",
            "/users",
          ],
          permissions: "post",
        },
        { resources: "/directors/list/:page?", permissions: "get" },
        { resources: "/actors/list/:page?", permissions: "get" },
        { resources: "/awaitLists/list/:page?", permissions: "get" },
        { resources: "/booking/list/:page?", permissions: "get" },
        { resources: "/copyes/list/:page?", permissions: "get" },
        { resources: "/genres/list/:page?", permissions: "get" },
        { resources: "/membres/list/:page?", permissions: "get" },
        { resources: "/index/list/:page?", permissions: "get" },
        { resources: "/movies/list/:page?", permissions: "get" },
        { resources: "/permissions/list/:page?", permissions: "get" },
        { resources: "/users/list/:page?", permissions: "get" },
        { resources: "/directors/:id", permissions: "get" },
        { resources: "/actors/:id", permissions: "get" },
        { resources: "/awaitLists/:id", permissions: "get" },
        { resources: "/booking/:id", permissions: "get" },
        { resources: "/copyes/:id", permissions: "get" },
        { resources: "/genres/:id", permissions: "get" },
        { resources: "/members/:id", permissions: "get" },
        { resources: "/index/:id", permissions: "get" },
        { resources: "/movies/:id", permissions: "get" },
        { resources: "/permissions/:id", permissions: "get" },
        { resources: "/users/:id", permissions: "get" },
      ],
    },
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
  ]);
  // Otorga roles a usuarios
  acl.addUserRoles("admin456", "admin"); //Contraseña: 654321
  acl.addUserRoles("user123", "user"); //Constraseña: 123456
  acl.addUserRoles("B.j", "user"); //0123
} else {
  console.error(
    "La instancia de 'acl' es undefined. Asegúrate de exportarla correctamente en app.js."
  );
}

module.exports = acl;