const getDB = require("../../database/config");
const { generateError } = require("../../helpers/generateError");
const { editUserPasswordSchema } = require("../../validators/usersValidators");

async function editUserPassword(req, res, next) {
  let connection;

  try {
    connection = await getDB();

    await editUserPasswordSchema.validateAsync(req.body);

    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    // Check if user exist and the old password is correct
    const [currentUser] = await connection.query(
      `
      SELECT id
      FROM users
      WHERE id=? AND password=SHA2(?, 512)
    `,
      [id, oldPassword]
    );

    if (currentUser.length === 0) {
      throw generateError("Your old password is not correct", 401);
    }

    // Save new password
    await connection.query(
      `
      UPDATE users
      SET password=SHA2(?, 512), last_update_date=UTC_TIMESTAMP
      WHERE id=?
    `,
      [newPassword, id]
    );

    res.send({
      status: "ok",
      message: "Password updated",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { editUserPassword };
