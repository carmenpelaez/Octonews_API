const getDB = require("../../../database/config");
const { addCommentSchema } = require("../../../validators/newsValidators");

const replyComment = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    await addCommentSchema.validateAsync(req.body);

    const { comment } = req.body;
    const { idNews, idComment } = req.params;

    //Insert comment associating idUser, idNews and id_reply_message
    [result] = await connection.query(
      `INSERT INTO news_comments (comment, creation_date,id_news,id_user,id_reply_message)
       VALUES (?,UTC_TIMESTAMP,?,?,?);`,
      [comment, Number(idNews), req.user.id, idComment]
    );

    // send result

    res.send({
      status: "ok",
      data: {
        id: result.insertId,
        comment,
        idNews: Number(idNews),
        id_user: req.user.id,
        idComment,
      },
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
  replyComment,
};
