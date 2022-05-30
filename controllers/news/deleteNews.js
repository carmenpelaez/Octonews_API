const getDB = require("../../database/config");
const { deleteImage, generateError } = require("../../helpers");

const deleteNews = async (req, res, next) => {
  let connection;

  try {
    //Check if the auth user is the same as the owner of the news(We get news from isNews middleware)
    if (req.user.id !== req.news.id_user) {
      throw generateError("You have no permission to delete this news", 403);
    }

    connection = await getDB();
    const { idNews } = req.params;
    //From the the middleware CheckNews
    //Check if the news have an image
    //Delete image on local if there is one
    if (req.news.image) {
      await deleteImage(req.news.image, "news");
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
      data: "News deleted.",
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
