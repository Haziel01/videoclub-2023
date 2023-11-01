const express = require('express');
const controller = require('../controllers/index');
const router = express.Router();

/* GET home page. */
router.get('/', controller.home);

router.get("/login", controller.login);

module.exports = router;
