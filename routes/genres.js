const express = require("express");
const router = express.Router();
const controller = require("../controllers/genres");

/* GET users listing. */
router.post("/", controller.create);

router.get("/list/:page?", controller.list);

router.get("/:id", controller.index);

router.put("/:id", controller.replace);

router.patch("/:id", controller.update);

router.delete("/:id", controller.destroy);

module.exports = router;
