//VALIDATION JWT
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const { SECRET } = process.env;
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(403).send({ msg: "You need an authorization header" });
    }
    let tokenInfo;

    try {
      tokenInfo = await jwt.verify(authorization, SECRET);
    } catch (error) {
      res.status(403).send({ msg: "Token invalid" });
    }

    //TODO: CHECK IF USER EXISTS IN BD AND GIVE req.user all values except password
    const { id } = tokenInfo;
    req.user = id;

    next();
  } catch (error) {
    //TODO: CHANGE THIS TO next(error)
    console.error(error.message);
  }
};

module.exports = {
  isAuth,
};
