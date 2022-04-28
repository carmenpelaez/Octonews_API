const getDB = require("../../database/config");
const { JWTgenerator } = require("../../helpers/JWT-Generator");
const { generateError } = require("../../helpers/generateError");

async function loginUser(req, res, next) {
  let connection;
  try {
    connection = await getDB();
    // check if we have the required data
    //await loginUserSchema.validateAsync(req.body);

    const { email, password } = req.body;
    // Do a query and see if email and password ar correct
    const [dbUser] = await connection.query(
      `
      SELECT id, authenticated
      FROM users
      WHERE email=? AND password=SHA2(?, 512)
    `,
      [email, password]
    );

    if (dbUser.length === 0) {
      throw generateError("Email or password incorrect", 401);
    } else if (!dbUser[0].authenticated) {
      throw generateError(
        "User is registered but not active. Check your email for activation",
        401
      );
    }

    const token = await JWTgenerator(dbUser[0].id);

    // Devolver el token
    res.send({
      status: "ok",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = loginUser;
