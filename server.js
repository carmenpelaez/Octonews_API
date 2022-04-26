require("dotenv").config();

const express = require("express");
const app = express();

const createUser = require("./controllers/users/createUser");
const login = require("./controllers/users/login");

// const isUser = require("./middlewares/isUser");

app.use(express.json());

app.post("/users", createUser);
app.post("/users/login", login);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Lanzado en puerto: ${port}`);
});
