const getDB = require("../../database/config");

async function getNews(req, res, next) {
  let connection;

  try {
    connection = await getDB();
    /* He cambiado req.params por req.querys, volver a revisar toda la función */
    if (req.query) {
      const { date } = req.query;
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

module.exports = getNews;
