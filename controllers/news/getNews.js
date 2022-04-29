const getDB = require("../../database/config");
const { generateError } = require("../../helpers/generateError");

async function getNews(req, res, next) {
  let connection;

  try {
    connection = await getDB();
    const { date, category } = req.query;

    if (date) {
      const [result] = await connection.query(
        `SELECT title,introduction_text,news_text,image, SUM(nv.vote) AS votos
       FROM news n
       INNER JOIN news_votes nv ON nv.id_news = n.id
       WHERE n.creation_date = ? ${
         category
           ? `AND id_category =(SELECT id_category FROM categories WHERE name="${category}")`
           : ``
       }
       GROUP BY n.id 
       ORDER BY votos DESC; `,
        [date]
      );

      if (result.length === 0) {
        if (category) {
          throw generateError(
            "There is no news in this date and category.",
            404
          );
        } else {
          throw generateError("There is no news in this date", 404);
        }
      }

      return res.send({ status: "OK", news: result });
    } else {
      const [result] = await connection.query(
        `SELECT title,introduction_text,news_text,image, SUM(nv.vote) AS votos
     FROM news n
     INNER JOIN news_votes nv ON nv.id_news = n.id
     WHERE n.creation_date > current_date() ${
       category
         ? `AND id_category =(SELECT id_category FROM categories WHERE name="${category}")`
         : ``
     }
     GROUP BY n.id
     ORDER BY votos DESC; `
      );

      return res.send({ status: "OK", noticias: result });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getNews;
