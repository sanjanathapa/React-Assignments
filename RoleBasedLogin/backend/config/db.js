//to connect with the mongodb we are creating this db.js file

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/rolebasedlogindb")
  .then(() => {
    console.log("Database connected succesfully");
  })
  .catch((err) => {
    console.log("Error in connection with db" + err);
  });
