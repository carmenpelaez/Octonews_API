require("dotenv").config();
const fileUpload = require("express-fileupload");
const express = require("express");
const app = express();
const { checkErrors } = require("./middlewares/checkErrors");

const getNews = require("./controllers/news/getNews");
const voteNews = require("./controllers/news/voteNews");

//First middlewares
//bodyparser

app.use(express.json());
//formparser
app.use(fileUpload());

//import routes
app.use(require("./routes/news"));
app.use(require("./routes/users"));

//Last middlewares
//Check if an error ocurred and send a response with the error.
app.use(checkErrors);

//Start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Lanzado en puerto: ${port}`);
});
