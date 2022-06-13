const getDB = require("../../../database/config");

const getComments = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idNews } = req.params;

    //Firts get all comments
    let [result] = await connection.query(
      `SELECT nc.id,nc.comment,nc.id_user,nc.id_reply_message,nc.creation_date, u.name 
      FROM news_comments nc 
      INNER JOIN users u ON nc.id_user = u.id  
      WHERE id_news = ?`,
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
