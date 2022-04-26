//VALIDACION JWT
const jwt = require("jsonwebtoken");
const getDB = require("../database/config");

const isAuth = async (req, res, next) => {
  try {
    const { SECRET } = process.env;
    const { authorization } = req.headers;
    console.log("paso por el JWT VALIDATE");

    if (!authorization) {
      res.status(403).send({ msg: "Se requiere una cabecera de autorización" });
    }
    let tokenInfo;

    try {
      tokenInfo = await jwt.verify(authorization, SECRET);
    } catch (error) {
      res.status(403).send({ msg: "El token no es válido" });
    }

    const { id } = tokenInfo;
    req.user = id;

    next();
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  isAuth,
};
