const getDB = require("../../database/config");
const { deleteImage } = require("../../helpers/deleteImage");

const deleteNews = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { idNews } = req.params;

    //From the the middleware CheckNews
    //Check if the news have an image
    //Delete image on local if there is one
    if (req.news.image) {
      await deleteImage(req.news.image);
    }

    //We delete the news
    await connection.query(
      `
          DELETE FROM news WHERE id = ?
        `,
      [idNews]
    );

    res.send({
      status: "ok",
      message: "News deleted.",
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
  deleteNews,
};
