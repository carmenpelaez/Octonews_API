//VALIDACION JWT
const { get } = require("express/lib/response");
const jwt = require("jsonwebtoken");
const getDB = require("../database/config");

async function isAuth(req, res, next) {
  let connection;

  try {
    connection = await getDB();

    const { SECRET } = process.env;
    const { authorization } = req.headers;
    console.log("paso por el JWT VALIDATE");

    if (!authorization) {
      res.status(403).send({ msg: "Se requiere una cabecera de autorización" });
    }
    let tokenInfo;

    try {
      tokenInfo = jwt.verify(authorization, SECRET);
    } catch (error) {
      res.status(403).send({ msg: "El token no es válido" });
    }

    const { id } = tokenInfo;
    req.user = id;

    next();
  } catch (error) {
    console.error(error.message);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  isAuth,
};
