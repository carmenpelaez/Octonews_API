const getDB = require("../../database/config");
const { generateError } = require("../../helpers");

async function getAnUserInformation(req, res, next) {
  let connection;

  try {
    connection = await getDB();
    const { id } = req.params;
    const idNumber = Number(id);

    if (idNumber) {
      const [result] = await connection.query(
        `SELECT name, biography,avatar, creation_date FROM users WHERE id = ?;`,
        [idNumber]
      );

      if (result.length === 0) {
        throw generateError("There is no user with this id", 404);
      }

      const resultDestructured = result[0];

      res.send({ status: "ok", data: resultDestructured });
    } else {
      throw generateError("The id must exist and be a number", 404);
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { getAnUserInformation };
