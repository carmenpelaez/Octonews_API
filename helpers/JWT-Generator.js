const jsonwebtoken = require("jsonwebtoken");

const JWTgenerator = async (id) => {
  let tokenInfo;
  try {
    // Generar token con información del usuario
    const token = {
      id,
    };

    token = await jsonwebtoken.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "30d",
    });
  } catch (error) {}
  return token;
};

module.exports = {
  JWTgenerator,
};
