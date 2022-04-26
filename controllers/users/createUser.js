const getDB = require("../../database/config");

async function newUser(req, res, next) {
  let connection;

  try {
    connection = await getDB();

    const { email, name, password } = req.body;

    // comprobar que no existe un usuario con ese mismo email en la base de datos
    const [existingUser] = await connection.query(
      `
      SELECT id
      FROM users
      WHERE email=?
    `,
      [email]
    );

    if (existingUser.length > 0) {
      // throw generateError(
      //     "Ya existe un usuario en la base de datos con ese email",
      //     409
      // );
      res.status(409).send({
        status: "error",
        message: "Usuario ya presente.",
      });
    }

    // enviar un mensaje de confirmación de registro al email indicado
    // ejemplo url validación:
    // http://localhost:3000/users/validate/454e5109e4f3245c63be6fddb9ab05e4296ad1c6
    //const registrationCode = randomString(40);
    //const validationURL = `${process.env.PUBLIC_HOST}/users/validate/${registrationCode}`;

    //Enviamos la url anterior por mail
    /*
    try {
      await sendMail({
        email,
        title: "Valida tu cuenta de usuario en la app diario de viajes",
        content: `Para validar tu cuenta de usuario en la app diario de viajes haz click aquí: ${validationURL}`,
      });
    } catch (error) {
      console.error("Error enviando mail");
    }
*/
    // meter el nuevo usuario en la base de datos sin activar
    //INSERT INTO users(registrationDate, email, password, registrationCode, lastUpdate, lastAuthUpdate)
    //VALUES(UTC_TIMESTAMP, ?, SHA2(?, 512), ?, UTC_TIMESTAMP, UTC_TIMESTAMP)
    await connection.query(
      `
      INSERT INTO users(creation_date, email, name, password, authenticated, last_update_date)
      VALUES(UTC_TIMESTAMP, ?, ?, SHA2(?, 512), ?, UTC_TIMESTAMP)
    `,
      [email, name, password, true]
    );

    res.send({
      status: "ok",
      message: "Usuario registrado.",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newUser;
