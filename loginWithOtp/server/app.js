require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./config/db");
const usersRoute = require("./routes/userSchemaRoute");

//middleware
app.use(express.json());
app.use("*", cors());

app.use("/api/v1", usersRoute);
const port = 4005;
app.listen(port, () => {
  console.log(`Server is running at http://localhost: ${port}`);
});
