const getDB = require("../../database/config");
const { add, format } = require("date-fns");
const { generateError } = require("../../helpers");

async function getNews(req, res, next) {
  let connection;

  try {
    connection = await getDB();
    const { date, category, q } = req.query;

    if (date) {
      let currentDate = new Date(date);
      let currentDatePlusOneMoreDay = add(currentDate, {
        days: 1,
      });
      let currentDatePlusOneMoreDayFormatted = format(
        currentDatePlusOneMoreDay,
        "yyyy/MM/dd"
      );

      if (q) {
        const [result] = await connection.query(
          `SELECT n.id,title,introduction_text,news_text,image, n.creation_date, last_update_date, id_category, n.id_user, (SELECT SUM(vote) FROM news_votes WHERE id_news = n.id) as votes, COUNT(nc.id) AS comments
       FROM news n
       LEFT JOIN news_comments nc ON nc.id_news = n.id
       WHERE n.creation_date BETWEEN ? AND ?
      ${q ? `AND title  LIKE "%${q}%"` : ``}
       GROUP BY n.id 
       ORDER BY n.creation_date DESC; `,
          [date, currentDatePlusOneMoreDayFormatted]
        );

        if (result.length === 0) {
          throw generateError(
            "There is no news in this date with your search",
            404
          );
        }

        for (let i = 0; i < result.length; i++) {
          const [user] = await connection.query(
            `SELECT name from users WHERE id = ?;`,
            [result[i].id_user]
          );
          result[i].user_name = user[0].name;
        }

        return res.send({ status: "OK", data: result });
      } else {
        const [result] = await connection.query(
          `SELECT n.id,title,introduction_text,news_text,image, n.creation_date, last_update_date, id_category, n.id_user, (SELECT SUM(vote) FROM news_votes WHERE id_news = n.id) as votes, COUNT(nc.id) AS comments
       FROM news n
       LEFT JOIN news_comments nc ON nc.id_news = n.id
       WHERE n.creation_date BETWEEN ? AND ? ${
         category
           ? `AND id_category =(SELECT id FROM categories WHERE name=?)`
           : ``
       }
       GROUP BY n.id 
       ORDER BY n.creation_date DESC; `,
          [date, currentDatePlusOneMoreDayFormatted, category]
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
          result[i].user_name = user[0].name;
        }

        return res.send({ status: "OK", data: result });
      }
    } else {
      if (category) {
        const [result] = await connection.query(
          `SELECT n.id,title,introduction_text,news_text,image, n.creation_date, last_update_date, id_category, n.id_user, (SELECT SUM(vote) FROM news_votes WHERE id_news = n.id) as votes, COUNT(nc.id) AS comments
          FROM news n
          LEFT JOIN news_comments nc ON nc.id_news = n.id
          WHERE id_category =(SELECT id FROM categories WHERE name="${category}")
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
      } else {
        const [result] = await connection.query(
          `SELECT n.id,title,introduction_text,news_text,image, n.creation_date, last_update_date, id_category, n.id_user, (SELECT SUM(vote) FROM news_votes WHERE id_news = n.id) as votes, COUNT(nc.id) AS comments
        FROM news n
        LEFT JOIN news_comments nc ON nc.id_news = n.id
        ${q ? `WHERE title  LIKE "%${q}%"` : ``}
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
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { getNews };
