const getDB = require("../../../database/config");
const { addCommentSchema } = require("../../../validators/newsValidators");

const addComment = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    await addCommentSchema.validateAsync(req.body);

    const { comment, id_reply_message, name } = req.body;
    const { idNews } = req.params;

    //Insert comment associating idUser and idNews

    if (id_reply_message) {
      const commentDate = new Date();
      const [result] = await connection.query(
        `INSERT INTO news_comments (comment, creation_date,id_news,id_user,id_reply_message)
       VALUES (?,?,?,?,?);`,
        [comment, commentDate, Number(idNews), req.user.id, id_reply_message]
      );

      // send result

      res.send({
        status: "ok",
        data: {
          id: result.insertId,
          comment,
          id_news: Number(idNews),
          id_user: req.user.id,
          id_reply_message,
          creation_date: commentDate,
        },
      });
    } else {
      const commentDate = new Date();
      const [result] = await connection.query(
        `INSERT INTO news_comments (comment, creation_date,id_news,id_user)
       VALUES (?,?,?,?);`,
        [comment, commentDate, Number(idNews), req.user.id]
      );

      // send result

      res.send({
        status: "ok",
        data: {
          id: result.insertId,
          comment,
          id_news: Number(idNews),
          id_user: req.user.id,
          name: name,
          creation_date: commentDate,
          id_reply_message: null,
        },
      });
    }
  } catch (error) {
    //if there is an error, we send it to the next middleware/function
    //eventually the checkErrors function will handle it.
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  addComment,
};
