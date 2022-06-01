const getDB = require("../../database/config");
/* const { add, format } = require("date-fns"); */
const { generateError } = require("../../helpers");
/* const { number } = require("sharp/lib/is"); */

async function getSingleNews(req, res, next) {
  let connection;

  try {
    connection = await getDB();
    const { id } = req.params;
    const idNumber = Number(id);

    /* I convert the id into a Number because in case someone puts a string on the req.params it should give a different error. */

    if (idNumber) {
      const [result] = await connection.query(
        `SELECT n.id,title,introduction_text,news_text,image, creation_date, last_update_date, id_category, n.id_user, SUM(nv.vote) AS votes
            FROM news n
            INNER JOIN news_votes nv ON nv.id_news = ${idNumber}
            WHERE n.id = ${idNumber}
            `
      );

      const resultDestructured = result[0];

      if (resultDestructured.id === null) {
        throw generateError(
          "There is no new with the id you are searching",
          404
        );
      }

      return res.send({ status: "OK", data: resultDestructured });
    } else {
      throw generateError("The new's id must exist and be a number.", 404);
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { getSingleNews };
