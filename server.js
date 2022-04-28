require("dotenv").config();

const express = require("express");
const app = express();

const createUser = require("./controllers/users/createUser");
const login = require("./controllers/users/login");
// const isUser = require("./middlewares/isUser");
const getNews = require("./controllers/news/getNews");
const voteNews = require("./controllers/news/voteNews");

app.use(express.json());

app.post("/users", createUser);
app.post("/users/login", login);

app.get(
  "/news/",
  getNews
); /* Elimino :date, tengo que hacer esto con queryparams */

/* Aquí debajo inserto el isAuth como middleware, revisar. */
app.post("/news/:id_news/votes", voteNews);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Lanzado en puerto: ${port}`);
});
