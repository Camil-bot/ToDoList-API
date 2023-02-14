const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/todolist");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/auth", require("./routes/auth"));
app.use("/tasks", require("./routes/task"));
app.use("/userInfo", require("./routes/userinfo"));
app.use("/session", require("./routes/session"));
app.listen(5000, (req, res) => {
  console.log("server is up, listening to port 5000");
});
