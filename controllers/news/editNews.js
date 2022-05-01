const getDB = require("../../database/config");
const {
  generateError,
  deleteImage,
  processAndSaveImage,
} = require("../../helpers");
const { editNewsSchema } = require("../../validators/newsValidators");

const editNews = async (req, res, next) => {
  let connection;

  try {
    //Check if the auth user is the same as the owner of the news(We get news from isNews middleware)
    if (req.user.id !== req.news.id_user) {
      throw generateError("You have no permission to edit this news", 403);
    }
    connection = await getDB();

    //Check if the req params are correct.
    await editNewsSchema.validateAsync(req.body);

    const { idNews } = req.params;
    const { introduction, text } = req.body;

    //Check if client upload a file
    if (req.files && Object.keys(req.files).length > 0) {
      const imageData = req.files.image;

      //Check if it is an image
      if (imageData.mimetype.includes(image)) {
        try {
          //From the the middleware CheckNews
          //Check if the news have an image
          //Delete image on local if there is one
          if (req.news.image) {
            await deleteImage(req.news.image, "news");
          }
          //process and save image on local
          processedImage = await processAndSaveImage(imageData, 800, "news");
        } catch (error) {
          throw generateError("Couldn't process the image. Try again.", 400);
        }
        //Create the news with all the values given with image
        await connection.query(
          `
              UPDATE news 
              SET introduction_text=?, news_text=?, image=?, last_update_date=UTC_TIMESTAMP
              WHERE id=?
            `,
          [introduction, text, processedImage, idNews]
        );
      } else {
        throw generateError("File is not an image.", 403);
      }
    } else {
      //We update the news without image
      await connection.query(
        `
          UPDATE news 
          SET introduction_text=?, news_text=?, last_update_date=UTC_TIMESTAMP
          WHERE id=?
        `,
        [introduction, text, idNews]
      );
    }

    res.send({
      status: "ok",
      message: "News updated.",
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
  editNews,
};
