const express = require("express");
const router = express.Router();
const controller = require("../controllers/directors");
const acl = require("../config/aclConfig");

// Middleware para verificar permisos en la ruta /directors/:id
router.use("/directors/:id", (req, res, next) => {
  if (req.user && req.user.role) {
    const userRole = req.user.role;
    const resource = req.path;
    const permission = req.method.toLowerCase();

    console.log(`User role: ${userRole}`);
    console.log(`Requested resource: ${resource}`);
    console.log(`Requested permission: ${permission}`);

    acl.isAllowed(userRole, resource, permission, (err, allowed) => {
      if (err) {
        return res.status(500).json({ error: "Error al verificar permisos" });
      }
      if (allowed) {
        next(); // El usuario tiene permiso
      } else {
        res.status(403).json({ error: "Acceso no permitido" });
      }
    });
  } else {
    res.status(403).json({ error: "Usuario no autenticado o sin rol" });
  }
});

router.post("/", controller.create);
router.get("/list/:page?", controller.list);

// Protege rutas individuales en función del rol del usuario.
router.get("/:id", controller.index);
router.put("/:id", controller.replace);
router.patch("/:id", controller.update);
router.delete("/:id", controller.destroy);

module.exports = router;
