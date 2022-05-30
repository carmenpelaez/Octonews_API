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

      const [result] = await connection.query(
        `SELECT n.id,title,introduction_text,news_text,image, creation_date, last_update_date, id_category, n.id_user, SUM(nv.vote) AS votes
       FROM news n
       INNER JOIN news_votes nv ON nv.id_news = n.id
       WHERE n.creation_date BETWEEN ? AND ? ${
         category
           ? `AND id_category =(SELECT id_category FROM categories WHERE name="${category}")`
           : ``
       }
       GROUP BY n.id 
       ORDER BY n.creation_date DESC; `,
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

      for (let i = 0; i < result.length; i++) {
        const [user] = await connection.query(
          `SELECT name from users WHERE id = ?;`,
          [result[i].id_user]
        );
        console.log(user[0].name);
        result[i].user_name = user[0].name;
      }

      return res.send({ status: "OK", data: result });
    } else {
      const [result] = await connection.query(
        `SELECT n.id,title,introduction_text,news_text,image, creation_date, last_update_date, id_category, n.id_user, SUM(nv.vote) AS votos
     FROM news n
     INNER JOIN news_votes nv ON nv.id_news = n.id
     ${
       category
         ? `WHERE id_category =(SELECT id FROM categories WHERE name="${category}")`
         : ``
     }
     GROUP BY n.id
     ORDER BY n.creation_date DESC; `
      );

      for (let i = 0; i < result.length; i++) {
        const [user] = await connection.query(
          `SELECT name from users WHERE id = ?;`,
          [result[i].id_user]
        );
        result[i].user_name = user[0].name;
      }

      return res.send({ status: "OK", data: result });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { getNews };
