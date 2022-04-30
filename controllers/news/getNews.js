const getDB = require("../../database/config");
const { add, format } = require("date-fns");
const { generateError } = require("../../helpers");

async function getNews(req, res, next) {
  let connection;

  try {
    connection = await getDB();
    const { date, category } = req.query;

    if (date) {
      let currentDate = new Date(date);
      let currentDatePlusOneMoreDay = add(currentDate, {
        days: 1,
      }); /* Cambiar a nombres mas cortos */
      let currentDatePlusOneMoreDayFormatted = format(
        currentDatePlusOneMoreDay,
        "yyyy/MM/dd"
      );

      console.log(date);
      console.log(currentDatePlusOneMoreDayFormatted);

      const [result] = await connection.query(
        `SELECT n.id,title,introduction_text,news_text,image, SUM(nv.vote) AS votos
       FROM news n
       INNER JOIN news_votes nv ON nv.id_news = n.id
       WHERE n.creation_date BETWEEN ? AND ? ${
         category
           ? `AND id_category =(SELECT id_category FROM categories WHERE name="${category}")`
           : ``
       }
       GROUP BY n.id 
       ORDER BY votos DESC; `,
        [date, currentDatePlusOneMoreDayFormatted]
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
        `SELECT n.id,title,introduction_text,news_text,image, SUM(nv.vote) AS votos
     FROM news n
     INNER JOIN news_votes nv ON nv.id_news = n.id
     WHERE n.creation_date >= current_date() ${
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

module.exports = { getNews };
