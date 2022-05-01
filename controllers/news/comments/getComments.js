const getDB = require("../../../database/config");

const getComments = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idNews } = req.params;

    //Firts get all comments
    let [result] = await connection.query(
      `SELECT id,comment,id_user,id_reply_message FROM news_comments WHERE id_news = ?`,
      [idNews]
    );

    //Then we get the comments referenced on the id_replay_message and add it to the comment who replied
    for (let i = 0; i < result.length; i++) {
      const [result_two] = await connection.query(
        `SELECT id,comment,id_user,id_reply_message FROM news_comments WHERE id = ?`,
        [result[i].id_reply_message]
      );
      result[i].replyTo = result_two;
    }

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
