const getDB = require("../../database/config");
const { generateError } = require("../../helpers/generateError");

async function validateUser(req, res, next) {
  let connection;
  try {
    connection = await getDB();
    const { code } = req.params;

    const [result] = await connection.query(
      `
      SELECT email
      FROM users
      WHERE registrationCode=?
    `,
      [code]
    );

    if (result.length === 0) {
      throw generateError(
        "There is no user pending authentication with this registration code",
        404
      );
    }

    await connection.query(
      `
      UPDATE users
      SET authenticated=true, registrationCode=NULL
      WHERE registrationCode=?
    `,
      [code]
    );

    res.send({
      status: "ok",
      message: `Now you can log in with your mail ${result[0].email} and your password`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = validateUser;
