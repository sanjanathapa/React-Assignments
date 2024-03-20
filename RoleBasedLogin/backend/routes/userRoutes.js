var express = require("express");
var myctrl = require("../controller/userRegisterController");
var myctrl1 = require("../controller/accessController");

var approute = express.Router();
var jwt = require("../config/jwthelper");

approute.post("/userRegCreate", myctrl.newUserReg);
console.log(" routes--------------");
approute.post("/login", myctrl.authenticate);
approute.get("/getAllUsers", jwt.verifyJwtToken, myctrl.allUsersProfile);

module.exports = approute;
