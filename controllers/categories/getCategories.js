const getDB = require("../../database/config");

const getCategories = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { id } = req.params;
    //We get all categories

    let [result] = await connection.query(
      `SELECT id, name, color, icon_image, background_image, description from categories`
    );

    // send result

    const categoryData = result[0];

    res.send({
      status: "ok",
      data: categoryData,
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
  getCategories,
};
