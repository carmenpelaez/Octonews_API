const getDB = require("../../database/config");

const getMyUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    res.send({
      status: "ok",
      data: req.user,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getMyUser };
