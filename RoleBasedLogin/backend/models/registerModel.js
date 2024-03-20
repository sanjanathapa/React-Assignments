const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    requred: [true, "Please enter your name"],
    maxlength: [40, "A name must have less or equal than 20 characters"],
    minlength: [4, "A name must have more or equal than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide youe email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "password should not left empty"],
    minlength: [4, "Password should be greater than 4"],
  },
  saltString: { type: String },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

//now method for encrypting the password
registerSchema.pre("save", function (next) {
  bcrypt.genSalt(15, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      (this.password = hash), (this.saltString = salt);
      next();
    });
  });
});
//to decrypt the password
registerSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const User = mongoose.model("User", registerSchema);
module.exports = User;
