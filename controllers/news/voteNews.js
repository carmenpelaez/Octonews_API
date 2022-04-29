const getDB = require("../../database/config");
const { generateError } = require("../../helpers/generateError");
const { voteEntrySchema } = require("../../validators/newsValidator");

async function voteNews(req, res, next) {
  let connection;

  await voteEntrySchema.validateAsync(req.body);

  try {
    connection = await getDB();

    const { id_news } = req.params;
    const { vote } = req.body;
    const id_user = req.user.id;

    const [checkIdNews] = await connection.query(
      `SELECT * FROM news WHERE id=?`,
      [id_news]
    );

    if (checkIdNews.length === 0) {
      return res.send({
        status: 404,
        message: "Lo sentimos, la noticia que quieres votar no existe.",
      });
    }
    /* ALL this script checks up if the vote is sending in the req is the same that's already in the DB. If it is sends a error */

    const [resultOfCheckedVote] = await connection.query(
      `SELECT id_user, id_news, vote FROM news_votes
        WHERE id_user = ? AND id_news = ?;`,
      [id_user, id_news]
    );

    if (resultOfCheckedVote.length > 0) {
      const dataOfCheckedVote = resultOfCheckedVote[0];

      if (dataOfCheckedVote.vote == vote) {
        throw generateError(
          "You can change vote but can't send the same vote.",
          403
        );
      }
    } else {
      const [result] = await connection.query(
        `INSERT INTO news_votes (id_user, id_news, vote, date, lastUpdate)
         VALUES (?,?,?,current_timestamp(), current_timestamp());`,
        [id_user, id_news, vote]
      );

      return res.send({ status: "OK", data: "Vote sent" });
    }

    /* I think the parameters of this "if" are useless, tell me when you guys check up the code */
    if (checkIdNews.length > 0 || vote > 1 || vote > -1) {
      const [updateVote] = await connection.query(
        `UPDATE news_votes SET vote =? WHERE id_user =? AND id_news=?`,
        [vote, id_user, id_news]
      );
      return res.send({ status: "OK", data: "Vote sent" });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = voteNews;
