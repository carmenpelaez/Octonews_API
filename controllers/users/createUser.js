const getDB = require("../../database/config");
const { generateError } = require("../../helpers");
const { createUserSchema } = require("../../validators/usersValidators");
const sendMail = require("../../helpers/sendMail");
const randomString = require("../../helpers/randomString");

async function newUser(req, res, next) {
  let connection;

  try {
    await createUserSchema.validateAsync(req.body);
    connection = await getDB();

    const { email, name, password } = req.body;
    console.log(email);
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

    const registrationCode = randomString(40);
    const validationURL = `${process.env.PUBLIC_HOST}/users/validate/${registrationCode}`;

    /* We send the previous url (validationURL) to their email */
    try {
      await sendMail(
        email,
        "Validate your account in Octonews!",
        `To validate your user account in Octonews click here: ${validationURL}`
      );
    } catch (error) {
      /* throw generateError("Error sending the email", 500); */
      console.log(error.message);
      throw error;
    }

    /* This creates an user on the database, unauthenticated. It will authenticated in "validateUser" */
    await connection.query(
      `
      INSERT INTO users(creation_date, email, name, password, authenticated, registrationCode,last_update_date)
      VALUES(UTC_TIMESTAMP, ?, ?, SHA2(?, 512), ?, ? ,UTC_TIMESTAMP)
    `,
      [email, name, password, false, registrationCode]
    );

    res.send({
      status: "ok",
      message: "User registered.",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { newUser };
