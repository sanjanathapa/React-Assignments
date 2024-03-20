const mongoose = require("mongoose");
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connected successully");
  })
  .catch((err) => {
    console.log("Error in connection with db" + err);
  });
