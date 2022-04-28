const getDB = require("../../database/config");
const isAuth = require("../../middlewares/isAuth"); /* No estoy seguro de que el import de isAuth vaya aqui, pero lo pongo de momento. Quizas vaya en el endpoint del server.js */

async function getPreviousNews(req, res, next) {
  let connection;

  try {
    connection = await getDB();

    if (req.params) {
      const { date } = req.params;
      console.log(date);

      const [result] = await connection.query(
        `SELECT title,introduction_text,news_text,image, COUNT(nv.vote) AS votos
      FROM news n
      INNER JOIN news_votes nv ON nv.id_news = n.id
      WHERE n.creation_date = ?
      GROUP BY title
      ORDER BY votos DESC; `,
        [date]
      );

      if (result.length === 0) {
        const [result] = await connection.query(
          `SELECT title,introduction_text,news_text,image
        FROM news 
        WHERE creation_date = ?;`,
          [date]
        );

        return res.send({
          status: 404,
          noticias: "No hay noticias con esa fecha",
        });
      }

      res.send({ status: "OK", noticias: result });
    } else {
      const [result] = await connection.query(
        `SELECT title,introduction_text,news_text,image, COUNT(nv.vote) AS votos
     FROM news n
     INNER JOIN news_votes nv ON nv.id_news = n.id
     WHERE n.creation_date = current_date()
     GROUP BY title
     ORDER BY votos DESC; `
      );

      res.send({ status: "OK", noticias: result });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getPreviousNews;
