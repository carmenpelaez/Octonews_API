const getDB = require("../../database/config");

async function voteNews(req, res, next) {
  let connection;

  try {
    connection = await getDB();

    const { id_news } = req.params;
    const { id_user, vote } =
      req.body; /* EL ID USER SOBRA, TENGO QUE COGERLO DEL TOKEN */

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

    /* ESTO ES EL JOI, LO TENGO QUE PONER AL PRINCIPIO, POR CIERTO */
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
    } /* AQUI VA UN ELSE. EN CASO DE QUE NO EXISTA EL VOTO SE CREA POR PRIMERA VEZ EL VOTO */

    /* I think the parameters of this "if" are useless, tell me when you guys check up the code */
    if (
      (checkIdNews.length > 0 && checkIdUser.length > 0) ||
      vote > 1 ||
      vote < -1
    ) {
      /* AQUI EN VEZ DE DELETE VA UPDATE.
      EL UPDATE VA DENTRO DE
      */
      const [deletePreviousVoteOnTheSameNew] = await connection.query(
        `DELETE FROM news_votes WHERE id_user =? AND id_news=?;`,
        [id_user, id_news]
      );
      /* ESTE ES EL INSERT QUE VA EN LA LINEA 63 */
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
