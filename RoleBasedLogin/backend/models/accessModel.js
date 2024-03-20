const mongoose = require("mongoose");

const accessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Access = mongoose.model("Access", accessSchema);
module.exports = Access;
