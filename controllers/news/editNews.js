const getDB = require("../../database/config");
const { generateError } = require("../../helpers/generateError");
const { editNewsSchema } = require("../../validators/newsValidator");
const { deleteImage } = require("../../helpers/deleteImage");
const { processAndSaveImage } = require("../../helpers/processAndSaveImage");

const editNews = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Check if the req params are correct.
    await editNewsSchema.validateAsync(req.body);

    const { idNews } = req.params;
    const { introduction, text } = req.body;

    //Check if client upload a file
    if (req.files && Object.keys(req.files).length > 0) {
      const imageData = req.files.image;

      //Check if it is an image
      if (imageData.mimetype === "image/png") {
        try {
          //From the the middleware CheckNews
          //Check if the news have an image
          //Delete image on local if there is one
          if (req.news.image) {
            await deleteImage(req.news.image);
          }
          //process and save image on local
          processedImage = await processAndSaveImage(imageData);
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
