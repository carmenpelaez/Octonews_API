const getDB = require("../database/config");
const { generateError } = require("../helpers/generateError");

//Function that checks if a News exists.
const isNews = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idNews } = req.params;
    //first we search for the owner of the news we want to edit.
    const [result] = await connection.query(
      `
                SELECT id_user,image
                FROM news
                WHERE id=?
              `,
      [idNews]
    );

    if (result.length === 0) {
      throw generateError("News doesn't exist", 404);
    }

    const [news] = result;
    req.news = news;
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  isNews,
};
