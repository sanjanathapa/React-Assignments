const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    minlength: [4, "A name must have more or equal than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    require: [true, "provide password"],
    // select: false,
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// userSchema.pre("save", function (next) {
//   if (this.isModified("password") || this.isNew) {
//     bcrypt.genSalt(15, (err, salt) => {
//       bcrypt.hash(this.password, salt, (err, hash) => {
//         (this.password = hash), (this.saltString = salt);
//         next();
//       });
//     });
//   }
// });

userSchema.pre("save", function (next) {
  console.log("this is this----------------", this);
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(15, (saltError, salt) => {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(this.password, salt, (error, hash) => {
          if (error) {
            return next(error);
          }
          this.password = hash;
          next();
        });
      }
    });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);

// Inside the pre middleware function, the first thing we do is check whether or not our function needs to
//hash a password via the( this.isModified( "password" ) || this.isNew ) code.

// This means that our function needs to hash the password for the document if the "password" value has been
//changed( i.e.user changed their password ) or an entirely new document is being added to the
//database( i.e.a new user has signed up ).Otherwise, the pre function doesn't need to do any hashing.;;
