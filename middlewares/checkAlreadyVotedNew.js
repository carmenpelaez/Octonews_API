const { send } = require("express/lib/response");
const getDB = require("../database/config");

const checkAlreadyVotedNew = async (req, res, next) => {
  const { id_news } = req.params;
  const { id_user, vote } = req.body;

  let connection;
  try {
    const [resultOfCheckedVote] = await connection.query(
      `SELECT id_user, id_news, vote FROM news_votes
          WHERE id_user = ? AND id_news = ?;`,
      [id_user, id_news]
    );

    if (resultOfCheckedVote.length > 0) {
      const dataOfCheckedVote = resultOfCheckedVote[0];

      if (dataOfCheckedVote.vote == vote) {
        return res.send({
          status: "40X",
          message:
            "Ya has hecho este voto en esta noticia. Puedes modificar tu voto pero no votar más de una vez",
        });
      }
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release;
    }
  }
};

module.export = checkAlreadyVotedNew;
