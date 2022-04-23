const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

/* RUTAS */
const routes = require("./routes/index.routes");
app.use(routes);

app.listen(3000, () => {
  console.log("Lanzado en puerto: " + 3000);
});
