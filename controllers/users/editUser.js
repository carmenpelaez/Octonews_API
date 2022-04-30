const getDB = require("../../database/config");
const {
  /* processAndSaveImage,  */
  generateError,
} = require("../../helpers/generateError");
const { editUserSchema } = require("../../validators/usersValidators");

async function editUser(req, res, next) {
  let connection;

  try {
    connection = await getDB();

    await editUserSchema.validateAsync(req.body);

    const { id } = req.params;
    const { email, name, biography, avatar } = req.body;

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

    // Si mandamos imagen guardar avatar

    /*    let savedFileName;

    if (req.files && req.files.avatar) {
      try {
        // Procesar y guardar imagen
        savedFileName = await processAndSaveImage(req.files.avatar);
      } catch (error) {
        throw generateError(
          "No se pudo procesar la imagen. Inténtalo de nuevo",
          400
        );
      }
    } else {
      savedFileName = currentUser[0].image;
    } */
    savedFileName = currentUser[0].image;
    // Si el email es diferente al actual comprobar que no existe en la base de datos
    if (email !== currentUser[0].email) {
      const [existingEmail] = await connection.query(
        `
        SELECT id
        FROM users
        WHERE email=? 
      `,
        [email]
      );

      if (existingEmail.length > 0) {
        throw generateError("An user with this email already exists", 403);
      }

      // Verificamos de nuevo el email recibido
      const registrationCode = randomString(40);
      const validationURL = `${process.env.PUBLIC_HOST}/users/validate/${registrationCode}`;

      //Enviamos la url anterior por mail
      try {
        await sendMail({
          email,
          title:
            "You changed your user info on Octonews, please validate the account again.",
          content: `To validate your new email go to Octonews_API clicking here: ${validationURL}`,
        });
      } catch (error) {
        throw generateError("Error en el envío de mail", 500);
      }

      await connection.query(
        `
        UPDATE users 
        SET name=?, email=?, ${biography ? `biography="${biography},")` : ``}  
        ${
          avatar ? `avatar = "${avatar}"` : ``
        }  last_update_date=UTC_TIMESTAMP, lastAuthUpdate=UTC_TIMESTAMP, authenticated=0, registrationCode=?, image=?
        WHERE id=?
      `,
        [name, email, registrationCode, savedFileName, id]
      );

      // Dar una respuesta
      res.send({
        status: "ok",
        message: "User updated: Check your email to activate it again.",
      });
    } else {
      // Actualizar usuario en la base de datos
      await connection.query(
        ` UPDATE users 
      SET name=?, email=?, ${biography ? `biography="${biography}",` : ``}  
      ${avatar ? `avatar = "${avatar}",` : ``} last_update_date=UTC_TIMESTAMP
      WHERE id=?
    `,
        [name, email, /* savedFileName, */ id]
      );

      // Dar una respuesta
      res.send({
        status: "ok",
        message: "User updated",
      });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = editUser;
