function checkUserPermissions(req, res, next) {
  try {
    // Obtener el usuario actual desde la autenticación (por ejemplo, mediante un token)
    const { user } = req;

    if (user && user.roles) {
      const { roles } = user;

      // Verificar si el usuario es "admin" o "user"
      if (roles.includes("admin")) {
        // El usuario es administrador, tiene todos los permisos
        return next();
      } else if (roles.includes("user")) {
        // El usuario es un usuario regular
        // Verificar los permisos según el método HTTP
        const method = req.method;
        if (["GET", "POST", "PATCH", "DELETE"].includes(method)) {
          // El usuario regular tiene permiso para GET, POST, PATCH y DELETE
          return next();
        } else {
          return res
            .status(403)
            .json({ message: "Acceso no permitido. Método HTTP no válido." });
        }
      } else {
        // El usuario no tiene roles válidos
        return res
          .status(403)
          .json({ message: "Acceso no permitido. Rol no válido." });
      }
    } else {
      return res
        .status(403)
        .json({ message: "Acceso no permitido. Usuario no válido." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
}

module.exports = {
  checkUserPermissions,
};
