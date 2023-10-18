const express = require("express");
const router = express.Router();
const controller = require("../controllers/movies");

/* GET users listing. */
router.post("/", controller.create);

router.get("/", controller.list);

router.get("/:id", controller.index);

router.put("/:id", controller.replace);

router.patch("/actors", controller.addActor);

router.patch("/:id", controller.update);

router.delete("/:id", controller.destroy);

module.exports = router;
