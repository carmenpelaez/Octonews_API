//VALIDATION JWT
const jwt = require("jsonwebtoken");
const getDB = require("../database/config");
const { generateError } = require("../helpers/generateError");

const isAuth = async (req, res, next) => {
  let connection;

  try {
    const { SECRET } = process.env;
    const { authorization } = req.headers;
    let result;

    if (!authorization) {
      throw generateError("You need an authorization header", 403);
    }
    let tokenInfo;

    try {
      tokenInfo = jwt.verify(authorization, SECRET);
    } catch (error) {
      throw generateError("Token invalid", 403);
    }

    connection = await getDB();
    const { id } = tokenInfo;
    [result] = await connection.query(
      "SELECT id, name, email, biography, avatar, creation_date, last_update_date, authenticated FROM users WHERE id = ?;",
      [id]
    );

    //Check if user exists.
    const [user] = result;
    if (result.length === 0) {
      throw generateError("User doesn't exists", 404);
    }

    //We assign all the values from the query to req.user
    req.user = user;

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  isAuth,
};
