const jsonwebtoken = require("jsonwebtoken");

const JWTgenerator = async (id) => {
  let token;
  try {
    // Generate token with user info
    const tokenInfo = {
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
