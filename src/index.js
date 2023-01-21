require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");
const userRoutes = require("./controllers/user.routes");

const connect = require("./config/db");

let port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hey there!!");
});

app.use("/users", userRoutes);

app.listen(port, async () => {
  await connect();
  console.log("server is running on port 8080");
});
