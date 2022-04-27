const getDB = require("../../database/config");

async function newUser(req, res, next) {
  let connection;

  try {
    connection = await getDB();

    const { email, name, password } = req.body;

    // Check there is no other user with dame email on BD.
    const [existingUser] = await connection.query(
      `
      SELECT id
      FROM users
      WHERE email=?
    `,
      [email]
    );

    if (existingUser.length > 0) {
      throw generateError("Email is taken", 409);
    }

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