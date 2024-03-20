// const userRegister = require( "../models/registerModel" );

// exports.createRegister = ( req, res ) => {
//     const userRegData = new userRegister( {

//     })
// };
require("../config/passportconfig");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const USERRegister = require("../models/registerModel");

// for registerSchema (create API)
exports.newUserReg = async (req, res) => {
  console.log(req.body, "req.body---------------");

  try {
    const userRegData = await USERRegister.create({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
    });

    return res.status(201).json({
      status: "success",
      message: "New user has been added",
      data: {
        userRegData,
      },
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Error in adding data",
      error: err.message,
    });
  }
};

//to check authentication while login and will generate a token. Basically login

exports.authenticate = ( req, res, next ) => {
  console.log("data-----------------------")
  passport.authenticate("local", (err, user, info) => {
    console.log("auth-----------------------", user, info);
    if (err) return res.status(404).json(err);
    if (user)
      //console.log("--controllerfile ka user", user)
      return res.status(200).json({
        token: jwt.sign({ _id: user._id }, "SecretToken", { expiresIn: "20m" }),
        user: user,
      });
    if (info) return res.status(401).json(info);
  })(req, res, next);
};

//[const users = User.find({ _id: { $ne: user._id } })
exports.allUsersProfile = (req, res, next) => {
  console.log("----abshdbd--", req._id);
  const id = req._id;
  console.log("--idddd---");
  USERRegister.find({ _id: { $ne: id } })
    .then((documents) => {
      console.log("-----ALL DATA----", documents);
      return res.status(200).json({
        success: true,
        message: "user record found",
        data: documents,
      });
    })
    .catch((err) => {
      console.log("-----ERRRIR", err);
      return res.status(401).json({
        sucess: false,
        message: "Error finding records",
        error: err.message,
      });
    });
};
