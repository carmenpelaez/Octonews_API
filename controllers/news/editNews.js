const getDB = require("../../database/config");
const { generateError } = require("../../helpers/generateError");

const editNews = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { idNews } = req.params;
    const { introduction, text } = req.body;

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
      throw generateError("No tienes permisos para editar esta noticia", 403);
    }

    //We update the news
    await connection.query(
      `
          UPDATE news 
          SET introduction_text=?, news_text=?, last_update_date=UTC_TIMESTAMP
          WHERE id=?
        `,
      [introduction, text, idNews]
    );

    res.send({
      status: "ok",
      message: "News updated.",
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
  editNews,
};
