const express = require("express");
const router = express.Router();
const middleware = require('../middleware')

const loginUserController = require('../contoller/loginuser.controller')
const registerUserController = require('../contoller/registeruser.controller')
const myProfileUserController = require('../contoller/myprofile.controller')


//Api to the Login Users
router.post("/login", loginUserController.post);

//Api to the Register Users
router.post("/register", registerUserController.post);

//Api to the MyProfile
router.get("/home", middleware, myProfileUserController.get);

module.exports = router;