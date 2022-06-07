const getDB = require("../../database/config");

const getCurrentCategory = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { idCategory } = req.params;

    //We get the category

    let [result] = await connection.query(
      `SELECT id, name, color, icon_image, background_image, description from categories
    WHERE id = ?`,
      [idCategory]
    );

    // send result

    res.send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    //if there is an error, we send it to the next middleware/function
    //eventually the checkErrors function will handle it.
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  getCurrentCategory,
};
