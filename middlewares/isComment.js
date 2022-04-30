const getDB = require("../database/config");
const { generateError } = require("../helpers/generateError");

//Function that checks if a News exists.
const isComment = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idComment, idNews } = req.params;

    //Check if the comment to reply exists and is in the news
    let [result] = await connection.query(
      `SELECT id, id_news, id_user FROM news_comments WHERE id = ? and id_news = ?`,
      [idComment, idNews]
    );

    if (result.length === 0) {
      throw generateError("Comment doesn't exists in the news", 404);
    }

    const [comment] = result;
    req.comment = comment;
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  isComment,
};
