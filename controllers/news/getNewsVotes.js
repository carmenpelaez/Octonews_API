const getDB = require("../../database/config");
const { generateError } = require("../../helpers");

const getNewsVotes = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idNews } = req.params;

    let [result] = await connection.query(
      `SELECT id,vote,date,lastUpdate,id_user,id_news FROM news_votes WHERE id_news = ?`,
      [idNews]
    );

    // send result

    res.send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    //if there is an error, we send it to the next middleware/function
    //eventually the checkErrors function will handle it.
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getNewsVotes };
