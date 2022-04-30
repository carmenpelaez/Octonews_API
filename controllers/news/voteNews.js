const getDB = require("../../database/config");
const { generateError } = require("../../helpers");
const { voteEntrySchema } = require("../../validators/newsValidators");

async function voteNews(req, res, next) {
  let connection;

  await voteEntrySchema.validateAsync(req.body);

  try {
    connection = await getDB();

    const { idNews } = req.params;
    const { vote } = req.body;
    const id_user = req.user.id;
    /* ALL this script checks up if the vote is sending in the req is the same that's already in the DB. If it is sends a error */

    const [resultOfCheckedVote] = await connection.query(
      `SELECT id_user, id_news, vote FROM news_votes
        WHERE id_user = ? AND id_news = ?;`,
      [id_user, idNews]
    );

    if (resultOfCheckedVote.length > 0) {
      const dataOfCheckedVote = resultOfCheckedVote[0];

      if (dataOfCheckedVote.vote == vote) {
        throw generateError(
          "You can change vote but can't send the same vote.",
          403
        );
      }
      await connection.query(
        `UPDATE news_votes SET vote =?, lastUpdate = UTC_TIMESTAMP WHERE id_user =? AND id_news=?`,
        [vote, id_user, idNews]
      );
      return res.send({ status: "OK", data: "Vote sent" });
    } else {
      await connection.query(
        `INSERT INTO news_votes (id_user, id_news, vote, date, lastUpdate)
         VALUES (?,?,?,UTC_TIMESTAMP, UTC_TIMESTAMP);`,
        [id_user, idNews, vote]
      );

      return res.send({ status: "OK", data: "Vote sent" });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { voteNews };
