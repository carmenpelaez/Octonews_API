const getDB = require("../database/config");
const { generateError } = require("../helpers/generateError");

//Function that checks if a News exists and if the authorized user can manipulate it
const checkNews = async (req, res, next) => {
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

    //Then we check if the auth user is the same as the owner of the news
    if (req.user.id !== news.id_user) {
      throw generateError(
        "You have no permission to edit/delete this news",
        403
      );
    }
    req.news = news;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkNews,
};
