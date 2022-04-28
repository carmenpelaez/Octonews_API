const getDB = require("../../database/config");
const isAuth = require("../../middlewares/isAuth"); /* No estoy seguro de que el import de isAuth vaya aqui, pero lo pongo de momento. Quizas vaya en el endpoint del server.js */

async function voteNews(req, res, next) {
  let connection;

  try {
    connection = await getDB();

    const { id_news } = req.params;
    const { id_user, vote } = req.body;

    /* TENGO QUE HACER QUE CHECKIDNEWS SEA UNA FUNCIÓN APARTE. UN HELPER. AÑADIRLO EN OTRO ARCHIVO */
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
    /* TENGO QUE HACER QUE CHECKIDNEWS SEA UNA FUNCIÓN APARTE. UN HELPER. AÑADIRLO EN OTRO ARCHIVO */
    const [checkIdUser] = await connection.query(
      `SELECT name, id, email FROM users WHERE id = ?`,
      [id_user]
    );

    if (checkIdUser.length === 0) {
      return res.send({
        status: 404,
        message: "El usuario que has introducido es incorrecto",
      });
    }

    /* TENGO QUE HACER QUE CHECKIDNEWS SEA UNA FUNCIÓN APARTE. UN HELPER. AÑADIRLO EN OTRO ARCHIVO */
    if (vote > 1 || vote < -1) {
      return res.send({
        status: 404,
        message: "Voto inválido, inténtelo de nuevo",
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
        return res.send({
          status: "40X",
          message:
            "Ya has hecho este voto en esta noticia. Puedes modificar tu voto pero no votar más de una vez",
        });
      }
    }

    /* I think the parameters of this "if" are useless, tell me when you guys check up the code */
    if (
      (checkIdNews.length > 0 && checkIdUser.length > 0) ||
      vote > 1 ||
      vote < -1
    ) {
      const [deletePreviousVoteOnTheSameNew] = await connection.query(
        `DELETE FROM news_votes WHERE id_user =? AND id_news=?;`,
        [id_user, id_news]
      );

      const [result] = await connection.query(
        `INSERT INTO news_votes (id_user, id_news, vote, date, lastUpdate)
         VALUES (?,?,?,current_timestamp(), current_timestamp());`,
        [id_user, id_news, vote]
      );

      return res.send({ status: "OK", data: "Voto enviado con éxito" });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = voteNews;
