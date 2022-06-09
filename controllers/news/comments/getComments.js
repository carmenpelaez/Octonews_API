const getDB = require("../../../database/config");

const getComments = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idNews } = req.params;

    //Firts get all comments
    let [result] = await connection.query(
      `SELECT id,comment,id_user,id_reply_message,creation_date FROM news_comments WHERE id_news = ?`,
      [idNews]
    );

    // send result

    res.send({
      status: "ok",
      data: {
        idNews,
        result,
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
  getComments,
};
