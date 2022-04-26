const getDB = require("../../database/config");
const jsonwebtoken = require("jsonwebtoken");

async function loginUser(req, res, next) {
  let connection;
  try {
    connection = await getDB();
    // comprobar que se reciben los datos necesarios
    //await loginUserSchema.validateAsync(req.body);
    const { email, password } = req.body;

    // Seleccionar el usuario de la base de datos y comprobar que las passwords coinciden
    const [dbUser] = await connection.query(
      `
      SELECT id, authenticated
      FROM users
      WHERE email=? AND password=SHA2(?, 512)
    `,
      [email, password]
    );

    if (dbUser.length === 0) {
      console.error("No hay ningún usuario registrado con ese email");
      res.status(401).send({
        status: "error",
        message: "Email o password incorrectas",
      });
      // throw generateError(
      //     "No hay ningún usuario registrado con ese email o la password es incorrecta",
      //     401
      // );
    } else if (!dbUser[0].authenticated) {
      console.error("El usuario está registrado pero no activado");
      res.status(401).send({
        status: "error",
        message: "El usuario está registrado pero no activado",
      });
      // throw generateError(
      //     "El usuario está registrado pero no activado. Por favor revisa tu email y activalo",
      //     401
      // );
    }
    // Generar token con información del usuario
    const tokenInfo = {
      id: dbUser[0].id,
    };

    const token = jsonwebtoken.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "30d",
    });

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
