const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");
const { checkUserPermissions } = require("../middleware/checkPermissions");

router.post("/", checkUserPermissions, controller.create);
router.get("/list/:page?", controller.list);
router.get("/:id", controller.index);
router.put("/:id", checkUserPermissions, controller.replace);
router.patch("/:id", checkUserPermissions, controller.update);
router.delete("/:id", checkUserPermissions, controller.destroy);

module.exports = router;
