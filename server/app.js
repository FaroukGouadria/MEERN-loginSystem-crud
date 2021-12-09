const express = require("express");

const app = express();
require("./db/connection");
app.use(express.json());
const User = require("./models/userSchema");

app.use(require("./router/auth"));

//middelware
const middleware = (req, res, next) => {
  console.log("this is a middleware");
  next();
};
app.get("/", (req, res) => {
  res.send(`hello from the server `);
});
app.get("/about", middleware, (req, res) => {
  res.send(`hello from the server `);
});
app.get("/contact", (req, res) => {
  res.send(`hello from the server `);
});
app.get("/login", (req, res) => {
  res.send(`hello from the server `);
});
app.get("/register", (req, res) => {
  res.send(`hello from the server `);
});
const PORT = process.env.PORT;
app.listen(PORT || 4000, () => {
  console.log("server running in Port 3001");
});
