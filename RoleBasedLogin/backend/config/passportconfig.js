// const mongoose =  require("mongoose");

// var passport = require('passport');
// var localpassport = require('passport-local').Strategy;

// require("../models/registerModel");
// var userregisterModel = mongoose.model('User');

// passport.use(new localpassport({usernameField:'email'},
// (email,password,done)=>{
//     console.log("---PAssport---username and password", email, "and",password)
//     userregisterModel.findOne({email:email},
//         (err,email)=>{
//             console.log("------USER*************----", email)
//             if(err)
//             return done(err);
//             else if(!user)
//             return done(null,false,{message:'email is not registered'})
//             else if(!user.verifyPassword(password))
//             return done(null,false,{message:'Password does not match',
//             result:user.verifyPassword(password)});
//             else
//             return done(null,user);
//         })
// }))

const passport = require("passport");
const localpassport = require("passport-local").Strategy;

const User = require("../models/registerModel");

passport.use(
  new localpassport({ usernameField: "email" }, async (email, password, done) => {
    console.log("---Passport---username and password", email, "and", password);
    
    try {
      const user = await User.findOne({ email: email });

      console.log("User------------------:", user);

      if (!user) {
        return done(null, false, { message: "Email is not registered" });
      }

      if (!user.verifyPassword(password)) {
        return done(null, false, { message: "Password does not match" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport