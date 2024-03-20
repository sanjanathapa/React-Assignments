// const express = require("express");

// const app = express();

// app.get("/", (req, res) => {
//   res.send("this is response from 3000 localhost");
// });
// const port = 3000;
// app.listen(port, () => {
//   console.log(`server is running at http://localhost:${port}`);
// });

require("./config/db");
const cors = require("cors");
const express = require("express");
const router = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use("*", cors());
app.use("/", router);

const port = 4000;
app.listen(port, () => {
  console.log("Server is running at http://localhost:" + port);
});
