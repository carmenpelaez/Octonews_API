const getDB = require("../../database/config");
const { generateError } = require("../../helpers/generateError");

const deleteNews = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { idNews } = req.params;

    //first we search for the owner of the news we want to edit.
    const [newsOwner] = await connection.query(
      `
          SELECT id_user
          FROM news
          WHERE id=?
        `,
      [idNews]
    );

    const [owner] = newsOwner;
    //Then we check if the auth user is the same as the owner of the news

    if (req.user !== owner.id_user) {
      throw generateError("No tienes permisos para borrar esta noticia", 403);
    }

    //We delete the news
    await connection.query(
      `
          DELETE FROM news WHERE id = ?
        `,
      [idNews]
    );

    res.send({
      status: "ok",
      message: "News deleted.",
    });
  } catch (error) {
    //if there is an error, we send it to the next middleware/function
    //eventually the checkErrors function will handle it.
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  deleteNews,
};
