const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router.post("/sign-up", userController.postSignup);

router.post("/login", userController.postLogin);

module.exports = router;
