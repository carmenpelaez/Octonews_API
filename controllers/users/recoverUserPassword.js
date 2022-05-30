const getDB = require("../../database/config");
const { generateError, sendMail, randomString } = require("../../helpers");

const {
  recoverUserPasswordSchema,
} = require("../../validators/usersValidators");

async function recoverUserPassword(req, res, next) {
  let connection;

  try {
    connection = await getDB();

    await recoverUserPasswordSchema.validateAsync(req.body);

    const { email } = req.body;

    //Check if there is an user with this email
    const [current] = await connection.query(
      `
      SELECT id
      FROM users
      WHERE email=?
    `,
      [email]
    );

    if (current.length === 0) {
      throw generateError(
        `There is no user with this email ${email} on the database`,
        404
      );
    }

    // Insert in the user row the random code
    const recoverCode = randomString(40);

    await connection.query(
      `
      UPDATE users
      SET passwordUpdateCode=?
      WHERE email=?
    `,
      [recoverCode, email]
    );

    // Send code via email
    try {
      await sendMail(
        email,
        "Your password reset code.",
        `Someone requested to recover your password. This is your recovery code you have to use:
          ${recoverCode} 
            <p>If it wasn't you the one to ask for this recovery please ignore this email. Nothing changed.</p>
        `
      );
    } catch (error) {
      throw generateError("Error sending the email", 500);
    }

    res.send({
      status: "ok",
      data: "An email with instructions was sent to your account associated with your user.",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { recoverUserPassword };
