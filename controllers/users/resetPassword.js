const getDB = require("../../database/config");
const { generateError } = require("../../helpers");
const { resetUserPasswordSchema } = require("../../validators/usersValidators");

async function resetPassword(req, res, next) {
  let connection;

  try {
    await resetUserPasswordSchema.validateAsync(req.body);

    connection = await getDB();

    const { recoverCode, newPassword } = req.body;

    // Check if an user exist with the recover code on the database
    const [current] = await connection.query(
      `
        SELECT id
        FROM users
        WHERE passwordUpdateCode=?
      `,
      [recoverCode]
    );

    if (current.length === 0) {
      throw generateError(
        "There is no user with this password recovery code.",
        404
      );
    }

    // Update password
    await connection.query(
      `
        UPDATE users
        SET password=SHA2(?, 512), passwordUpdateCode=NULL, last_update_date=UTC_TIMESTAMP
        WHERE passwordUpdateCode=?
      `,
      [newPassword, recoverCode]
    );

    res.send({
      status: "ok",
      data: "Password updated",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { resetPassword };
