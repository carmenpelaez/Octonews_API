const getDB = require("../../database/config");
const {
  processAndSaveImage,
  generateError,
  deleteImage,
} = require("../../helpers");
const { editUserSchema } = require("../../validators/usersValidators");
const sendMail = require("../../helpers/sendMail");
const randomString = require("../../helpers/randomString");

async function editUser(req, res, next) {
  let connection;

  try {
    connection = await getDB();

    await editUserSchema.validateAsync(req.body);

    const { id } = req.params;
    const { email, name, biography } = req.body;

    // Check if user exist
    const [currentUser] = await connection.query(
      `
      SELECT id, email, avatar
      FROM users
      WHERE id=?
    `,
      [id]
    );

    if (currentUser.length === 0) {
      throw generateError(`User with id ${id} doesn't exist`, 404);
    }

    let savedFileName;

    if (req.files && req.files.avatar) {
      if (req.files.avatar.mimetype.includes("image")) {
        try {
          //From the the middleware
          //Check if the user has an image
          //Delete image on local if there is one
          if (currentUser[0].avatar) {
            await deleteImage(currentUser[0].avatar, "users");
          }
          //process and save image on local
          savedFileName = await processAndSaveImage(
            req.files.avatar,
            400,
            "users"
          );
        } catch (error) {
          throw generateError("Couldn't process the image. Try again.", 400);
        }
      }
    } else {
      savedFileName = currentUser[0].avatar;
    }

    /* If user provides an email to update, this will be the function running */

    // If email it's different from the current one check if it doesn't exist on database
    if (email !== currentUser[0].email && email !== undefined) {
      const [existingEmail] = await connection.query(
        `
          SELECT id
          FROM users
          WHERE email=? 
        `,
        [email]
      );
      console.log("HOLAAAAAAAAA");
      if (existingEmail.length > 0) {
        throw generateError("An user with this email already exists", 403);
      }

      // We verify the new received email
      const registrationCode = randomString(40);
      const validationURL = `${process.env.PUBLIC_HOST}/users/validate/${registrationCode}`;

      //We send previous url via email
      try {
        await sendMail(
          email,
          "You changed your user info on Octonews, please validate the account again.",
          `To validate your new email go to Octonews_API clicking here: ${validationURL}`
        );
      } catch (error) {
        throw generateError("Error sending the email", 500);
      }
      await connection.query(
        `
          UPDATE users 
          SET 
          ${name ? `name="${name}",` : ``}
          email=?, 
          ${biography ? `biography="${biography}",` : ``}  
          ${req.files.avatar ? `avatar = "${savedFileName}",` : ``}  
          last_update_date=UTC_TIMESTAMP, authenticated=0, registrationCode=?
          WHERE id=?
        `,
        [email, registrationCode, id]
      );

      res.send({
        status: "ok",
        message: "User updated: Check your email to activate it again.",
      });
    } else {
      /* If user doesn't provide any email to update this will be the function running */
      // Update user on database
      /* If user sends an avatar file it goes through here, if not, it will go through the else */
      if (req.files) {
        await connection.query(
          ` UPDATE users 
       SET
        ${name ? `name="${name}",` : ``}
        ${email ? `email="${email}",` : ``}
        ${biography ? `biography="${biography}",` : ``}  
        ${req.files.avatar ? `avatar = "${savedFileName}",` : ``} 
        last_update_date=UTC_TIMESTAMP
        WHERE id=?
         `,
          [id]
        );

        res.send({
          status: "ok",
          message: "User updated",
        });
      } else {
        await connection.query(
          ` UPDATE users 
       SET
        ${name ? `name="${name}",` : ``}
        ${email ? `email="${email}",` : ``}
        ${biography ? `biography="${biography}",` : ``}  
        last_update_date=UTC_TIMESTAMP
        WHERE id=?
         `,
          [id]
        );
        res.send({
          status: "ok",
          message: "User updated",
        });
      }
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = editUser;
