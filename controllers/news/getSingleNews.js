const e = require("cors");
const getDB = require("../../database/config");
const { generateError } = require("../../helpers");

async function getSingleNews(req, res, next) {
  let connection;

  try {
    connection = await getDB();
    const { id } = req.params;
    const idNumber = Number(id);

    /* I convert the id into a Number because in case someone puts a string on the req.params it should give a different error. */

    if (idNumber) {
      const [result] = await connection.query(
        `SELECT n.id,n.id_user,title,introduction_text,news_text,image, n.creation_date, n.last_update_date, id_category, (SELECT SUM(vote) FROM news_votes WHERE id_news = n.id) as votes, COUNT(nc.id) AS comments
            FROM news n
            LEFT JOIN news_comments nc ON nc.id_news = n.id
            WHERE n.id = ?
            `,
        [idNumber, idNumber]
      );
      const [result2] = await connection.query(
        `SELECT name FROM users WHERE id = ? `,
        [result[0].id_user]
      );

      result[0].name = result2[0].name;
      const resultDestructured = result[0];

      if (resultDestructured.id === null) {
        throw generateError(
          "There is no news with the id you are searching",
          404
        );
      }

      return res.send({ status: "OK", data: resultDestructured });
    } else {
      throw generateError("The news id must exist and be a number.", 404);
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { getSingleNews };
